package com.backend.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;

@Entity
@Table(name = "personaje")
public class Personaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique=true)
    private String code;
    private String name;

    //@OneToOne(mappedBy = "personaje", cascade = CascadeType.ALL)
    //@MapsId
    //@JoinColumn(name = "pregunta_id")
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "personaje", cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonManagedReference(value = "personaje-pregunta")
    //@JsonIgnore
    //@JsonBackReference(value = "personaje-pregunta")
    @JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class, 
        property = "id")
    @JsonIgnore
    private List<Preguntas> pregunta = new ArrayList<>();

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_preguntas", nullable = true, referencedColumnName = "id")
    private Preguntas pregunta;*/

    public Personaje() {
    }

    public Personaje(String name) {
        this.name = name;

    }

    public Personaje(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public Personaje(long id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Preguntas> getPregunta() {
        return pregunta;
    }

    public void setPregunta(List<Preguntas> pregunta) {
        this.pregunta = pregunta;
    }

    /*public Preguntas getPregunta() {
        return pregunta;
    }

    public void setPregunta(Preguntas pregunta) {
        this.pregunta = pregunta;
    }*/

    @Override
    public String toString() {
        return "Personaje [id=" + this.id + ", nombre=" + this.name + ", code=" + this.code + "]";
    }
}