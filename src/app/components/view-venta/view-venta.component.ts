import { Component, Inject } from '@angular/core';
import { Venta } from '../../interfaces/venta';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DetalleVenta } from '../../interfaces/detalle-venta';

@Component({
  selector: 'app-view-venta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CurrencyPipe,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './view-venta.component.html',
  styleUrl: './view-venta.component.scss'
})
export class ViewVentaComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: Venta
  ) {
    this.data = venta.detalleVenta
  }

  data:DetalleVenta[] = []
  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio', 'subtotal'];

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTotal() {
    return this.venta.detalleVenta.map(dv => (dv.cantidad * dv.precio)).reduce((acc, value) => acc + value, 0);
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
