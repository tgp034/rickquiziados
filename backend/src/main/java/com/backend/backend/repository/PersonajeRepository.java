
package com.backend.backend.repository;

import com.backend.backend.entity.Personaje;
import com.backend.backend.entity.Preguntas;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource 
public interface PersonajeRepository extends CrudRepository<Personaje, Long> {

    public List<Personaje> findAll();

    public Personaje findByCode(String code); 
}