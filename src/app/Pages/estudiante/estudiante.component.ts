import { EstudianteService } from './../../services/estudiante.service';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Estudiante } from '../../Models/Estudiante';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

// los que no tienen la palabra module al final no se colocan en los [[IMPORTS]]

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  // ajuste en tipo de date number
  @Input('id')estudianteID! : number;
  private EstudianteService = inject(EstudianteService);
  public formBuild = inject(FormBuilder);


  public formEstudiante:FormGroup = this.formBuild.group({
  nombreCompleto:[''],
  fechaNacimiento:[''],
  genero:[''],
  correoElectronico:[''],
  telefono:[''],
  direccion:[''],
  fechaIngreso:['']
  });

  constructor(private router:Router){}

  ngOnInit():void{
    if (this.estudianteID != 0) {
      this.EstudianteService.Obtener(this.estudianteID).subscribe({
        next:(data)=>{
          this.formEstudiante.patchValue({
            nombreCompleto:data.nombreCompleto,
            fechaNacimiento:data.fechaNacimiento,
            genero:data.genero,
            correoElectronico:data.correoElectronico,
            telefono:data.telefono,
            direccion:data.direccion,
            fechaIngreso:data.fechaIngreso
          })
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }


  Guardar(){
    const objeto:Estudiante = {
      estudianteID: this.estudianteID,
      nombreCompleto: this.formEstudiante.value.nombreCompleto,
      fechaNacimiento: this.formEstudiante.value.fechaNacimiento,
      genero: this.formEstudiante.value.genero,
      correoElectronico: this.formEstudiante.value.correoElectronico,
      telefono: this.formEstudiante.value.telefono,
      direccion: this.formEstudiante.value.direccion,
      fechaIngreso: this.formEstudiante.value.fechaIngreso
    }
    if(this.estudianteID==0){
      this.EstudianteService.Crear(objeto).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
            alert("estudiante guardado")
          }else{
            alert("Error al crear el Estudiante")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }else{
      this.EstudianteService.Editar(objeto).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar el Estudiante")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

volver(){
  this.router.navigate(["/"]);
}
}
