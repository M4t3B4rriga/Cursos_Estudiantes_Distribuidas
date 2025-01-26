package com.espe.cursos.services;

import java.util.List;
import java.util.Optional;

import com.espe.cursos.models.Estudiante;
import com.espe.cursos.models.entities.Curso;

public interface CursoService {
    List<Curso> findAll();

    Optional<Curso> findById(Long id);

    Curso save(Curso curso);

    void deleteById(Long id);

    Optional<Estudiante> addUser(Estudiante estudiante, Long id);
    Optional<Estudiante> removeUser(Estudiante estudiante, Long idCurso);
}
