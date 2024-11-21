import { Component, EventEmitter, Output } from '@angular/core';
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
    MatTableModule
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
