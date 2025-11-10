package com.backend.backend.entity;

import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "ranking")
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private Integer puntuacion;

    public Ranking() {
    }

    public Ranking(String name, int puntuacion) {
        this.name = name;
        this.puntuacion = puntuacion;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPuntuacion() {
        return this.puntuacion;
    }

    public void setpuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", puntuacion=" + puntuacion + "]";
    }

}