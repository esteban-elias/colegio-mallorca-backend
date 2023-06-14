import {
  Request,
  Response,
  NextFunction,
} from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { Payload } from '../types';

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET === undefined || JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET no definida');
  }
  const token = req.cookies.token;

  if (token === undefined) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'alumno') {
      req.alumno = decoded as Payload;
      next();
    } else if (decoded.role === 'docente') {
      req.docente = decoded as Payload;
      next();
    } else {
      throw new Error('No autorizado');
    }
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({ message: 'No autorizado' });
  }
}

// TODO:
// - console.log de `decoded` para ver su contenido y tipos
// - Deberia importar `express-serve-static-core` en todos los modulos?
// - Deberia reemplazar todos mis `throw new Error` por un
//   `return res.status...`?
