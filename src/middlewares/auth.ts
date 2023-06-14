import {
  Request,
  Response,
  NextFunction,
} from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../types';

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
    return void res.status(401).json({ message: 'No autorizado' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    if (decoded.role === 'alumno') {
      req.alumno = decoded;
      next();
    } else if (decoded.role === 'docente') {
      req.docente = decoded;
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
// - Deberia importar `express-serve-static-core` en todos los modulos?
// - Deberia reemplazar todos mis `throw new Error` por un
//   `return res.status...`?
