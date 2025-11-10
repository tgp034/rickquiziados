import { Component, NgZone, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RankingInicioService } from '../../services/ranking-inicio.service';
import { ranking } from '../../templates/ranking';
import { CommonModule, NgFor } from '@angular/common';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { personaje } from '../../templates/personaje';
import { TarjetaPersonajeComponent } from '../tarjeta-personaje/tarjeta-personaje.component';
import { DialogModule } from 'primeng/dialog';
import { TemporadasComponent } from '../temporadas/temporadas.component';
import { ScrollerModule } from 'primeng/scroller';


@Component({
  selector: 'app-pantalla-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor, TarjetaPersonajeComponent, DialogModule, TemporadasComponent, ScrollerModule],
  templateUrl: './pantalla-inicio.component.html',
  styleUrl: './pantalla-inicio.component.scss'
})
export class PantallaInicioComponent implements OnInit{
abrirApi() {
throw new Error('Method not implemented.');
}
  constructor(private rankingService: RankingInicioService,
    private ngzone: NgZone, private rickAndMortyService : RickAndMortyService) {}

  ranking?: ranking[];
  displayEpisodios: boolean = false;
  personaje?: any;
  idAleatorio: number = 1;
  ngOnInit() {
    this.idAleatorio = Math.floor(Math.random() * 10) + 1;
    this.personaje = this.rickAndMortyService.getPersonaje(this.idAleatorio);
    this.ngzone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngzone.run(() => {
          this.getRanking();
        });
      }, 2000); // 5000 milisegundos = 5 segundos
    });
    this.getRanking();
  }

  
  getRanking() {
    this.rankingService.getTopRankingInit().subscribe({
      next: (data) => {
        this.ranking = data;
        console.log(this.ranking);
      },
      error: () => {
        console.log('Error al cargar el ranking');
        return;
      },
      complete() {
        
      },
    
    });
    
  }

}
