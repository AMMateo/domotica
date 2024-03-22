import { Component } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  variables: any = {
    bano: false,
    cocina: false,
    dormitorio: false,
    garaje: false,
    sala: false,
    terraza: false
  };

  constructor(private database: Database) {}

  ngOnInit() {
    const route = ref(this.database, 'tu-ruta-en-la-base-de-datos'); // Reemplaza 'tu-ruta-en-la-base-de-datos' con la ruta correcta en tu base de datos
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db); // Imprimir valores obtenidos de la búsqueda en la ruta 
      // Actualizar las variables locales con los valores de la base de datos
      this.variables.bano = valores_db.bano || false;
      this.variables.cocina = valores_db.cocina || false;
      this.variables.dormitorio = valores_db.dormitorio || false;
      this.variables.garaje = valores_db.garaje || false;
      this.variables.sala = valores_db.sala || false;
      this.variables.terraza = valores_db.terraza || false;
    });
  }

  toggleVariable(nombre: string) {
    this.variables[nombre] = !this.variables[nombre];
    this.actualizarDatosEnBaseDeDatos(nombre, this.variables[nombre]);
  }

  actualizarDatosEnBaseDeDatos(nombre: string, valor: boolean) {
    // Aquí debes implementar la lógica para actualizar los datos en la base de datos
  }

  buttonColorOn(variable: boolean): string {
    return variable ? 'success' : 'danger';
  }
}
