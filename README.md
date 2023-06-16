# Backend API para la intranet del Colegio Mallorca.

Este es un proyecto de tercer semestre de informática. "Colegio Mallorca" es una institución ficticia.

## Tecnologías utilizadas
- Express.js
- PlanetScale (MySQL)
- JSON Web Tokens

## Endpoints

### Alumnos

1. `POST /alumno/login` 
    - Inicio de sesión para los alumnos.
    - Cuerpo de la solicitud: `{ "rut": "...", "contrasena": "..." }`
  
2. `GET /alumno/` 
    - Obtiene los datos del alumno actualmente autenticado.
  
3. `GET /alumno/notas` 
    - Obtiene las notas del alumno actualmente autenticado.
  
4. `GET /alumno/clases` 
    - Obtiene las clases del alumno actualmente autenticado.
  
5. `GET /alumno/clase/:idClase/recursos` 
    - Obtiene los recursos para la clase especificada.
  
6. `GET /alumno/horario` 
    - Obtiene el horario del alumno actualmente autenticado.
  

### Docentes

1. `POST /docente/login` 
    - Inicio de sesión para los docentes.
    - Cuerpo de la solicitud: `{ "rut": "...", "contrasena": "..." }`
2. `GET /docente/` 
    - Obtiene los datos del docente actualmente autenticado.
  
3. `GET /docente/clases` 
    - Obtiene las clases del docente actualmente autenticado.
  
4. `GET /docente/clase/:idClase/recursos` 
    - Obtiene los recursos para la clase especificada.
  
5. `GET /docente/clase/:idClase/alumnos` 
    - Obtiene los alumnos para la clase especificada.
  
6. `GET /docente/clase/:idClase/alumno/:idAlumno/notas` 
    - Obtiene las notas del alumno especificado en la clase especificada.
  
7. `POST /docente/clase/:idClase/alumno/:idAlumno/notas` 
    - Crea una nota para el alumno especificado en la clase especificada.
    - Cuerpo de la solicitud: `{ "numero": 1, "porcentaje": 20, "calificacion": 6.5 }`
  
8. `GET /docente/horario` 
    - Obtiene el horario del docente actualmente autenticado.
