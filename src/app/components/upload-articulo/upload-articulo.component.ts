import { Component, EventEmitter, Output } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-articulo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './upload-articulo.component.html',
  styleUrl: './upload-articulo.component.scss'
})
export class UploadArticuloComponent {

  csvFile?: File;

  constructor(private service:ArticuloService){}

  onFileSelected(event: any): void {
    this.csvFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.csvFile) {
      this.service.uploadCSV(this.csvFile).subscribe(obj=>{
        this.sendSaveEvent()
      });
    }
  }

  @Output() saveEvent = new EventEmitter<void>();
  sendSaveEvent(): void {
    this.saveEvent.emit(); // Emite el evento al padre
  }
}
