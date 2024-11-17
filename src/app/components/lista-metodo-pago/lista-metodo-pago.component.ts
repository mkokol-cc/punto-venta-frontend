import { Component } from '@angular/core';
import { TipoPago } from '../../interfaces/tipo-pago';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


const ELEMENT_DATA: TipoPago[] = [
  {id: 1, nombre: 'Efectivo', porcentajeRecargo: 0},
  {id: 2, nombre: 'Transferencia', porcentajeRecargo: 5},
  {id: 3, nombre: '6 Cuotas', porcentajeRecargo: 15},
  {id: 4, nombre: '12 Cuotas', porcentajeRecargo: 20},
]


@Component({
  selector: 'app-lista-metodo-pago',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './lista-metodo-pago.component.html',
  styleUrl: './lista-metodo-pago.component.scss'
})
export class ListaMetodoPagoComponent {
  displayedColumns: string[] = ['nombre', 'porcentajeRecargo'];
  dataSource = ELEMENT_DATA;

  send(str:string){
    alert(str)
  }
}
