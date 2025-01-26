package com.espe.estudiantes.services;

import java.util.List;
import java.util.Optional;

import com.espe.estudiantes.models.entities.Estudiante;

public interface EstudianteService {
    List<Estudiante> findAll();

    Optional<Estudiante> findById(Long id);

    Estudiante save(Estudiante estudiante);

    void deleteById(Long id);
}
