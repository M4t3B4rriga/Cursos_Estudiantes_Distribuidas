import React, { useState, useEffect } from "react";
import { getCursos, createCurso, updateCurso, deleteCurso, addEstudianteToCurso, removeEstudianteFromCurso } from "../services/api";

function CursosPage() {
    const [cursos, setCursos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [creditos, setCreditos] = useState("");
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [estudianteId, setEstudianteId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        try {
            const data = await getCursos();
            setCursos(data);
            setError("");
        } catch (err) {
            console.error(err.message);
            setError("No se pudieron cargar los cursos.");
        }
    };

    const validateInputs = () => {
        if (!nombre.match(/^[a-zA-Z\s]+$/)) {
            setError("El nombre del curso solo debe contener letras.");
            return false;
        }
        if (!descripcion.trim()) {
            setError("La descripción no puede estar vacía.");
            return false;
        }
        if (!creditos.match(/^\d+$/) || parseInt(creditos, 10) <= 0) {
            setError("Los créditos deben ser un número mayor a 0.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSave = async () => {
        if (!validateInputs()) return;

        try {
            if (selectedCurso) {
                await updateCurso(selectedCurso.id, { nombre, descripcion, creditos });
            } else {
                await createCurso({ nombre, descripcion, creditos });
            }
            fetchCursos();
            resetForm();
        } catch (err) {
            console.error(err.message);
            setError("Error al guardar el curso.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCurso(id);
            fetchCursos();
        } catch (err) {
            console.error(err.message);
            setError("Error al eliminar el curso.");
        }
    };

    const handleAddEstudiante = async (cursoId) => {
        if (!estudianteId.match(/^\d+$/)) {
            setError("El ID del estudiante debe ser un número válido.");
            return;
        }

        try {
            await addEstudianteToCurso(cursoId, { id: estudianteId });
            fetchCursos();
            setEstudianteId("");
            setError("");
        } catch (err) {
            console.error(err.message);
            setError("Error al agregar estudiante al curso.");
        }
    };

    const handleRemoveEstudiante = async (cursoId) => {
        if (!estudianteId.match(/^\d+$/)) {
            setError("El ID del estudiante debe ser un número válido.");
            return;
        }

        try {
            await removeEstudianteFromCurso(cursoId, { id: estudianteId });
            fetchCursos();
            setEstudianteId("");
            setError("");
        } catch (err) {
            console.error(err.message);
            setError("Error al eliminar estudiante del curso.");
        }
    };

    const handleEdit = (curso) => {
        setSelectedCurso(curso);
        setNombre(curso.nombre);
        setDescripcion(curso.descripcion);
        setCreditos(curso.creditos);
    };

    const resetForm = () => {
        setSelectedCurso(null);
        setNombre("");
        setDescripcion("");
        setCreditos("");
        setError("");
    };

    return (
        <div className="form-container">
            <h2>Cursos</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <input
                    type="text"
                    placeholder="Nombre del curso"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows="3"
                />
                <input
                    type="number"
                    placeholder="Créditos"
                    value={creditos}
                    onChange={(e) => setCreditos(e.target.value)}
                />
                <button type="submit">{selectedCurso ? "Actualizar" : "Crear"}</button>
                {selectedCurso && <button onClick={resetForm}>Cancelar</button>}
            </form>
            {error && <p className="error">{error}</p>}
            <ul>
                {cursos.map((curso) => (
                    <li key={curso.id}>
                        <div>
                            <strong>{curso.nombre}</strong> - {curso.descripcion} ({curso.creditos} créditos)
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEdit(curso)}>Editar</button>
                            <button onClick={() => handleDelete(curso.id)}>Eliminar</button>
                        </div>
                        <div className="add-student-form">
                            <h4>Gestión de Estudiantes</h4>
                            <input
                                type="text"
                                placeholder="ID del estudiante"
                                value={estudianteId}
                                onChange={(e) => setEstudianteId(e.target.value)}
                            />
                            <button onClick={() => handleAddEstudiante(curso.id)}>Agregar</button>
                            <button onClick={() => handleRemoveEstudiante(curso.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CursosPage;
