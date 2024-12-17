import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { VentaService } from '../../services/venta.service';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Venta } from '../../interfaces/venta';
import { TipoPago } from '../../interfaces/tipo-pago';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DetalleVenta } from '../../interfaces/detalle-venta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-ventas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './lista-ventas.component.html',
  styleUrl: './lista-ventas.component.scss'
})
export class ListaVentasComponent {
  ventas: Venta[] = []
  displayedColumns: string[] = ['fecha', 'cliente', 'tipoPago', 'total', 'buttons'];
  tiposPago:TipoPago[] = []
  selectedTipoPago?:TipoPago

  constructor(
    private service:VentaService, 
    private serviceTipoPago:TipoPagoService, 
    public dialog: MatDialog,
    private router: Router){
    this.getItems()
    this.serviceTipoPago.list().subscribe(obj=>{
      this.tiposPago = obj
    })
  }

  getItems(){
    this.removeableFilter = (
      this.busqueda!='' || 
      this.fechaDesde!=undefined || 
      this.fechaHasta!=undefined || 
      this.selectedTipoPago!=undefined
    )
    this.service.list(this.page, this.size, this.fechaDesde, this.fechaHasta, this.busqueda, this.selectedTipoPago?.id,
      this.porPrecio, this.porFecha, this.asc).subscribe(obj=>{
      this.ventas = <Venta[]>obj.data
      this.count = obj.count
    })
  }

  calcularTotal(detalleVenta:DetalleVenta[]):number{
    let total = 0
    detalleVenta.forEach(det => {
      total = total + (det.precio/**det.cantidad*/)
    });
    return total
  }

  //PAGINACION Y FILTRO
  page:number = 0
  size:number = 5
  fechaDesde?:Date
  fechaHasta?:Date
  busqueda:string = ''
  tipoPagoId?:number
  porPrecio:boolean = false
  porFecha:boolean = false
  asc:boolean = false

  count:number = 0

  onPageChange(event: PageEvent){
    this.page = event.pageIndex
    this.getItems()
  }


  openDialog(id:number){
    console.log(id)
  }

  removeableFilter:boolean = false

  removeFilter(){
    this.busqueda = ''
    this.fechaDesde=undefined
    this.fechaHasta=undefined
    this.selectedTipoPago=undefined
    this.removeableFilter = false
    this.getItems()
  }


  parseToDate(rawDate: string): Date {
    const dateParts = String(rawDate).split(',').map(Number); // Convertir a números
    // Recordar que los meses en Date van de 0 (enero) a 11 (diciembre)
    const date = new Date(
      dateParts[0], // Año
      dateParts[1] - 1, // Mes (ajustar índice)
      dateParts[2], // Día
      dateParts[3], // Hora
      dateParts[4], // Minuto
      dateParts[5], // Segundo
      dateParts[6] / 1000000 // Milisegundos
    )
    return date;
  }

}
