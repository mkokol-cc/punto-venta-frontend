import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-barcode-print',
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
  templateUrl: './barcode-print.component.html',
  styleUrl: './barcode-print.component.scss'
})
export class BarcodePrintComponent {
  constructor(
    public dialogRef: MatDialogRef<BarcodePrintComponent>,
    @Inject(MAT_DIALOG_DATA) public code: string,
  ) {}

  cantidad:number = 0

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    alert("TENGO QUE HACER EL DOCUMENTO PDF")
    this.dialogRef.close(this.cantidad);
  }
}
