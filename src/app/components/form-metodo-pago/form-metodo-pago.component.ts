import { Component } from '@angular/core';
import { TipoPago } from '../../interfaces/tipo-pago';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-metodo-pago',
  standalone: true,
  imports: [    
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './form-metodo-pago.component.html',
  styleUrl: './form-metodo-pago.component.scss'
})
export class FormMetodoPagoComponent {
  
  form:FormGroup
  constructor(
    private fb: FormBuilder,
    private service: TipoPagoService
  ) {
    this.form = this.fb.group({
      porcentajeRecargo: ['', [Validators.required, Validators.min(0)]],
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
  save():TipoPago|undefined{
    if(this.form.valid){
      console.log(<TipoPago>this.form.value)
      this.service.new(<TipoPago>this.form.value).subscribe()
      return <TipoPago>this.form.value
    }
    return undefined
  }
}
