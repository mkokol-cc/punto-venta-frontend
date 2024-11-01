import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.scss'
})
export class FormClienteComponent {

}
