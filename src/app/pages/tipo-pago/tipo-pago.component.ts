import { Component, ViewChild } from '@angular/core';
import { ListaMetodoPagoComponent } from '../../components/lista-metodo-pago/lista-metodo-pago.component';
import { FormMetodoPagoComponent } from '../../components/form-metodo-pago/form-metodo-pago.component';
import { TipoPago } from '../../interfaces/tipo-pago';

@Component({
  selector: 'app-tipo-pago',
  standalone: true,
  imports: [
    ListaMetodoPagoComponent,
    FormMetodoPagoComponent
  ],
  templateUrl: './tipo-pago.component.html',
  styleUrl: './tipo-pago.component.scss'
})
export class TipoPagoComponent {

  @ViewChild(ListaMetodoPagoComponent) lista!: ListaMetodoPagoComponent;
  selectedTipoPago?:TipoPago

  reloadList(){
    this.lista.getItems();
  }

  toEdit(tipoPago:TipoPago){
    this.selectedTipoPago = { ...tipoPago };
  }

}
