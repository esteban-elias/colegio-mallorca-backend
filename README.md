# API RESTful para la intranet del Colegio Mallorca.

Este es un proyecto de tercer semestre de informática. "Colegio Mallorca" es una institución ficticia.

## Tecnologías utilizadas
- Express.js
- PlanetScale (MySQL)
- JSON Web Tokens

## Endpoints

### Alumno

Todos los endpoints relacionados con los alumnos se encuentran en la ruta `/api/alumno/`. Dependiendo del método HTTP utilizado, se realizan distintas acciones:

- **GET**: Retorna los campos `id, rut, dv, apellidos, nombres, correo, id_curso` del alumno autenticado.
- **POST**: Por implementar.
- **PUT**: Por implementar
- **DELETE**: Por implementar

#### Login

La ruta `/api/alumno/login` recibe una petición POST con los campos `rut` y `contrasena`. Si las credenciales son válidas, se retorna un JSON con los campos `id, rut, dv, apellidos, nombres, correo, id_curso` del alumno y se firma una cookie que codifica el ID del alumno. Si las credenciales son inválidas, se retorna un mensaje de error.

### Docente

Todos los endpoints relacionados con los docentes se encuentran en la ruta `/api/docente/`. Al igual que con los alumnos, las distintas acciones se realizan dependiendo del método HTTP utilizado:

- **GET**: Retorna los campos `id, rut, dv, apellidos, nombres, correo` del docente autenticado.
- **POST**: Por implementar.
- **PUT**: Por implementar
- **DELETE**: Por implementar

#### Login

La ruta `/api/docente/login` funciona de la misma manera que `/api/alumno/login`. Recibe una petición POST con los campos `rut` y `contrasena`, y si las credenciales son válidas, se retorna un JSON con los campos `id, rut, dv, apellidos, nombres, correo` del docente y se firma una cookie que codifica el ID del docente. Si las credenciales son inválidas, se retorna un mensaje de error.
