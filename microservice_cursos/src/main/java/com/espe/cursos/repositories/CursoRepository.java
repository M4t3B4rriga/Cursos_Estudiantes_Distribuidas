package com.espe.cursos.repositories;

import org.springframework.data.repository.CrudRepository;

import com.espe.cursos.models.entities.Curso;

public interface CursoRepository extends CrudRepository<Curso, Long> {

}
