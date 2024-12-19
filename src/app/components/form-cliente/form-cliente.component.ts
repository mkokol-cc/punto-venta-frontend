import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.scss'
})
export class FormClienteComponent {

  form:FormGroup
  clienteEncontrado?:number

  constructor(
    private fb: FormBuilder,
    private service: ClienteService
  ) {
    this.form = this.fb.group({
      cuitDni: ['', [Validators.required, Validators.minLength(7)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      condicionIva: [, [Validators.required]],
    })
  }

  blockForm(block:boolean){
    if(block){
      this.form.get('cuitDni')?.disable({ emitEvent: false })
      this.form.get('nombre')?.disable({ emitEvent: false })
      this.form.get('telefono')?.disable({ emitEvent: false })
      this.form.get('direccion')?.disable({ emitEvent: false })
      this.form.get('condicionIva')?.disable({ emitEvent: false })
    }else{
      this.form.get('cuitDni')?.enable({ emitEvent: false })
      this.form.get('nombre')?.enable({ emitEvent: false })
      this.form.get('telefono')?.enable({ emitEvent: false })
      this.form.get('direccion')?.enable({ emitEvent: false })
      this.form.get('condicionIva')?.enable({ emitEvent: false })
    }
  }

  editForm(){
    this.form.get('nombre')?.enable({ emitEvent: false })
    this.form.get('telefono')?.enable({ emitEvent: false })
    this.form.get('direccion')?.enable({ emitEvent: false })
    this.form.get('condicionIva')?.enable({ emitEvent: false })
  }

  resetFindCliente(){
    this.form.reset()
    this.clienteEncontrado = undefined
    this.blockForm(false)
  }

  findClient(){
    if(this.form.get('cuitDni') && this.form.get('cuitDni')?.valid){
      this.service.getByDNI(this.form.get('cuitDni')?.value).subscribe(obj=>{
        this.form.get('nombre')?.setValue(obj.nombre ? obj.nombre : '')
        this.form.get('telefono')?.setValue(obj.telefono ? obj.telefono : '')
        this.form.get('direccion')?.setValue(obj.direccion ? obj.direccion : '')
        this.form.get('condicionIva')?.setValue(obj.condicionIva ? obj.condicionIva : '')
        if(obj.id){
          this.clienteEncontrado = Number(obj.id)
          this.blockForm(true)
        }
      })
    }
  }

  getValue():Cliente|undefined{
    if(this.form.valid){
      console.log(<Cliente>this.form.value)
      return <Cliente>this.form.value
    }
    return undefined
  }

  async save():Promise<Cliente | undefined>{
    let c = undefined
    this.form.enable()
    if(this.form.valid){
      this.form.disable()
      try {
        if(this.clienteEncontrado){
          const obj = await firstValueFrom(this.service.update(<Cliente>this.form.value,this.clienteEncontrado));
          c = obj;
        }else{
          const obj = await firstValueFrom(this.service.new(<Cliente>this.form.value));
          c = obj;
        }
      } catch (error) {
        console.error('Error al guardar cliente:', error);
      }
    }
    return c
  }

}
