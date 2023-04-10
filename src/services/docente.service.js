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

export async function getDocentes() {
    const [result] = await db.query(`
    SELECT * FROM docente
    `);
    return result;
}

export async function updateDocente(id, docente) {
            
}


export async function deleteDocente(id) {
    
}
