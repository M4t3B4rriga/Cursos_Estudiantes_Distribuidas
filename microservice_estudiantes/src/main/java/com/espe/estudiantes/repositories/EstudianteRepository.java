package com.espe.estudiantes.repositories;

import org.springframework.data.repository.CrudRepository;

import com.espe.estudiantes.models.entities.Estudiante;

public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {
}
