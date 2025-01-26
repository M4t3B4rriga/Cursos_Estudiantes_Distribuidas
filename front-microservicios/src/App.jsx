import React, { useState } from "react";
import EstudiantesPage from "./pages/EstudiantesPage";
import CursosPage from "./pages/CursosPage";
import "./App.css";

function App() {
    const [activeTab, setActiveTab] = useState("estudiantes");

    return (
        <div className="app-container">
            <h1>Gestión de Estudiantes y Cursos</h1>
            <div className="tabs">
                <button
                    className={activeTab === "estudiantes" ? "active" : ""}
                    onClick={() => setActiveTab("estudiantes")}
                >
                    Estudiantes
                </button>
                <button
                    className={activeTab === "cursos" ? "active" : ""}
                    onClick={() => setActiveTab("cursos")}
                >
                    Cursos
                </button>
            </div>
            <div className="content">
                {activeTab === "estudiantes" && <EstudiantesPage />}
                {activeTab === "cursos" && <CursosPage />}
            </div>
        </div>
    );
}

export default App;
