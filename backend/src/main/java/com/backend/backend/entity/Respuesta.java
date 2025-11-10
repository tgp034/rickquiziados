package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "respuesta")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_respuestas", nullable = false)
    @JsonBackReference(value = "pregunta-respuesta")
    private Preguntas pregunta;

    private String respuesta;
    
    private boolean correcta;

    public Respuesta() {
    }

    public Respuesta(String respuesta, boolean correcta) {
        this.respuesta = respuesta;
        this.correcta = correcta;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setTexto(String respuesta) {
        this.respuesta = respuesta;
    }

    public boolean getCorrecta() {
        return correcta;
    }

    public void setCorrecta(boolean correcta) {
        this.correcta = correcta;
    }

    public Preguntas getPregunta() {
        return pregunta;
    }

    public void setPregunta(Preguntas pregunta) {
        this.pregunta = pregunta;
    }

    @Override
    public String toString() {
        return "Respuesta [id=" + id + ", respuesta=" + respuesta + ", correcta=" + correcta + "]";
    }
    
}
