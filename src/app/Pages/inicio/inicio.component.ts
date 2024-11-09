import { EstudianteService } from './../../services/estudiante.service';
import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Estudiante } from '../../Models/Estudiante';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private estudianteService = inject(EstudianteService);
  public listaEstudiantes:Estudiante[]=[];
  public displayedColumns:string [] = ['nombreCompleto','fechaNacimiento','genero','correoElectronico','telefono','direccion','fechaIngreso','accion']

  obtenerEstudiantes(){
    this.estudianteService.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaEstudiantes = data;
          console.log("datos de estudiantes"+data.values())
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    });
  }
  constructor(private router:Router){
    this.obtenerEstudiantes();
  }

  Nuevo(){
    this.router.navigate(['/Estudiante',0]);
  }

  Editar(objeto: Estudiante) {
    if (objeto && objeto.estudianteID) {  // Cambiado a estudianteID en minúsculas
      this.router.navigate(['/Estudiante', objeto.estudianteID]);
    } else {
      console.error("El objeto Estudiante o su ID están indefinidos", objeto);
    }
  }



  Eliminar(objeto:Estudiante){
    if(confirm('¿Desea eliminar el Empleado?'+objeto.nombreCompleto)){
      this.estudianteService.Eliminar(objeto.estudianteID).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerEstudiantes();
          }else{
            alert("No se pudo eliminar el estudiante " + objeto.nombreCompleto)
          }
          },
        error:(err)=>{
          console.log(err.message)
        }
      });
    }
  }
}



// {{ listaEmpleados | json}}
