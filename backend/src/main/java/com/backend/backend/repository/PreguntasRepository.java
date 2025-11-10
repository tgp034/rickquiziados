
package com.backend.backend.repository;

import com.backend.backend.entity.Preguntas;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource 
public interface PreguntasRepository extends CrudRepository<Preguntas, Long> { 

    public List<Preguntas> findAll();

    public List<Preguntas> findAllByOrderByIdAsc();

}