import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { forkJoin, map } from 'rxjs';
import { GoogleTranslateService } from '../../services/translate.service';
import { TarjetaPersonajeComponent } from '../tarjeta-personaje/tarjeta-personaje.component';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [FormsModule, RouterLink, NgFor, TarjetaPersonajeComponent],
  templateUrl: './personaje.component.html',
  styleUrl: './personaje.component.scss'
})
export class PersonajeComponent implements OnInit {

  personajes: any[] = []; // Initialize the 'personajes' property
  nombrePersonaje: string = "";
  idPersonaje: number = 0;

  constructor(private rickAndMortyService: RickAndMortyService,
    private googleTranslateService: GoogleTranslateService
  ) {}

  ngOnInit() {
    this.getRandomCharacters();
  }

  getRandomCharacters() {
    const requests = [];
    for (let i = 0; i < 1; i++) {
      const id = Math.floor(Math.random() * 100) + 1;
      requests.push(this.rickAndMortyService.getPersonaje(id));
    }
    forkJoin(requests).subscribe(results => {
      const translationRequests = results.map((personaje, index) => {
        const translations = [
          this.googleTranslateService.translate((personaje as any).status, 'es'),
          this.googleTranslateService.translate((personaje as any).species, 'es'),
          this.googleTranslateService.translate((personaje as any).gender, 'es')
        ];
        return Promise.all(translations).then(translatedTexts => {
          return {
            ...personaje,
            status: translatedTexts[0]?.trans,
            species: translatedTexts[1]?.trans,
            gender: translatedTexts[2]?.trans
          };
        });
      });
      Promise.all(translationRequests).then(translatedPersonajes => {
        this.personajes = translatedPersonajes;
      });
    });
  }

  searchCharacterByName() {
    this.rickAndMortyService.getPersonajesByName(this.nombrePersonaje).subscribe(personajes => {
      const translationRequests = personajes.map((personaje: any, index: number) => {
        const translations = [
          this.googleTranslateService.translate((personaje as any).status, 'es'),
          this.googleTranslateService.translate((personaje as any).species, 'es'),
          this.googleTranslateService.translate((personaje as any).gender, 'es')
        ];
        return Promise.all(translations).then(translatedTexts => {
          return {
            ...personaje,
            status: translatedTexts[0]?.trans,
            species: translatedTexts[1]?.trans,
            gender: translatedTexts[2]?.trans
          };
        });
      });
      Promise.all(translationRequests).then(translatedPersonajes => {
        this.personajes = translatedPersonajes;
      });
    });
  }


}
