import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { preguntas } from '../../templates/preguntas';
import { respuesta } from '../../templates/respuesta';
import { NgIf, NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { EndGameComponent } from '../end-game/end-game.component';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';
import { TarjetaPersonajeComponent } from '../tarjeta-personaje/tarjeta-personaje.component';
import { ButtonModule } from 'primeng/button';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-juego',
  standalone: true,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.scss',
  imports: [
    NgFor,
    NgIf,
    DialogModule,
    EndGameComponent,
    TarjetaPersonajeComponent,
    ButtonModule,
  ],
})
export class JuegoComponent {
  tiempoRestante: number = 20; // Valor inicial de la cuenta regresiva
  preguntaActual!: preguntas;
  displayDialogFin: boolean = false;
  displayDialogPersonaje: boolean = false;
  tiempoTotal = 20;
  animacionActiva: boolean = true;
  intervalo: any;
  puntos: number = 0;
  id: number = 0;
  respuestaCorrecta1: boolean = false;
  respuestaInorrecta1: boolean = false;
  respuestaCorrecta2: boolean = false;
  respuestaIncorrecta2: boolean = false;
  respuestaCorrecta3: boolean = false;
  respuestaIncorrecta3: boolean = false;
  respuestaCorrecta4: boolean = false;
  respuestaIncorrecta4: boolean = false;


  constructor(
    private service: AdminServiceService,
    private router: Router,
    private score: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.iniciarCuentaRegresiva();
    this.obtenerPreguntas();
    if (
      this.preguntaActual &&
      this.preguntaActual.personaje &&
      this.preguntaActual.personaje.id
    ) {
      this.score.setPersonajeID(this.preguntaActual.personaje.id);
    }
  }

  preguntas!: preguntas[];

  iniciarCuentaRegresiva(): void {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.mostrarFinDeJuego();
      }
    }, 1000);
  }

  obtenerPreguntas() {
    this.service.getPreguntas().subscribe({
      next: (data: preguntas[]) => {
        this.preguntas = data;
        this.obtenerPreguntaAleatoria();
        console.log(this.preguntas);
      },
      error: () => {
        alert('Error al obtener las preguntas');
      },
      complete() {},
    });
  }

  obtenerPreguntaAleatoria() {
    if (this.preguntas.length == 0) {
      this.mostrarFinDeJuego();
    }
    const indiceAleatorio = Math.floor(Math.random() * this.preguntas.length);
    this.preguntaActual = this.preguntas[indiceAleatorio];
    this.preguntas.splice(indiceAleatorio, 1); // Elimina la pregunta del array
    this.reiniciarContador();
    this.respuestaCorrecta1 = false;
    this.respuestaInorrecta1 = false;
    this.respuestaCorrecta2 = false;
    this.respuestaIncorrecta2 = false;
    this.respuestaCorrecta3 = false;
    this.respuestaIncorrecta3 = false;
    this.respuestaCorrecta4 = false;
    this.respuestaIncorrecta4 = false;
  }

  comprobarRespuesta(respuesta: respuesta, pregunta: number) {
    if (!respuesta.correcta) {
      this.detenerContador();
      this.animacionActiva = false;
      switch (pregunta) {
        case 1:
          this.respuestaInorrecta1 = true;
          break;
        case 2:
          this.respuestaIncorrecta2 = true;
          break;
        case 3:
          this.respuestaIncorrecta3 = true;
          break;
        case 4:
          this.respuestaIncorrecta4 = true;
          break;
      }
      setTimeout(() => {
        this.mostrarFinDeJuego();
      }, 3000);
    } else {
      this.detenerContador();
      this.mostrarPersonaje();
      this.animacionActiva = false;
      this.puntos = Math.round(
        this.puntos + 100 / (this.tiempoTotal + 1 - this.tiempoRestante)
      );
      switch (pregunta) {
        case 1:
          this.respuestaCorrecta1 = true;
          break;
        case 2:
          this.respuestaCorrecta2 = true;
          break;
        case 3:
          this.respuestaCorrecta3 = true;
          break;
        case 4:
          this.respuestaCorrecta4 = true;
          break;
      }
    }
    return respuesta.correcta;
  }

  mostrarFinDeJuego() {
    this.score.setScore(this.puntos);
    this.router.navigate(['/endgame']); // Redirige a la página de "End Game"
  }

  mostrarPersonaje() {
    if (this.preguntaActual.personaje && this.preguntaActual.personaje.id) {
      this.id = this.preguntaActual.personaje.id;
      this.score.setPersonajeID(this.id);
    }
    this.displayDialogPersonaje = true;
  }

  reiniciarContador() {
    if (this.tiempoRestante == 0) {
      this.iniciarCuentaRegresiva();
    }
    this.tiempoRestante = this.tiempoTotal;
    setTimeout(() => (this.animacionActiva = true), 0);
  }

  detenerContador() {
    clearInterval(this.intervalo);
  }
}
