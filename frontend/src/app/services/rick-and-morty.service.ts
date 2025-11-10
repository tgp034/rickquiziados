import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { personajeapi } from '../templates/personajeapi';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  score: number = -1;
  private personajeId = new BehaviorSubject<number>(-1);
  personajeId$ = this.personajeId.asObservable();

  constructor(private http : HttpClient) { }

  getPersonajes(): Observable<any> {
    return this.http.get('https://rickandmortyapi.com/api/character')
      .pipe(
        map((data: any) => data.results),
        shareReplay()
      );
  }

  getPersonaje(id: number): Observable<personajeapi> {
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`)
      .pipe(
        map((data: Object) => data as personajeapi),
        shareReplay()
      );
  }

  getPersonajesByName(name: string): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .pipe(
        map((data: any) => data.results),
        shareReplay()
      );
  }

  setScore(score: number): void {
    this.score = score;
  }

  getScore(): number {
    return this.score;
  }


   setPersonajeID(id: number) {
    this.personajeId.next(id);
  }

  getSeasons(): Observable<{ [key: string]: string[] }> {
    return this.http.get<{ [key: string]: string[] }>('http://localhost:8081/api/data/scrapping')
      .pipe(
        shareReplay()
      );
  }
  
}
