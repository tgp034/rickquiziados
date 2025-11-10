/*package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.entity.Personaje;
import com.backend.backend.entity.Preguntas;
import com.backend.backend.repository.PersonajeRepository;
import com.backend.backend.repository.PreguntasRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PreguntaService {

    private final PreguntasRepository preguntaRepository;

    @Autowired
    public PreguntaService(PreguntasRepository preguntaRepository) {
        this.preguntaRepository = preguntaRepository;
    }

    public Preguntas createPregunta(Preguntas preguntas) {
        Preguntas pregunta = new Preguntas();
        pregunta.setPregunta(preguntas.getPregunta());
        pregunta.setRespuestas(pregunta.getRespuestas());
        pregunta.setPersonajes(new ArrayList<>());

        for (Personaje sp : preguntas.getPersonajes()) {
            Personaje personaje = new Personaje();
            personaje.setNombre(sp.getNombre());

            preguntas.getPersonajes().add(personaje);
        }

        return this.preguntaRepository.save(pregunta);
    }

}
*/
