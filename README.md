# API RESTful para la intranet del Colegio Mallorca.

Este es un proyecto de tercer semestre de informática. "Colegio Mallorca" es una institución ficticia.

## Tecnologías utilizadas
- Express.js
- PlanetScale (MySQL)
- JSON Web Tokens

## Endpoints

### Alumno

**POST**:
- `/api/alumno/login`: Recibe los campos `rut` (sin puntos ni dígito verificador) y `contrasena`. Si las credenciales son válidas, responde un JSON con los campos `id, rut, dv, apellidos, nombres, correo, id_curso` del alumno y se firma una cookie que codifica el ID del alumno.

**GET**: 
- `/api/alumno`: Responde los campos `id, rut, apellidos, nombres, correo, id_curso` del alumno.
- `/api/alumno/notas`: Responde la lista de todas las notas del alumno. Cada elemento contiene los campos `asignatura, numero, porcentaje, calificacion`.
- `/api/alumno/clases`: Responde la lista de todas las clases del alumno. Cada elemento contiene los campos `id, asignatura`.
- `/api/alumno/clases/:idClase/recursos`: Responde la lista de todos los recursos pedagógicos de una clase. Cada elemento contiene los campos `titulo, ubicacion`.

### Docente

**POST**:
- `/api/docente/login`: Recibe los campos `rut` (sin puntos ni dígito verificador) y `contrasena`. Si las credenciales son válidas, responde un JSON con los campos `id, rut, dv, apellidos, nombres, correo` del docente y se firma una cookie que codifica el ID del docente.

**GET**:
- `/api/docente`: Retorna los campos `id, rut, dv, apellidos, nombres, correo` del docente.
- `/api/docente/clases`: Responde la lista de todas las clases del docente. Cada elemento contiene los campos `id, curso, asignatura`.
- `/api/docente/clases/:idClase/recursos`: Responde la lista de todos los recursos pedagógicos de una clase. Cada elemento contiene los campos `titulo, ubicacion`.
- `/api/docente/clases/:idClase/alumnos`: Responde la lista de todos los alumnos de una clase. Cada elemento contiene los campos `id, apellidos, nombres, rut`.
- `/api/docente/clases/:idClase/alumnos/:idAlumno/notas`: Responde la lista de todos las notas del alumno de una clase. Cada elemento contiene los campos `numero, porcentaje, calificacion`.
