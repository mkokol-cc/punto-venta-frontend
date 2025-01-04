import { Component, Input, input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { Imagen } from '../../interfaces/imagen';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-image',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './form-image.component.html',
  styleUrl: './form-image.component.scss'
})
export class FormImageComponent {

  @Input() idArticulo?: number;
  idToDelete:number[]=[]
  imagesToUpload:Imagen[]=[]
  images:Imagen[]=[]
  constructor(public dialogRef: MatDialogRef<FormImageComponent>, private service:ImageService){}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['idArticulo']){
      if(this.idArticulo && this.idArticulo>0){
        this.getImages(this.idArticulo)
      }
    }
  }

  getImages(id:number){
    this.service.getImagesByArticuloId(id).subscribe(obj=>{
      this.images=obj;
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClick(): void {
    this.dialogRef.close(true);
  }






































  previewImages: string[] = [];
  files: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    // Resetear el input para poder seleccionar las mismas imágenes nuevamente
    input.value = '';
  }

  removeImage(index: number): void {
    this.files.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

}
