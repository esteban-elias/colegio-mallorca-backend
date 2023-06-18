import { ErrorRequestHandler } from 'express';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import {
  LoginError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from './custom-errors';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({ message: 'No autorizado' });
  } else if (
    err instanceof JsonWebTokenError ||
    err instanceof TokenExpiredError ||
    err instanceof NotBeforeError
  ) {
    res.clearCookie('token');
    res.status(401).json({ message: 'No autorizado' });
  } else if (err instanceof LoginError) {
    res.status(500).json({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: 'Error inesperado' });
  }
};

export default errorHandler;
