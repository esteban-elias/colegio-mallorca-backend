# API RESTful para la intranet del Colegio Mallorca.

Este es un proyecto de tercer semestre de informática. "Colegio Mallorca" es una institución ficticia.

## Tecnologías utilizadas
- Express.js
- PlanetScale (MySQL)
- JSON Web Tokens

## Endpoints

### Alumno

**POST**:
- `/api/alumnos/login`: Loguear al alumno. Recibe los campos `rut` (sin puntos ni dígito verificador) y `contrasena`. Si las credenciales son válidas, responde un JSON con los campos `id, rut, dv, apellidos, nombres, correo, id_curso` del alumno y se firma una cookie que codifica el ID del alumno.

**GET**: 
- `/api/alumnos`: Obtener información del alumno. Responde los campos `id, rut, apellidos, nombres, correo, id_curso` del alumno.
- `/api/alumnos/notas`: Obtener las notas del alumno. Responde la lista de todas las notas del alumno. Cada elemento contiene los campos `asignatura, numero, porcentaje, calificacion`.
- `/api/alumnos/clases`: Obtener las clases del alumno. Responde la lista de todas las clases del alumno. Cada elemento contiene los campos `id, asignatura`.
- `/api/alumnos/clases/:idClase/recursos`: Obtener los recursos pedagógicos de una clase. Responde la lista de todos los recursos pedagógicos de una clase. Cada elemento contiene los campos `titulo, ubicacion`.

### Docente

**POST**:
- `/api/docentes/login`: Loguear al docente. Recibe los campos `rut` (sin puntos ni dígito verificador) y `contrasena`. Si las credenciales son válidas, responde un JSON con los campos `id, rut, dv, apellidos, nombres, correo` del docente y se firma una cookie que codifica el ID del docente.
- `api/docentes/clases/:idClase/alumnos/:idAlumno/notas`: Registrar una nota a un alumno. Recibe el campo `nota`, cuyo valor es un JSON que contiene los campos `numero`, `porcentaje` y `calificacion`. Responde la ID de la nota creada.

**GET**:
- `/api/docentes`: Obtener información del docente. Retorna los campos `id, rut, dv, apellidos, nombres, correo` del docente.
- `/api/docentes/clases`: Obtener las clases del docente. Responde la lista de todas las clases del docente. Cada elemento contiene los campos `id, curso, asignatura`.
- `/api/docentes/clases/:idClase/recursos`: Obtener los recursos pedagógicos de una clase. Responde la lista de todos los recursos pedagógicos de una clase. Cada elemento contiene los campos `titulo, ubicacion`.
- `/api/docentes/clases/:idClase/alumnos`: Obtener los alumnos de una clase. Responde la lista de todos los alumnos de una clase. Cada elemento contiene los campos `id, apellidos, nombres, rut`.
- `/api/docentes/clases/:idClase/alumnos/:idAlumno/notas`: Obtener las notas de un alumno. Responde la lista de todos las notas del alumno de una clase. Cada elemento contiene los campos `numero, porcentaje, calificacion`.
