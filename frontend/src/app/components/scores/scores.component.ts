import { Component, ElementRef, Input, Renderer2, ViewChild, NgZone } from '@angular/core';
import { ranking } from '../../templates/ranking';
import { RankingService } from '../../services/ranking.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { delay } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit{

  constructor(private rankingService: RankingService,
    private ngzone: NgZone) {}

  @ViewChild('scores') scoreDiv?: ElementRef;
  @ViewChild('loader') loaderDiv?: ElementRef;

  ranking?: ranking[];

  ngOnInit() {
    this.ngzone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngzone.run(() => {
          this.getRanking();
        });
      }, 2000); // 5000 milisegundos = 5 segundos
    });
    this.getRanking();
  }

  loaderToScore() {
    if (this.scoreDiv && this.loaderDiv) {
      this.scoreDiv.nativeElement.style.display = 'grid';
      this.loaderDiv.nativeElement.style.display = 'none';
    }
    
  }

  getRanking() {
    this.rankingService.getTopRanking().subscribe({
      next: (data) => {
        // Manejar los datos recibidos durante la suscripción
        this.ranking = data;
        if(this.ranking.length > 0)
          this.loaderToScore();
      },
      error: () => {
        // Manejar errores durante la suscripción
        //alert('Error al obtener los datos');
        return;
      },
      complete() {
        
      },
    
    });
    
  }

}
