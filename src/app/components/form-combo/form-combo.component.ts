import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class FormComboComponent implements OnChanges{

  @ViewChild(BuscadorArticulosComponent) buscador!: BuscadorArticulosComponent;
  form:FormGroup
  formDetalleCombo:FormGroup
  productos: DetalleCombo[] = []
  @Input() toEdit?: Articulo;

  constructor(
    private fb: FormBuilder,
    private service: ArticuloService
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes['toEdit']){
      this.form.get('codigo')?.setValue(this.toEdit?.codigo)
      this.form.get('nombre')?.setValue(this.toEdit?.nombre)
      this.form.get('stock')?.setValue(this.toEdit?.stock)
      this.form.get('costo')?.setValue(this.toEdit?.costo)
      this.form.get('recargo')?.setValue(this.toEdit?.recargo)
      this.form.get('descripcion')?.setValue(this.toEdit?.descripcion)
      this.productos = this.toEdit?.productos ? this.toEdit.productos : []
    }
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
      this.toEdit ? this.update(a,this.toEdit.id) : this.new(a)
      return a
    }
    return undefined
  }

  new(a:Articulo){
    this.service.new(a).subscribe(obj=>{
      this.sendSaveEvent()
    })
  }

  update(a:Articulo,id:number){
    this.service.update(a,id).subscribe(obj=>{
      this.sendSaveEvent()
    })
  }

  @Output() saveEvent = new EventEmitter<void>();
  sendSaveEvent(): void {
    this.saveEvent.emit(); // Emite el evento al padre
  }
  
}
