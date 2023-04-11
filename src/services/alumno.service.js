import bcrypt from 'bcrypt';
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

export async function updateAlumno(id, alumno) {
    
}

export async function deleteAlumno(id) {
    
}

export async function loginAlumno(rut, contrasena) {
    const [result] = await db.query(`
        SELECT *
        FROM alumno
        WHERE rut = ?
        `, [rut]);
    const alumno = result[0];
    const isValidPassword = await bcrypt.compare(contrasena, alumno.contrasena.toString('utf8'));
    if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
    }
    return {
        id: alumno.id,
        rut: alumno.rut,
        dv: alumno.dv,
        apellidos: alumno.apellidos,
        nombres: alumno.nombres,
        correo: alumno.correo,
        id_curso: alumno.id_curso
    };
}
