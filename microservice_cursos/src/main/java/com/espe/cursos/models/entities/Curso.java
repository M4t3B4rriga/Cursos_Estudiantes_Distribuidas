package com.espe.cursos.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.espe.cursos.models.Estudiante;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "Cursos")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String nombre;

    @NotEmpty
    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private int creditos;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "curso_id")
    private List<CursoEstudiantes> cursoEstudiantes;

    @Transient
    private List<Estudiante> estudiantes;

    public Curso() {
        cursoEstudiantes = new ArrayList<>();
        estudiantes = new ArrayList<>();
    }

    public void addCursoEstudiantes(CursoEstudiantes cursoEstudiante) {
        cursoEstudiantes.add(cursoEstudiante);
    }

    public void removeCursoEstudiantes(CursoEstudiantes cursoEstudiante) {
        cursoEstudiantes.remove(cursoEstudiante);
    }

    public List<CursoEstudiantes> getCursoEstudiantes() {
        return cursoEstudiantes;
    }

    public void setCursoEstudiantes(List<CursoEstudiantes> cursoEstudiantes) {
        this.cursoEstudiantes = cursoEstudiantes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getCreditos() {
        return creditos;
    }

    public void setCreditos(int creditos) {
        this.creditos = creditos;
    }
}
