import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDetalleVentaComponent } from '../edit-detalle-venta/edit-detalle-venta.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormImageComponent } from '../form-image/form-image.component';


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
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './form-venta.component.html',
  styleUrl: './form-venta.component.scss'
})
export class FormVentaComponent {
  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio', 'subtotal', 'buttons'];
  tiposPago:TipoPago[] = []
  selectedTipoPago = new FormControl(null,Validators.required)
  notaVenta:string='';
  recargoSelectedTipoPago:number = 1
  @ViewChild(BuscadorArticulosComponent) buscador!: BuscadorArticulosComponent;
  detalleVenta:DetalleVenta[] = []
  @Output() saveEvent = new EventEmitter<void>();

  constructor(private tipoPagoService:TipoPagoService,public dialog: MatDialog){
    this.tipoPagoService.list().subscribe(obj=>{
      this.tiposPago = obj
    })
    this.selectedTipoPago.valueChanges.subscribe(value => {
      if(value){
        this.updateDataForTipoPago(value)
      }else{
        this.recargoSelectedTipoPago = 1
      }
    });
  }

  sendSaveEvent(): void {
    this.saveEvent.emit(); // Emite el evento al padre
  }

  updateDataForTipoPago(tipoPago:TipoPago){
    this.recargoSelectedTipoPago = 1+(tipoPago.porcentajeRecargo/100)
    this.detalleVenta.forEach(d => {
      const recargoArticulo = 1+(d.articulo.recargo/100)
      d.precio = d.articulo.costo * recargoArticulo * this.recargoSelectedTipoPago
    });
  }

  addDetalleVenta(){
    if(this.buscador.selected.valid){
      const detalle = this.detalleVenta.find(det => det.articulo.codigo.toLowerCase() == this.buscador.selected.value?.toLowerCase())
      if(detalle){
        detalle.cantidad = detalle.cantidad+1
      }else{
        const a:Articulo = this.buscador.getSelected()!
        const recargoArticulo = (1+(a.recargo/100))
        const det:DetalleVenta = {
          articulo: a,
          precio: (a.costo * recargoArticulo * this.recargoSelectedTipoPago),
          cantidad: 1
        }
        this.detalleVenta.push(det)
      }
      this.detalleVenta = [...this.detalleVenta];
    }
  }

  getTotal() {
    return this.detalleVenta.map(dv => (dv.cantidad * dv.precio)).reduce((acc, value) => acc + value, 0);
  }

  getVenta(){
    if(this.selectedTipoPago.valid && this.detalleVenta.length>0){
      const t = <TipoPago>this.selectedTipoPago.value!
      const vta:Venta = {
        detalleVenta : this.detalleVenta,
        tipoPago : t,
        nota: this.notaVenta
      }
      return vta
    }
    return undefined
  }

  openDialog(detalleVenta:DetalleVenta): void {
    const dialogRef = this.dialog.open(EditDetalleVentaComponent, {
      data: detalleVenta,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result == -1){
          this.detalleVenta = this.detalleVenta.filter(item => item !== detalleVenta);
        }else{
          detalleVenta.cantidad = result
        }
      }
    });
  }

  viewImages(a:Articulo){
    const dialogRef = this.dialog.open(FormImageComponent, {
      data:{
        idArticulo: a.id,
        editMode: false,
      },
      autoFocus: true
    });
  }
}
