import jwt from 'jsonwebtoken';
import * as docenteServices from '../services/docente.service.js'

export async function createDocente(req, res) {
    const docente = req.body;
}

export function getDocente(req, res) {
    const { id } = req.params;
}

export async function getDocentes(req, res) {
    const docentes = await docenteServices.getDocentes();
    res.json(docentes);
}

export function updateDocente(req, res) {
    const { id } = req.params;
    const docente = req.body;
}

export function deleteDocente(req, res) {
    const { id } = req.params;
    // ...
    res.json({message: `Docente (ID: ${id}) eliminado`})
}

export async function loginDocente(req, res) {
    const { rut, contrasena } = req.body;
    try {
        const docente = await docenteServices.loginDocente(rut, contrasena);
        const token = jwt.sign(docente, process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
        res.cookie("token", token, {
            httpOnly: true
        })
        res.json(docente);

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}
