import { personaje } from './personaje';
import { respuesta } from './respuesta';

export interface preguntas {
    id?: number;
    pregunta: string;
    respuestas: respuesta[];
    personaje: personaje;
}