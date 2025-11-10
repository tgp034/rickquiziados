package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "preguntas")
public class Preguntas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String pregunta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personaje_id", nullable = false)
    //@JsonBackReference(value = "personaje-pregunta")
    //@JsonManagedReference(value = "personaje-pregunta")
    @JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class, 
        property = "id")
    private Personaje personaje;
    // private String respuestas;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "pregunta-respuesta")
    private List<Respuesta> respuestas = new ArrayList<>();

    /*@OneToMany(fetch = FetchType.LAZY, mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Personaje> personajes;*/

    public Preguntas() {
    }

    public Preguntas(String pregunta, List<Respuesta> respuestas) {
        this.pregunta = pregunta;
        this.respuestas = respuestas;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }

    /*public List<Personaje> getPersonajes() {
        return personajes;
    }

    public void setPersonajes(List<Personaje> personajes) {
        this.personajes = personajes;
    }*/

    public Personaje getPersonaje() {
        return personaje;
    }

    public void setPersonaje(Personaje personaje) {
        this.personaje = personaje;
    }

    @Override
    public String toString() {
        return "Preguntas [id=" + id + ", pregunta=" + pregunta + ", respuestas=" + respuestas + ", personaje=" + personaje + "]";
    }
}