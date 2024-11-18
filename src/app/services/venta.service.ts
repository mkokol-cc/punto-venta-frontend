import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/venta'

  new(venta:Venta):Observable<Venta>{
    return this.http.post<Venta>(`${this.url}`,venta)
  }
  list():Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.url}`)
  }
  getById(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.url}/${id}`)
  }
}
