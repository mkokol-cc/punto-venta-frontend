import { inject, Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/api/articulo'
  urlProducto:string = environment.apiUrl + '/api/producto'
  urlCombo:string = environment.apiUrl + '/api/combo'

  new(articulo:Articulo):Observable<Articulo>{
    if(articulo.esCombo){
      return this.http.post<Articulo>(`${this.urlCombo}`,articulo)
    }
    return this.http.post<Articulo>(`${this.urlProducto}`,articulo)
  }
  update(articulo:Articulo,id:number):Observable<Articulo>{
    if(articulo.esCombo){
      return this.http.put<Articulo>(`${this.urlCombo}/${id}`,articulo)
    }
    return this.http.put<Articulo>(`${this.urlProducto}/${id}`,articulo)
  }
  list(page:number, size:number, asc:boolean, combo:boolean, productosSimples:boolean, porNombre:boolean, 
    porPrecioCompra:boolean, porCodigo:boolean, filtro:string):Observable<Page>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('combo', combo.toString())
    .set('productosSimples', productosSimples.toString())
    .set('porNombre', porNombre.toString())
    .set('porPrecioCompra', porPrecioCompra.toString())
    .set('porCodigo', porCodigo.toString())
    .set('asc', asc.toString())
    .set('filtro', filtro);
    return this.http.get<Page>(`${this.url}`, { params })
  }
  getByCodigo(codigo:string):Observable<Articulo>{
    return this.http.get<Articulo>(`${this.url}/${codigo}`)
  }
  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.urlProducto}/upload`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
      responseType: 'text', // Cambia según el tipo de respuesta del backend
    });
  }
}
