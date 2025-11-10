import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ranking } from '../templates/ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http : HttpClient) { }
  
  private urlbase = 'http://localhost:8081/api/data';

  getTopRanking() {
    return this.http.get<ranking[]>(this.urlbase + '/GetTopRanking');
  }

  addPuntuacion(name: string, puntuacion: number){
    const ranking : ranking = {name: name, puntuacion: puntuacion}; // Propiedad para guardar la puntuación en el ranking
    return this.http.post<ranking>(this.urlbase+'/AddPuntuacion', ranking);
  }

}
