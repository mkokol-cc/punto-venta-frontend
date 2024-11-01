import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormVentaComponent } from '../../components/form-venta/form-venta.component';
import { FormClienteComponent } from '../../components/form-cliente/form-cliente.component';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [
    MatGridListModule,
    FormVentaComponent,
    FormClienteComponent
  ],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {

}
