import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlBase = environment.backendUrl
  private clienteHttp = inject(HttpClient)

  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase)
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, producto)
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`)
  }

  editarProducto(id:number, producto: Producto){
    return this.clienteHttp.put(`${this.urlBase}/${id}`, producto)
  }

  eliminarProducto(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
  }
}
