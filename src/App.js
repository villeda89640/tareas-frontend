import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Leer tareas del backend
  useEffect(() => {
    fetch('https://tareas-backend-8gi1.onrender.com/api/tareas')
      .then(res => res.json())
      .then(data => setTareas(data));
  }, []);

  // Crear tarea
  const agregarTarea = async () => {
    if (nuevaTarea.trim()) {  // Asegúrate de que no esté vacío
      const res = await fetch('https://tareas-backend-8gi1.onrender.com/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: nuevaTarea }),
      });
      const data = await res.json();
      setTareas([...tareas, data]);
      setNuevaTarea('');
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    await fetch(`https://tareas-backend-8gi1.onrender.com/api/tareas/${id}`, { method: 'DELETE' });
    setTareas(tareas.filter(t => t._id !== id));
  };

  // Manejar el evento "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      agregarTarea();  // Agregar la tarea cuando presionas Enter
    }
  };

  return (
    <div className="App">
      <h1>Mis Tareas</h1>
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        onKeyDown={handleKeyDown}  // Detecta el evento "Enter"
        placeholder="Escribe una tarea y presiona Enter"
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id}>
            {tarea.texto}
            <button onClick={() => eliminarTarea(tarea._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;