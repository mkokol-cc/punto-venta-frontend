import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPago } from '../interfaces/tipo-pago';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/api/tipo-pago'

  new(tipoPago:TipoPago):Observable<TipoPago>{
    return this.http.post<TipoPago>(`${this.url}`,tipoPago)
  }
  update(tipoPago:TipoPago,id:number):Observable<TipoPago>{
    return this.http.put<TipoPago>(`${this.url}/${id}`,tipoPago)
  }
  list():Observable<TipoPago[]>{
    return this.http.get<TipoPago[]>(`${this.url}`)
  }
  getById(id:number):Observable<TipoPago>{
    return this.http.get<TipoPago>(`${this.url}/${id}`)
  }

}
