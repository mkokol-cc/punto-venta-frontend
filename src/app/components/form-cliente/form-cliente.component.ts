import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.scss'
})
export class FormClienteComponent {

  form:FormGroup

  constructor(
    private fb: FormBuilder,
    //private vecinoService: VecinoService
  ) {
    this.form = this.fb.group({
      cuitDni: ['', [Validators.required, Validators.minLength(2)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      condicionIva: [, [Validators.required]],
    })
  }

  getValue():Cliente|undefined{
    if(this.form.valid){
      console.log(<Cliente>this.form.value)
      return <Cliente>this.form.value
    }
    return undefined
  }

}
