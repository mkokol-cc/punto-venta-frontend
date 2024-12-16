import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SesionService } from '../../services/sesion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  hide = true;
  form:FormGroup
  
  constructor(
    private fb: FormBuilder,
    private service: SesionService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      noExpiration: false
    })
  }

  login(){
    console.log(this.form.value)
    this.service.login(this.form.value)
  }

}
