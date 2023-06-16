import {
  Request,
  Response,
  NextFunction,
} from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../types';
import { JWT_SECRET } from '../config/env';

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
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
