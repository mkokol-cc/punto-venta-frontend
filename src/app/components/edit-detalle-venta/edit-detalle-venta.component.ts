import { Component, Inject } from '@angular/core';
import { DetalleVenta } from '../../interfaces/detalle-venta';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-detalle-venta',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-detalle-venta.component.html',
  styleUrl: './edit-detalle-venta.component.scss'
})
export class EditDetalleVentaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDetalleVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public detalleVenta: DetalleVenta
  ) {
    this.cantidad = detalleVenta.cantidad
  }

  cantidad:number = 0

  delete(): void {
    this.dialogRef.close(-1);
  }

  onClick(): void {
    this.dialogRef.close(this.cantidad);
  }
}
