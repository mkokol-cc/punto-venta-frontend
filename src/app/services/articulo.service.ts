import { inject, Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/articulo'
  urlProducto:string = environment.apiUrl + '/producto'
  urlCombo:string = environment.apiUrl + '/combo'

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
  list():Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.url}`)
  }
  getByCodigo(codigo:string):Observable<Articulo>{
    return this.http.get<Articulo>(`${this.url}/${codigo}`)
  }
}
