import jwt from 'jsonwebtoken';
import { getAlumno } from '../services/alumno.service.js';
import { getDocente } from '../services/docente.service.js';

export async function cookieJwtAuth(req, res, next) {
    const token = req.cookies.token;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'alumno') {
          const alumno = await getAlumno(decodedToken.id);
          req.alumno = alumno;
          next();
        } else if (decodedToken.type === 'docente') {
          const docente = await getDocente(decodedToken.id);
          req.docente = docente;
          next();
        } else {
            throw new Error('No autorizado');
        }
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ message: 'No autorizado' });
    }
};
