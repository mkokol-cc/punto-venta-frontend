import { Component } from '@angular/core';
import { TipoPago } from '../../interfaces/tipo-pago';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TipoPagoService } from '../../services/tipo-pago.service';

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
  tiposPago:TipoPago[] = []
  constructor(private service:TipoPagoService){
    this.service.list().subscribe(obj=>{
      this.tiposPago = obj
    })
  }

  send(str:string){
    alert(str)
  }
}
