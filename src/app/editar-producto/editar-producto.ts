import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../servicios/producto-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.html',
})
export class EditarProducto implements OnInit {

  producto: Producto = new Producto();

  id: number = 0;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private enrutador = inject(Router)

  ngOnInit(): void {

    this.id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.productoServicio.obtenerProductoPorId(this.id).subscribe({

      next: (datos) => {

        this.producto = datos;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener el producto:', error);
      }

    });

  }

  onSubmit(): void {
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: (datos) => this.irProductoLista(),
      error: (errores) => console.log(errores)
    })
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos'])
  }
}