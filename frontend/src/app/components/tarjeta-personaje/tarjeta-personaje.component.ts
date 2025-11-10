import { Component, Input, OnInit } from '@angular/core';
import { GoogleTranslateService } from '../../services/translate.service';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { personajeapi } from '../../templates/personajeapi';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-personaje',
  standalone: true,
  templateUrl: './tarjeta-personaje.component.html',
  styleUrls: ['./tarjeta-personaje.component.scss']
})

export class TarjetaPersonajeComponent implements OnInit {

  subscription: Subscription | undefined;

  personajeapi: personajeapi = {
    id: 0,
    name: '',
    status: '',
    species: '',
    gender: '',
    image: ''
  };

  constructor(private rickAndMortyService: RickAndMortyService,
     private googleTranslateService: GoogleTranslateService,
  ) { }

 

  ngOnInit() {
    this.subscription = this.rickAndMortyService.personajeId$.subscribe(id => {
      if(id == -1){
        this.personajeapi.id = Math.floor(Math.random() * 100) + 1;
  
      } else {
       this.personajeapi.id = id;
      }
      console.log(this.personajeapi.id);
      this.searchCharacterById();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  

  async searchCharacterById() {
    this.rickAndMortyService.getPersonaje(this.personajeapi.id).subscribe(async (personaje) => {
      const translations = [
        this.googleTranslateService.translate(personaje.status, 'es'),
        this.googleTranslateService.translate(personaje.species, 'es'),
        this.googleTranslateService.translate(personaje.gender, 'es')
      ];
  
      const translatedTexts = await Promise.all(translations);
  
      this.personajeapi = {
        ...personaje,
        status: translatedTexts[0]?.trans,
        species: translatedTexts[1]?.trans,
        gender: translatedTexts[2]?.trans
      };
    });
  }
  
}