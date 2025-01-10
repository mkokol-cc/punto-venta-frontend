import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Imagen } from '../interfaces/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiUrl + '/api/image';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las imágenes asociadas a un artículo.
   * @param articuloId ID del artículo.
   * @returns Observable con la lista de imágenes.
   */
  getImagesByArticuloId(articuloId: number): Observable<Imagen[]> {
    const url = `${this.apiUrl}/${articuloId}`;
    return this.http.get<Imagen[]>(url);
  }

  /**
   * Elimina una imagen por su ID.
   * @param imagenId ID de la imagen a eliminar.
   * @returns Observable vacío al completar la eliminación.
   */
  deleteImage(imagenId: number): Observable<void> {
    const url = `${this.apiUrl}/${imagenId}`;
    return this.http.delete<void>(url);
  }

  /**
   * Sube una imagen asociada a un artículo.
   * @param articuloId ID del artículo al que se asocia la imagen.
   * @param file Archivo de imagen a subir.
   * @returns Observable con la respuesta del servidor.
   */
  uploadImage(articuloId: number, file: File): Observable<any> {
    const url = `${this.apiUrl}/${articuloId}`;

    // Convertir la Promesa en un Observable
    return from(this.resizeAndConvertToWebP(file)).pipe(
      switchMap((optimizedFile) => {
        const formData = new FormData();
        formData.append('file', optimizedFile);
  
        const headers = new HttpHeaders();
        // No necesitas establecer 'Content-Type', Angular lo maneja automáticamente para FormData.
  
        // Realizar la petición HTTP
        return this.http.post(url, formData, { headers });
      })
    );
  }



  resizeAndConvertToWebP(file: File): Promise<File> {
    const maxWidth = 1000
    const maxHeight = 1000 
    const quality = 1
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      // Leer el archivo como DataURL
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          // Crear un canvas para redimensionar la imagen
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('No se pudo obtener el contexto del canvas.');
            return;
          }
  
          // Calcular las nuevas dimensiones manteniendo la escala
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              width = maxWidth;
              height = (img.height * maxWidth) / img.width;
            } else {
              height = maxHeight;
              width = (img.width * maxHeight) / img.height;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Dibujar la imagen redimensionada en el canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convertir la imagen a formato WEBP
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Crear un nuevo archivo a partir del blob
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                  type: 'image/webp',
                });
                resolve(webpFile);
              } else {
                reject('No se pudo generar el blob.');
              }
            },
            'image/webp',
            quality
          );
        };
  
        // Manejar errores en la carga de la imagen
        img.onerror = () => {
          reject('No se pudo cargar la imagen.');
        };
  
        // Cargar la imagen desde el resultado del FileReader
        img.src = event.target.result;
      };
  
      // Leer el archivo como DataURL
      reader.onerror = () => {
        reject('No se pudo leer el archivo.');
      };
      reader.readAsDataURL(file);
    });
  }
}
