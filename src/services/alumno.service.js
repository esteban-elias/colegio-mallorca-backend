import db from '../config/db.js';

export async function createAlumno(alumno) {
    const {
        rut,
        dv,
        apellidos,
        nombres,
        correo,
        contrasena,
        id_curso
    } = alumno;

}

export async function getAlumno(id) {
    
}

export async function getAlumnos() {
    const [result] = await db.query(`
    DESCRIBE alumno
    `);
    return result;
}

export async function updateAlumno(id, alumno) {
    
}

export async function deleteAlumno(id) {
    
}
