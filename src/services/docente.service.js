import bcrypt from 'bcrypt';
import db from '../config/db.js';

export async function createDocente(docente) {
    const {
        rut,
        dv,
        apellidos,
        nombres,
        correo,
        contrasena
    } = docente;
}

export async function getDocente(id) {

}

export async function updateDocente(id, docente) {
            
}

export async function deleteDocente(id) {
    
}

export async function loginDocente(rut, contrasena) {
    const [result] = await db.query(`
        SELECT *
        FROM docente
        WHERE rut = ?
        `, [rut]);
    const docente = result[0];
    const isValidPassword = await bcrypt.compare(contrasena, docente.contrasena.toString('utf8'));
    if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
    }
    return {
        id: docente.id,
        rut: docente.rut,
        dv: docente.dv,
        apellidos: docente.apellidos,
        nombres: docente.nombres,
        correo: docente.correo
    };
}
