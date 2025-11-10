import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RankingService } from '../../services/ranking.service';
import { FormsModule } from '@angular/forms';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { ranking } from '../../templates/ranking';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.scss',
})
export class EndGameComponent implements OnInit {
  name: string = ''; // Propiedad para guardar el nombre del jugador
  score: number = 0; // Propiedad para guardar la puntuación del jugador
  ranking?: ranking[];
  nameIsValid: boolean = false;
  constructor(
    private service: RankingService,
    private scores: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.score = this.scores.getScore();
    if (this.score == -1) {
      this.score = 0;
    }
    
    this.getRanking();
  }

  addPuntuacion() {
   
    if (this.isValidName(this.name) == false ){
      alert('Introduce un nombre valido o que no exista en el ranking');
      return;
    }
    this.service.addPuntuacion(this.name, this.scores.getScore()).subscribe({
      next: (response) => {
        console.log('Puntuación guardada correctamente:', response);
      },
      error: () => {
        console.error('Error al guardar la puntuación:');
      },
    });
  }

  getRanking() {
    this.service.getTopRanking().subscribe({
      next: (data) => {
        // Manejar los datos recibidos durante la suscripción
        this.ranking = data;
      },
      error: (error) => {
      }
    });

  }

  // Función de validación para verificar si 'name' es válido
  isValidName(name: string): boolean {
    const validName = name.trim().length > 0;
    const nameExists = this.ranking?.some((element) => element.name === name.trim());
    if(validName == false || nameExists == true){
      return false;
    }

    return  true; // Verifica si 'name' tiene al menos un carácter distinto de un espacio en blanco
  }
}
