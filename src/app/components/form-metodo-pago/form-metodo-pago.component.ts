import { Component } from '@angular/core';
import { TipoPago } from '../../interfaces/tipo-pago';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-metodo-pago',
  standalone: true,
  imports: [    
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-metodo-pago.component.html',
  styleUrl: './form-metodo-pago.component.scss'
})
export class FormMetodoPagoComponent {
  
  form:FormGroup
  constructor(
    private fb: FormBuilder,
    //private vecinoService: VecinoService
  ) {
    this.form = this.fb.group({
      porcentajeRecargo: ['', [Validators.required, Validators.minLength(2)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  getValue():TipoPago|undefined{
    if(this.form.valid){
      console.log(<TipoPago>this.form.value)
      return <TipoPago>this.form.value
    }
    return undefined
  }
}
