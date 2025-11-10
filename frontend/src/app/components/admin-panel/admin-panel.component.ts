import { OnInit, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { respuesta } from '../../templates/respuesta';
import { preguntas } from '../../templates/preguntas';
import { AdminServiceService } from '../../services/admin-service.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { personaje } from '../../templates/personaje';
import { TimelineModule } from 'primeng/timeline';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    ToggleButtonModule,
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TimelineModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private service: AdminServiceService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  //Create a boolean
  id: number = 0;
  respuestas: respuesta[] = [];
  loading: boolean = false;
  //This is for the select
  character: personaje[] = [
    { name: 'Rick Sanchez', code: '1' },
    { name: 'Morty Smith', code: '2' },
    { name: 'Summer Smith', code: '3' },
    { name: 'Beth Smith', code: '4' },
    { name: 'Jerry Smith', code: '5' },
    { name: 'Abadango Cluster Princess', code: '6' },
    { name: 'Abradolf Lincler', code: '7' },
    { name: 'Adjudicator Rick', code: '8' },
    { name: 'Agency Director', code: '9' },
    { name: 'Alan Rails', code: '10' },
    { name: 'Albert Einstein', code: '11' },
    { name: 'Alexander', code: '12' },
    { name: 'Alien Googah', code: '13' },
    { name: 'Alien Morty', code: '14' },
    { name: 'Alien Rick', code: '15' },
    { name: 'Amish Cyborg', code: '16' },
    { name: 'Annie', code: '17' },
    { name: 'Antenna Morty', code: '18' },
    { name: 'Antenna Rick', code: '19' },
    { name: 'Ants in my Eyes Johnson', code: '20' },
    { name: 'Aqua Morty', code: '21' },
    { name: 'Aqua Rick', code: '22' },
    { name: 'Arcade Alien', code: '23' },
    { name: 'Armagheadon', code: '24' },
    { name: 'Armothy', code: '25' },
    { name: 'Arthricia', code: '26' },
    { name: 'Artist Morty', code: '27' },
    { name: 'Attila Starwar', code: '28' },
    { name: 'Baby Legs', code: '29' },
    { name: 'Baby Poopybutthole', code: '30' },
  ];

  events = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      icon: 'pi pi-shopping-cart',
      color: '#9C27B0',
      image: 'game-controller.jpg',
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-cog',
      color: '#673AB7',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-shopping-cart',
      color: '#FF9800',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
    },
  ];
  selectedCharacter!: personaje;
  //-------------//
  textopregunta: string = '';
  textorespuesta: string = '';
  seleccionado!: respuesta;
  pregunta!: preguntas;

  preguntasExistentes!: preguntas[];
  expandedRowKeys: any[] = [];

  dialogVisible: boolean = false;

  preguntaAModificar!: preguntas;
  respuestaSeleccionada!: respuesta;
  preguntaAModificarS: string = '';
  Respuesta1AModificar: string = '';
  Respuesta2AModificar: string = '';
  Respuesta3AModificar: string = '';
  Respuesta4AModificar: string = '';
  personajeAModificar!: personaje;

  showDialog(pregunta: preguntas) {
    this.setPreguntasAModificar(pregunta);
    this.dialogVisible = true;
  }

  setPreguntasAModificar(pregunta: preguntas) {
    this.preguntaAModificar = pregunta;
    this.respuestaSeleccionada = this.getRespuestaCorrectaModel(pregunta);
    this.Respuesta1AModificar = pregunta.respuestas[0].respuesta;
    this.Respuesta2AModificar = pregunta.respuestas[1].respuesta;
    if(pregunta.respuestas.length != 2)
    this.Respuesta3AModificar = pregunta.respuestas[2].respuesta;
    if(pregunta.respuestas.length != 2)
    this.Respuesta4AModificar = pregunta.respuestas[3].respuesta;
    this.preguntaAModificarS = pregunta.pregunta;
    this.personajeAModificar = pregunta.personaje;
  }

  obtenerPreguntas() {
    this.service.getPreguntas().subscribe({
      next: (data: preguntas[]) => {
        // Manejar los datos recibidos durante la suscripción
        this.preguntasExistentes = data;
        if(this.preguntasExistentes == null)
        this.preguntasExistentes = [];
      },
      error: () => {
        // Manejar errores durante la suscripción
        alert('Error al obtener las preguntas');
      },
      complete() {},
    });
  }

  setRespuesta(selected: respuesta) {
    if (this.seleccionado != null) this.seleccionado.correcta = false;
    this.seleccionado = selected;
  }

  addRespuesta() {
    if (this.respuestas.length == 4) {
      alert('No puedes añadir más respuestas');
      return;
    }

    let respuesta: respuesta = {
      id: this.id++,
      respuesta: this.textorespuesta,
      correcta: false,
    };
    this.respuestas.push(respuesta);
    this.textorespuesta = '';
  }

  sendRespuesta() {

    if (this.seleccionado == null) {
      alert('Selecciona una respuesta');
      return;
    }

    if (this.respuestas.length != 2 && this.respuestas.length != 4) {
      alert('Debe haber 2 o 4 respuestas');
      return;
    }

    if (this.textopregunta == '') {
      alert('Introduce una pregunta');
      return;
    }

    if (this.selectedCharacter == undefined) {
      alert('Selecciona un personaje');
      return;
    }

    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i].respuesta == this.seleccionado.respuesta) {
        this.respuestas[i].correcta = true;
        this.pregunta = {
          pregunta: this.textopregunta,
          respuestas: this.respuestas,
          personaje: this.selectedCharacter,
        };

        //console.log(this.pregunta.personaje);

        for (let i = 0; i < this.respuestas.length; i++) {
          this.respuestas[i].id = undefined;
        }
      }
    }
    this.service.addPregunta(this.pregunta).subscribe({
      next: (data) => {
        // Manejar los datos recibidos durante la suscripción
        alert('Pregunta añadida');

        this.preguntasExistentes.push(data as preguntas);
        this.clear();
      },
      error: () => {
        // Manejar errores durante la suscripción
        alert('Error al añadir la pregunta');
        return;
      },
      complete() {},
    });
    return;
  }

  getRespuestaCorrecta(pregunta: preguntas): string {
    let respuestaCorrecta = pregunta.respuestas.find(
      (respuesta) => respuesta.correcta
    );
    return respuestaCorrecta ? respuestaCorrecta.respuesta : '';
  }

  getRespuestaCorrectaModel(pregunta: preguntas): respuesta {
    let respuestaCorrecta = pregunta.respuestas.find(
      (respuesta) => respuesta.correcta
    );
    return respuestaCorrecta ? respuestaCorrecta : undefined!;
  }

  clear() {
    this.respuestas = [];
    this.textopregunta = '';
    this.textorespuesta = '';
    this.seleccionado = undefined!;
    this.id = 0;
    this.pregunta = undefined!;
  }

  confirmDelete(event: Event, pregunta: preguntas) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Borrar pregunta?',
      header: 'Confirmacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.service.deletePregunta(pregunta.id!).subscribe({
          next: (data) => {
            // Manejar los datos recibidos durante la suscripción
            this.preguntasExistentes.splice(
              this.preguntasExistentes.indexOf(pregunta),
              1
            );
            alert('Pregunta eliminada');
          },
          error: () => {
            // Manejar errores durante la suscripción
            alert('Error al eliminar la pregunta');
          },
          complete() {},
        });
      },
      reject: () => {},
    });
  }

  guardarCambios() {
    this.preguntaAModificar.pregunta = this.preguntaAModificarS;
    this.preguntaAModificar.respuestas[0].respuesta = this.Respuesta1AModificar;
    this.preguntaAModificar.respuestas[1].respuesta = this.Respuesta2AModificar;
    if(this.preguntaAModificar.respuestas.length > 2)
    this.preguntaAModificar.respuestas[2].respuesta = this.Respuesta3AModificar;
    if(this.preguntaAModificar.respuestas.length > 2)
    this.preguntaAModificar.respuestas[3].respuesta = this.Respuesta4AModificar;
    for (let i = 0; i < this.preguntaAModificar.respuestas.length; i++) {
      if (this.respuestaSeleccionada == this.preguntaAModificar.respuestas[i]) {
        this.preguntaAModificar.respuestas[i].correcta = true;
      } else {
        this.preguntaAModificar.respuestas[i].correcta = false;
      }
    }
    this.preguntaAModificar.personaje = this.personajeAModificar;
    this.preguntaAModificar.personaje.id = undefined;
    this.service.updatePregunta(this.preguntaAModificar).subscribe({
      next: (data) => {
        // Manejar los datos recibidos durante la suscripción
        alert('Pregunta modificada');
        this.dialogVisible = false;
      },
      error: () => {
        // Manejar errores durante la suscripción
        alert('Error al modificar la pregunta');
      },
      complete() {},
    });
  }
}
