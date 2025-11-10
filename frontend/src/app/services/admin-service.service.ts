import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preguntas } from '../templates/preguntas';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
  constructor(private http : HttpClient) { }

  private urlbase = 'http://localhost:8081/api/data';

  addPregunta(pregunta: preguntas){
    return this.http.post<preguntas>(this.urlbase+'/AddPregunta', pregunta);
  }

  getPreguntas(){
    return this.http.get<preguntas[]>(this.urlbase+'/GetPreguntas');
  }

  deletePregunta(id: number){
    return this.http.delete(this.urlbase+"/DeletePregunta&id="+id);
  }
  
  updatePregunta(preguntaAModificar: preguntas) {
    return this.http.put(this.urlbase+"/UpdatePregunta", preguntaAModificar);
  }
}
