import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../servicios/producto-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  imports: [],
  templateUrl: './producto-lista.html',
})
export class ProductoLista implements OnInit {

  productos = signal<Producto[]>([]);

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(): void {

    this.productoServicio.obtenerProductosLista().subscribe({

      next: (datos) => {
        this.productos.set(datos);
      },

      error: (error) => {
        console.error("Error al obtener productos:", error);
      }

    });
  }

  editarProducto(id: number) {
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id:number){
    const confirmar = confirm(
    '⚠️ ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.'
    );
    if(confirmar){
      this.productoServicio.eliminarProducto(id).subscribe({
        next: (datos) => {
          alert('Producto eliminado correctamente')
          this.obtenerProductos()
        },
        error: (errores) => {
          console.log(errores)
        }
      })
    }
  }
}