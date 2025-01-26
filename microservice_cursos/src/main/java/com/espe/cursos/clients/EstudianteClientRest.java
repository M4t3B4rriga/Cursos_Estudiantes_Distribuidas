package com.espe.cursos.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.espe.cursos.models.Estudiante;

@FeignClient(name = "microserviceestudiantes", url = "localhost:8002/api/estudiantes")
public interface EstudianteClientRest {
    @GetMapping("/{id}")
    Estudiante findById(@PathVariable Long id);
}
