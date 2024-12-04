import { Component, EventEmitter, Output } from '@angular/core';
import { TipoPago } from '../../interfaces/tipo-pago';
import { MatTableModule } from '@angular/material/table';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-metodo-pago',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './lista-metodo-pago.component.html',
  styleUrl: './lista-metodo-pago.component.scss'
})
export class ListaMetodoPagoComponent {

  displayedColumns: string[] = ['nombre', 'porcentajeRecargo', 'buttons'];
  tiposPago:TipoPago[] = []
  @Output() selectedItem = new EventEmitter<TipoPago>();
  
  constructor(private service:TipoPagoService){
    this.getItems()
  }

  getItems(){
    this.service.list().subscribe(obj=>{
      this.tiposPago = obj
    })
  }

  send(tipoPago:TipoPago){
    this.selectedItem.emit(tipoPago);
  }
}
