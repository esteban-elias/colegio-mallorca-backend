import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service.js'

export async function createAlumno(req, res) {
    
}

export function getAlumno(req, res) {
    const alumno = req.alumno;
    res.json(alumno);
}

export async function getNotas(req, res) {
    const alumno = req.alumno;
    const notas = await alumnoServices.getNotas(alumno.id);   
    res.json(notas);
}

export function updateAlumno(req, res) {

}

export function deleteAlumno(req, res) {

}

export async function loginAlumno(req, res) {
    const { rut, contrasena } = req.body;
    try {
        const alumno = await alumnoServices.loginAlumno(rut, contrasena);
        const token = jwt.sign({ id: alumno.id, type: 'alumno' },
                                 process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
        res.cookie("token", token, {
            httpOnly: true
        })
        res.json(alumno);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}
