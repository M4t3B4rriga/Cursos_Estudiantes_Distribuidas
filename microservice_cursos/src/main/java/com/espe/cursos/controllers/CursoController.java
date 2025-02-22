package com.espe.cursos.controllers;

import com.espe.cursos.models.Estudiante;
import com.espe.cursos.models.entities.Curso;
import com.espe.cursos.services.CursoService;
import feign.FeignException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://20.83.171.11:5173")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Curso curso, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();

            result.getFieldErrors().forEach(
                    err -> errores.put(
                            err.getField(), err.getDefaultMessage()));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(cursoService.save(curso));
    }

    @GetMapping
    public List<Curso> listar() {
        return cursoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarPorId(@PathVariable Long id) {
        Optional<Curso> curso = cursoService.findById(id);
        if (curso.isPresent()) {
            return ResponseEntity.ok(curso.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Curso curso, @PathVariable Long id) {
        Optional<Curso> cursoExistente = cursoService.findById(id);
        if (cursoExistente.isPresent()) {
            Curso cursoAtual = cursoExistente.get();
            cursoAtual.setNombre(curso.getNombre());
            cursoAtual.setDescripcion(curso.getDescripcion());
            cursoAtual.setCreditos(curso.getCreditos());
            return ResponseEntity.ok(cursoService.save(cursoAtual));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        cursoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> agregarEstudiante(@RequestBody Estudiante estudiante, @PathVariable Long id) {
        Optional<Estudiante> optional;

        try {
            optional = cursoService.addUser(estudiante, id);
        } catch (FeignException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("Error", "Usuario o curso no encontrado wey"));
        }

        if (optional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optional.get());
        }

        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{cursoId}/estudiantes")
    public ResponseEntity<?> eliminarEstudiante(@RequestBody Estudiante estudiante, @PathVariable Long cursoId) {
        Optional<Estudiante> optional;

        try {
            optional = cursoService.removeUser(estudiante, cursoId);
        } catch (FeignException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "Usuario o curso no encontrado"));
    }

        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }

        return ResponseEntity.notFound().build();
    }

}
