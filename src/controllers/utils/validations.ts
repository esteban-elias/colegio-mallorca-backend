import { LoginRequestBody, NotaForCreation } from '../../types';

export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}

// TODO: Validar el rut con mod11
export function toLoginRequestBody(body: any): LoginRequestBody {
  if (!isString(body.rut) || body.rut.trim() === '') {
    throw new Error('Credenciales inválidas');
  }
  if (!isString(body.contrasena) || body.contrasena.trim() === '') {
    throw new Error('Credenciales inválidas');
  }
  return {
    rut: body.rut,
    contrasena: body.contrasena,
  };
}

export function toNotaForCreation(object: any): NotaForCreation {
  if (
    typeof object.numero !== 'number' ||
    typeof object.porcentaje !== 'number' ||
    typeof object.calificacion !== 'number' ||
    typeof object.idAlumno !== 'number' ||
    typeof object.idAsignatura !== 'number'
  ) {
    throw new Error('Los campos deben ser números');
  }
  if (object.porcentaje < 1 || object.porcentaje > 100) {
    throw new Error('Porcentaje fuera de rango');
  }
  if (object.calificacion < 1 || object.calificacion > 7) {
    throw new Error('Nota fuera de rango');
  }
  return {
    numero: object.numero,
    porcentaje: object.porcentaje,
    calificacion: object.calificacion,
    idAlumno: object.idAlumno,
    idAsignatura: object.idAsignatura,
  };
}
