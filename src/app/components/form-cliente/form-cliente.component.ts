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
  clienteEncontrado:boolean = false

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
      this.form.get('cuitDni')?.disable()
      this.form.get('nombre')?.disable()
      this.form.get('telefono')?.disable()
      this.form.get('direccion')?.disable()
      this.form.get('condicionIva')?.disable()
    }else{
      this.form.get('cuitDni')?.enable()
      this.form.get('nombre')?.enable()
      this.form.get('telefono')?.enable()
      this.form.get('direccion')?.enable()
      this.form.get('condicionIva')?.enable()
    }
  }

  editForm(){
    this.form.get('nombre')?.enable()
    this.form.get('telefono')?.enable()
    this.form.get('direccion')?.enable()
    this.form.get('condicionIva')?.enable()
  }

  resetFindCliente(){
    this.form.reset()
    this.clienteEncontrado = false
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
          this.clienteEncontrado = true
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
    if(this.form.valid){
      try {
        const obj = await this.service.new(<Cliente>this.form.value).toPromise();
        c = obj;
      } catch (error) {
        console.error('Error al guardar cliente:', error);
      }
    }
    console.log(c)
    return c
  }

}
