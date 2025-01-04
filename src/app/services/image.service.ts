import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las imágenes asociadas a un artículo.
   * @param articuloId ID del artículo.
   * @returns Observable con la lista de imágenes.
   */
  getImagesByArticuloId(articuloId: number): Observable<any> {
    const url = `${this.apiUrl}/${articuloId}`;
    return this.http.get(url);
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
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data'); // Aunque Angular detecta automáticamente el tipo

    return this.http.post(url, formData, { headers });
  }
}
