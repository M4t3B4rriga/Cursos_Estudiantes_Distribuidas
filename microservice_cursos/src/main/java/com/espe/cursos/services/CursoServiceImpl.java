package com.espe.cursos.services;

import com.espe.cursos.clients.EstudianteClientRest;
import com.espe.cursos.models.Estudiante;
import com.espe.cursos.models.entities.Curso;
import com.espe.cursos.models.entities.CursoEstudiantes;
import com.espe.cursos.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImpl implements CursoService {

    @Autowired
    private CursoRepository repository;

    @Autowired
    private EstudianteClientRest clientRest;

    @Override
    public List<Curso> findAll() {
        return (List<Curso>) repository.findAll();
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Curso save(Curso curso) {
        return repository.save(curso);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Estudiante> addUser(Estudiante estudiante, Long id) {
        Optional<Curso> optional = repository.findById(id);

        if (optional.isPresent()) {
            Estudiante estudianteTemp = clientRest.findById(estudiante.getId());

            Curso curso = optional.get();
            CursoEstudiantes cursoEstudiantes = new CursoEstudiantes();

            cursoEstudiantes.setEstudianteId(estudianteTemp.getId());
            curso.addCursoEstudiantes(cursoEstudiantes);
            repository.save(curso);
            return Optional.of(estudianteTemp);
        }

        return Optional.empty();
    }
    @Override
    public Optional<Estudiante> removeUser(Estudiante estudiante, Long idCurso) {
        Optional<Curso> optional = repository.findById(idCurso);

        if (optional.isPresent()) {
            Curso curso = optional.get();
    
            // Verificar si el estudiante ya existe en el curso
            Optional<CursoEstudiantes> cursoEstudianteOptional = curso.getCursoEstudiantes().stream()
                .filter(ce -> ce.getEstudianteId().equals(estudiante.getId()))
                .findFirst();
    
            if (cursoEstudianteOptional.isPresent()) {
                CursoEstudiantes cursoEstudiantes = cursoEstudianteOptional.get();
                curso.removeCursoEstudiantes(cursoEstudiantes);
                repository.save(curso);
                return Optional.of(estudiante);
            }
        }
    
        return Optional.empty();
    }
}
