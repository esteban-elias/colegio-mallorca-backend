import {
  NextFunction,
  Request,
  Response,
} from 'express-serve-static-core';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { DecodedToken } from '../types';

/**
 * Verifica si el JSON Web Token es válido.
 */
export function verifyToken(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const token = req.cookies.token;
  if (token === undefined) {
    throw new JsonWebTokenError('No se ha encontrado el token');
  }
  const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
  if (decoded.role === 'alumno') {
    req.alumno = decoded;
    next();
  } else if (decoded.role === 'docente') {
    req.docente = decoded;
    next();
  } else {
    throw new JsonWebTokenError('El token no es válido');
  }
}
