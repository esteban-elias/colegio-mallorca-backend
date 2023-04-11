import jwt from 'jsonwebtoken';
import { getAlumno } from '../services/alumno.service.js';
import { getDocente } from '../services/docente.service.js';

export async function cookieJwtAuthAlumno(req, res, next) {
    const token = req.cookies.token;
    try {
        const id = jwt.verify(token, process.env.MY_SECRET);
        const alumno = await getAlumno(id);
        req.alumno = alumno;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ message: 'No autorizado' });
    }
};

export async function cookieJwtAuthDocente(req, res, next) {
    const token = req.cookies.token;
    try {
        const id = jwt.verify(token, process.env.MY_SECRET);
        const docente = await getDocente(id);
        req.docente = docente;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ message: 'No autorizado' });
    }
}
