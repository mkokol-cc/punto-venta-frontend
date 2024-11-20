import { Component, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormVentaComponent } from '../../components/form-venta/form-venta.component';
import { FormClienteComponent } from '../../components/form-cliente/form-cliente.component';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../interfaces/venta';
import { Cliente } from '../../interfaces/cliente';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormVentaComponent,
    FormClienteComponent,
    MatButtonModule
  ],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {
  @ViewChild(FormVentaComponent) venta!: FormVentaComponent;
  @ViewChild(FormClienteComponent) cliente!: FormClienteComponent;

  constructor(private service:VentaService){}
  
  async save(){
    console.log('arranque')
    const c:Cliente | undefined = await this.cliente.save()
    const v:Venta = this.venta.getVenta()!
    v.cliente = c
    console.log(v)
    this.service.new(v).subscribe(obj=>{
      console.log(obj)
    })
    console.log('termine')
  }
}
