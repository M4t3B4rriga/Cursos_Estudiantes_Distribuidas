const BASE_URL_ESTUDIANTES = "http://20.83.171.11:8002/api/estudiantes";
const BASE_URL_CURSOS = "http://20.83.171.11:8001/api/cursos";

// Estudiantes API
export const getEstudiantes = async () => {
    const response = await fetch(BASE_URL_ESTUDIANTES);
    if (!response.ok) {
        throw new Error("Error al obtener estudiantes");
    }
    return await response.json();
};

export const createEstudiante = async (estudiante) => {
    const response = await fetch(BASE_URL_ESTUDIANTES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante),
    });
    if (!response.ok) {
        throw new Error("Error al crear estudiante");
    }
    return await response.json();
};

export const updateEstudiante = async (id, estudiante) => {
    const response = await fetch(`${BASE_URL_ESTUDIANTES}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante),
    });
    if (!response.ok) {
        throw new Error("Error al actualizar estudiante");
    }
    return await response.json();
};

export const deleteEstudiante = async (id) => {
    const response = await fetch(`${BASE_URL_ESTUDIANTES}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Error al eliminar estudiante");
    }
    return response.status === 204; // Retorna true si se eliminó correctamente
};

// Cursos API
export const getCursos = async () => {
    const response = await fetch(BASE_URL_CURSOS);
    if (!response.ok) {
        throw new Error("Error al obtener cursos");
    }
    return await response.json();
};

export const createCurso = async (curso) => {
    const response = await fetch(BASE_URL_CURSOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
    });
    if (!response.ok) {
        throw new Error("Error al crear curso");
    }
    return await response.json();
};

export const updateCurso = async (id, curso) => {
    const response = await fetch(`${BASE_URL_CURSOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
    });
    if (!response.ok) {
        throw new Error("Error al actualizar curso");
    }
    return await response.json();
};

export const deleteCurso = async (id) => {
    const response = await fetch(`${BASE_URL_CURSOS}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Error al eliminar curso");
    }
    return response.status === 204; // Retorna true si se eliminó correctamente
};
export const addEstudianteToCurso = async (cursoId, estudiante) => {
    console.log("Curso ID:", cursoId);
    console.log("Estudiante being sent:", estudiante);
    const response = await fetch(`${BASE_URL_CURSOS}/${cursoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error response:", errorBody);
        throw new Error("Error al agregar estudiante al curso");
    }
    return await response.json();
};

// New method to remove a student from a course
export const removeEstudianteFromCurso = async (cursoId, estudiante) => {
    const response = await fetch(`${BASE_URL_CURSOS}/${cursoId}/estudiantes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante),
    });
    if (!response.ok) {
        throw new Error("Error al eliminar estudiante del curso");
    }
    return await response.json();
};