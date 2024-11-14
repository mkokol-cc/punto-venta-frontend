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
  url:string = environment.apiUrl

  new(tipoPago:TipoPago):Observable<TipoPago>{
    return this.http.post<TipoPago>(`${this.url}`,tipoPago)
  }
  update():Observable<TipoPago>{}
  list():Observable<TipoPago[]>{}
  getById():Observable<TipoPago>{
    return this.http.get<TipoPago>(`${this.url}/${id}`)
  }

}
