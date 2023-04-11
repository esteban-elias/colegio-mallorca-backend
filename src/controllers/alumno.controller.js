import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service.js'

export async function createAlumno(req, res) {
    const alumno = req.body;

}

export function getAlumno(req, res) {
    const { id } = req.params;
}

export async function getAlumnos(req, res) {
    const alumnos = await alumnoServices.getAlumnos();
    res.json(alumnos);
}

export function updateAlumno(req, res) {
    const { id } = req.params;
    const alumno = req.body;

}


export function deleteAlumno(req, res) {
    const { id } = req.params;
    // ...
    res.json({message: `Alumno (ID: ${id}) eliminado`})
}

export async function loginAlumno(req, res) {
    const { rut, contrasena } = req.body;
    try {
        const alumno = await alumnoServices.loginAlumno(rut, contrasena);
        const token = jwt.sign(alumno, process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
        res.cookie("token", token, {
            httpOnly: true
        })
        res.json(alumno);

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}
