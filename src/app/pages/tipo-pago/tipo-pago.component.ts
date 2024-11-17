import { Component } from '@angular/core';
import { ListaMetodoPagoComponent } from '../../components/lista-metodo-pago/lista-metodo-pago.component';
import { FormMetodoPagoComponent } from '../../components/form-metodo-pago/form-metodo-pago.component';

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

}
