import { Component, Inject, Input, input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  images:Imagen[]=[]
  savedImages:Imagen[]=[]
  idArticulo: number
  editMode: boolean

  constructor(
    public dialogRef: MatDialogRef<FormImageComponent>, 
    private service:ImageService,
    @Inject(MAT_DIALOG_DATA) public data: { idArticulo: number; editMode: boolean },
  ){
    this.idArticulo = data.idArticulo
    this.editMode = data.editMode
    if(this.data.idArticulo>0){
      this.service.getImagesByArticuloId(this.data.idArticulo).subscribe(obj=>{
        this.savedImages=[...obj];
        this.images=[...obj];
      })
    }
  }

  delete(imagen:Imagen){
    this.images = this.images.filter(i => imagen.data != i.data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onClick(): void {
    if (this.idArticulo > 0) {
      // Filtrar imágenes a eliminar y a guardar
      const imagenesAEliminar = this.savedImages.filter(
        (img) => !this.images.some((newImg) => newImg.id === img.id)
      );
      const imagenesAGuardar = this.images.filter(
        (img) => !this.savedImages.some((savedImg) => savedImg.id === img.id)
      );
  
      // Crear un array de promesas para las operaciones
      const operaciones: Promise<any>[] = [];
  
      // Subir imágenes nuevas
      imagenesAGuardar.forEach((img) => {
        if (!img.id && img.file) {
          operaciones.push(this.service.uploadImage(this.idArticulo, img.file).toPromise());
        }
      });
  
      // Eliminar imágenes
      imagenesAEliminar.forEach((img) => {
        if (img.id) {
          operaciones.push(this.service.deleteImage(img.id).toPromise());
        }
      });
  
      // Esperar a que todas las operaciones se completen
      Promise.all(operaciones)
        .then(() => {
          console.log('Operaciones completadas');
          this.dialogRef.close(); // Cerrar el diálogo después de completar las operaciones
        })
        .catch((error) => {
          console.error('Error en alguna operación:', error);
          // Opcional: mostrar un mensaje de error al usuario
        });
  
      return;
    }
  
    // Si no hay idArticulo, cerrar el diálogo con las imágenes actuales
    this.dialogRef.close(this.images);
  }



  files: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push({
          data:reader.result as string,
          file:file
        })
      };
      reader.readAsDataURL(file);
    });

    // Resetear el input para poder seleccionar las mismas imágenes nuevamente
    input.value = '';
  }

  view(image:Imagen){
    const imageData = image.id ? ('data:image/jpeg;base64,' + image.data) : image.data    
    // Abrir en una nueva pestaña
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = `<img src="${imageData}"/>`;
    } else {
      console.error('No se pudo abrir una nueva pestaña.');
    }
  }

}
