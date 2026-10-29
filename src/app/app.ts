import { Component, signal } from '@angular/core';
import { ProductoLista } from './producto-lista/producto-lista';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterModule]
})
export class App {
  protected readonly title = signal('inventario-app');
}
