package com.backend.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backend.backend.entity.Respuesta;

@RepositoryRestResource 
public interface RespuestaRepository extends CrudRepository<Respuesta, Long> { 
    
}
