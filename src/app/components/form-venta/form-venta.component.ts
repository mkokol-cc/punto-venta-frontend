import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


const ELEMENT_DATA: any[] = [
  {codigo: 1, nombre: 'Mesa', cantidad: 2, precio: 10000.00, subtotal: 10000.00},
  {codigo: 2, nombre: 'Silla', cantidad: 2, precio: 40000.00, subtotal: 10000.00},
  {codigo: 3, nombre: 'Cama', cantidad: 2, precio: 60000.00, subtotal: 10000.00},
  {codigo: 4, nombre: 'Mueble', cantidad: 2, precio: 90000.00, subtotal: 10000.00},
  {codigo: 5, nombre: 'Biblioteca', cantidad: 2, precio: 20000.00, subtotal: 10000.00},
]

@Component({
  selector: 'app-form-venta',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './form-venta.component.html',
  styleUrl: './form-venta.component.scss'
})
export class FormVentaComponent {
  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio', 'subtotal'];
  dataSource = ELEMENT_DATA;

  send(string:string){
    alert(string)
  }
}
