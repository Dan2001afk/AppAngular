import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Estudiante } from '../Models/Estudiante';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Estudiante";
  constructor() { }

  lista(){
    return this.http.get<Estudiante[]>(this.apiUrl)
  }

  Obtener(id:number){
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }

  Crear(objeto:Estudiante){
    return this.http.post<ResponseApi>(this.apiUrl,objeto);
  }

  Editar(objeto:Estudiante){
    return this.http.put<ResponseApi>(this.apiUrl,objeto);
  }

  Eliminar(id:number){
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }
}
