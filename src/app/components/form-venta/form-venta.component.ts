import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorArticulosComponent } from '../buscador-articulos/buscador-articulos.component';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { TipoPago } from '../../interfaces/tipo-pago';
import { DetalleVenta } from '../../interfaces/detalle-venta';
import { Articulo } from '../../interfaces/articulo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Venta } from '../../interfaces/venta';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


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
    MatSelectModule,
    BuscadorArticulosComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-venta.component.html',
  styleUrl: './form-venta.component.scss'
})
export class FormVentaComponent {
  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio', 'subtotal'];
  tiposPago:TipoPago[] = []
  selectedTipoPago = new FormControl(null,Validators.required)
  @ViewChild(BuscadorArticulosComponent) buscador!: BuscadorArticulosComponent;
  detalleVenta:DetalleVenta[] = []

  constructor(private tipoPagoService:TipoPagoService){
    this.tipoPagoService.list().subscribe(obj=>{
      this.tiposPago = obj
    })
  }

  addDetalleVenta(){
    if(this.buscador.selected.valid){
      const detalle = this.detalleVenta.find(det => det.articulo.codigo.toLowerCase() == this.buscador.selected.value?.toLowerCase())
      if(detalle){
        detalle.cantidad = detalle.cantidad+1
      }else{
        const a:Articulo = this.buscador.getSelected()!
        const det:DetalleVenta = {
          articulo: a,
          precio: (a.costo * a.recargo),
          cantidad: 1
        }
        this.detalleVenta.push(det)
      }
      this.detalleVenta = [...this.detalleVenta];
    }
  }

  send(string:string){
    alert(string)
  }

  getVenta(){
    if(this.selectedTipoPago.valid && this.detalleVenta.length>0){
      const t = <TipoPago>this.selectedTipoPago.value!
      const vta:Venta = {
        detalleVenta : this.detalleVenta,
        tipoPago : t
      }
      return vta
    }
    return undefined
  }
}
