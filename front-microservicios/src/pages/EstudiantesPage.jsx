import React, { useState, useEffect } from "react";
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante } from "../services/api";

function EstudiantesPage() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = async () => {
        try {
            const data = await getEstudiantes();
            setEstudiantes(data);
            setError("");
        } catch (err) {
            console.error(err.message);
            setError("No se pudieron cargar los estudiantes.");
        }
    };

    const validateInputs = () => {
        if (!nombre.match(/^[a-zA-Z\s]+$/)) {
            setError("El nombre solo debe contener letras.");
            return false;
        }
        if (!apellido.match(/^[a-zA-Z\s]+$/)) {
            setError("El apellido solo debe contener letras.");
            return false;
        }
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setError("El email no tiene un formato válido.");
            return false;
        }
        if (!telefono.match(/^\d{10}$/)) {
            setError("El teléfono debe contener 10 números.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSave = async () => {
        if (!validateInputs()) return;

        try {
            if (selectedEstudiante) {
                await updateEstudiante(selectedEstudiante.id, { nombre, apellido, email, fechaNacimiento, telefono });
            } else {
                await createEstudiante({ nombre, apellido, email, fechaNacimiento, telefono });
            }
            fetchEstudiantes();
            resetForm();
        } catch (err) {
            console.error(err.message);
            setError("Error al guardar el estudiante.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEstudiante(id);
            fetchEstudiantes();
        } catch (err) {
            console.error(err.message);
            setError("Error al eliminar el estudiante.");
        }
    };

    const handleEdit = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setNombre(estudiante.nombre);
        setApellido(estudiante.apellido);
        setEmail(estudiante.email);
        setFechaNacimiento(estudiante.fechaNacimiento);
        setTelefono(estudiante.telefono);
    };

    const resetForm = () => {
        setSelectedEstudiante(null);
        setNombre("");
        setApellido("");
        setEmail("");
        setFechaNacimiento("");
        setTelefono("");
        setError("");
    };

    return (
        <div className="form-container">
            <h2>Estudiantes</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <button type="submit">{selectedEstudiante ? "Actualizar" : "Crear"}</button>
                {selectedEstudiante && <button onClick={resetForm}>Cancelar</button>}
            </form>
            {error && <p className="error">{error}</p>}
            <ul>
                {estudiantes.map((est) => (
                    <li key={est.id}>
                        {est.nombre} {est.apellido} - {est.email} ({est.telefono})
                        <button onClick={() => handleEdit(est)}>Editar</button>
                        <button onClick={() => handleDelete(est.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EstudiantesPage;
