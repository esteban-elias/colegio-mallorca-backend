import jwt from 'jsonwebtoken';
import { getAlumno } from '../services/alumno.service.js';
import { getDocente } from '../services/docente.service.js';

export async function cookieJwtAuthAlumno(req, res, next) {
    const token = req.cookies.token;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type !== 'alumno') {
            throw new Error('No autorizado');
        }
        const alumno = await getAlumno(decodedToken.id);
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
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type !== 'docente') {
            throw new Error('No autorizado');
        }
        const docente = await getDocente(decodedToken.id);
        req.docente = docente;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ message: 'No autorizado' });
    }
}
