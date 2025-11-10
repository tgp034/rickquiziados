import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ranking } from '../templates/ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingInicioService {

  constructor(private http : HttpClient) {

   }

  private urlbase = 'http://localhost:8081/api/data';

  getTopRankingInit(){
    return this.http.get<ranking[]>(this.urlbase + '/GetTopRankingInit');
  }
}
