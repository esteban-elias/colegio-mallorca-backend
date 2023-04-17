import jwt from 'jsonwebtoken';
import * as docenteServices from '../services/docente.service.js'

// export async function createDocente(req, res) {

// }

export function getDocente(req, res) {
    const docente = req.docente;
    res.json(docente);
}  

// export function updateDocente(req, res) {

// }

// export function deleteDocente(req, res) {

// }

export async function login(req, res) {
    const { rut, contrasena } = req.body;
    try {
        const docente = await docenteServices.login(rut, contrasena);
        const token = jwt.sign({ id: docente.id, type: 'docente' }, 
                               process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
        res.cookie("token", token, {
            httpOnly: true
        })
        res.json(docente);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}
