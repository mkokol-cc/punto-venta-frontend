import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo } from '../../interfaces/articulo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorArticulosComponent } from '../buscador-articulos/buscador-articulos.component';
import { ArticuloService } from '../../services/articulo.service';
import { DetalleCombo } from '../../interfaces/detalle-combo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-combo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    BuscadorArticulosComponent
  ],
  templateUrl: './form-combo.component.html',
  styleUrl: './form-combo.component.scss'
})
export class FormComboComponent implements OnInit{

  @ViewChild(BuscadorArticulosComponent) buscador!: BuscadorArticulosComponent;
  form:FormGroup
  formDetalleCombo:FormGroup
  productos: DetalleCombo[] = []
  id:number|undefined = undefined

  constructor(
    private fb: FormBuilder,
    private service: ArticuloService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(2)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      stock: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      costo: ['', [Validators.required, Validators.minLength(2)]],
      recargo: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [],
    })
    this.formDetalleCombo = this.fb.group({
      cantidad: [, [Validators.required, Validators.min(0)]],
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.service.getByCodigo(params['codigo']).subscribe(obj=>{
        this.form.get('codigo')?.setValue(obj.codigo)
        this.form.get('nombre')?.setValue(obj.nombre)
        this.form.get('stock')?.setValue(obj.stock)
        this.form.get('costo')?.setValue(obj.costo)
        this.form.get('recargo')?.setValue(obj.recargo)
        this.form.get('descripcion')?.setValue(obj.descripcion)
        this.productos = obj.productos ? obj.productos : []
      })
    });
  }

  addProducto(){
    if(this.formDetalleCombo.valid && this.buscador.selected.valid){
      const detalle = this.productos.find(p => p.articulo.codigo.toLowerCase() == this.buscador.getSelected()!.codigo.toLowerCase())
      if(detalle){
        detalle.cantidad = detalle.cantidad+1
      }else{
        const p:DetalleCombo = {
          articulo : this.buscador.getSelected()!,
          cantidad : this.formDetalleCombo.get('cantidad')?.value
        }
        this.productos.push(p)
      }
    }
  }

  removeProducto(p:DetalleCombo){
    this.productos = this.productos.filter(producto => producto.articulo.codigo.trim().toLowerCase() !== p.articulo.codigo.trim().toLowerCase());
  }

  getValue():Articulo|undefined{
    if(this.form.valid){
      console.log(<Articulo>this.form.value)
      return <Articulo>this.form.value
    }
    return undefined
  }

  save(){
    if(this.form.valid){
      let a:Articulo = <Articulo>this.form.value
      if(this.productos.length>0){
        a.esCombo = true,
        a.productos = this.productos
      }else{
        a.esCombo = false
      }
      console.log(a)
      this.id ? this.update(a,this.id) : this.new(a)
      return a
    }
    return undefined
  }

  new(a:Articulo){
    this.service.new(a).subscribe()
  }

  update(a:Articulo,id:number){
    this.service.update(a,id).subscribe()
  }

  cancelEdit(){
    this.id = undefined
    this.resetForm()
  }

  resetForm(){
    this.form.get('codigo')?.setValue('')
    this.form.get('nombre')?.setValue('')
    this.form.get('stock')?.setValue('')
    this.form.get('costo')?.setValue('')
    this.form.get('recargo')?.setValue('')
    this.form.get('descripcion')?.setValue('')
    this.productos = []
  }
  
}
