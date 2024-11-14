import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { FormComboComponent } from '../form-combo/form-combo.component';

const ELEMENT_DATA: any[] = [
  {codigo: 1, nombre: 'Mesa', descripcion: 'descripcion', precio: 10000.00},
  {codigo: 2, nombre: 'Silla', descripcion: 'descripcion', precio: 40000.00},
  {codigo: 3, nombre: 'Cama', descripcion: 'descripcion', precio: 60000.00},
  {codigo: 4, nombre: 'Mueble', descripcion: 'descripcion', precio: 90000.00},
  {codigo: 5, nombre: 'Biblioteca', descripcion: 'descripcion', precio: 20000.00},
]

@Component({
  selector: 'app-lista-articulos',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    FormComboComponent
  ],
  templateUrl: './lista-articulos.component.html',
  styleUrl: './lista-articulos.component.scss'
})
export class ListaArticulosComponent {


  selectedTabIndex = 0

  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'precio'];
  dataSource = ELEMENT_DATA;
  send(string:string){
    alert(string)
  }
}
