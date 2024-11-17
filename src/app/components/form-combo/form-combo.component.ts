import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo } from '../../interfaces/articulo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorArticulosComponent } from '../buscador-articulos/buscador-articulos.component';
import { ArticuloService } from '../../services/articulo.service';
import { DetalleCombo } from '../../interfaces/detalle-combo';

@Component({
  selector: 'app-form-combo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    BuscadorArticulosComponent
  ],
  templateUrl: './form-combo.component.html',
  styleUrl: './form-combo.component.scss'
})
export class FormComboComponent {

  @ViewChild(BuscadorArticulosComponent) buscador!: BuscadorArticulosComponent;
  form:FormGroup
  formDetalleCombo:FormGroup
  productos: DetalleCombo[] = []

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

  /**
   * 
   * export interface Articulo {
    id: number,
    codigo:string,
    nombre:string,
    descripcion:string,
    stock: number,
    costo: number,
    recargo: number,
    esCombo: boolean,
    productos: DetalleCombo[]
}
   */


  addProducto(){
    if(this.formDetalleCombo.valid && this.buscador.selected.valid){
      let p:DetalleCombo = {
        articulo : this.buscador.getSelected()!,
        cantidad : this.formDetalleCombo.get('cantidad')?.value
      }
      this.productos.push(p)
    }
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
      this.service.new(a).subscribe()
      return a
    }
    return undefined
  }
  
}
