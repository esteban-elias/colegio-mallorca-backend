import { LoginRequestBody } from '../../types';

export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}

// TODO: Validar el rut con mod11
export function toLoginRequestBody(body: any): LoginRequestBody {
  if (!isString(body.rut) || body.rut.trim() === '') {
    throw new Error('Rut inválido');
  }
  if (!isString(body.contrasena) || body.contrasena.trim() === '') {
    throw new Error('Contraseña inválida');
  }
  return {
    rut: body.rut,
    contrasena: body.contrasena,
  };
}
