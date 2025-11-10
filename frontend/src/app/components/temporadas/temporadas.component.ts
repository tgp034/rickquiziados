import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-temporadas',
  standalone: true,
  imports: [NgFor, CommonModule, ],
  templateUrl: './temporadas.component.html',
  styleUrl: './temporadas.component.scss',
})
export class TemporadasComponent implements OnInit {
  seasons: { [key: string]: string[] } = {};
  selectedSeason: string | null = null;

  constructor(private scrappingService: RickAndMortyService) {}

  ngOnInit(): void {
    this.getSeasons();
  }

  getSeasons() {
    this.scrappingService.getSeasons().subscribe({
      next: (data) => {
        this.seasons = data;
        console.log(this.seasons);
      },
      error: (error) => {
        console.log('Error al cargar el scrapping', error);
        return;
      },
    });
  }
  
  toggleEpisodes(season: string) {
    if (this.selectedSeason === season) {
      this.selectedSeason = null;
    } else {
      this.selectedSeason = season;
    }
  }
}
