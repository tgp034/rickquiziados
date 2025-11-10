import { preguntas } from "./preguntas";

export interface respuesta {
    id?: number;
    pregunta?: preguntas;
    respuesta: string;
    correcta: boolean;
}