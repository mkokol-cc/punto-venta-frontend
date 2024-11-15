import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo } from '../../interfaces/articulo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorArticulosComponent } from '../buscador-articulos/buscador-articulos.component';

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

  form:FormGroup
  formDetalleCombo:FormGroup

  constructor(
    private fb: FormBuilder,
    //private vecinoService: VecinoService
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

  getValue():Articulo|undefined{
    if(this.form.valid){
      console.log(<Articulo>this.form.value)
      return <Articulo>this.form.value
    }
    return undefined
  }
  
}
