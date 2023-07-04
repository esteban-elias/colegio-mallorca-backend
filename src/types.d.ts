export interface AlumnoForSelf {
  rut: string;
  dv: string;
  apellidos: string;
  nombres: string;
  correo?: string;
  telefono?: string;
  foto_ubicacion?: string;
}

export interface AlumnoForLogin {
  id: number;
  contrasena: Buffer;
}

export type AlumnoForDocente = Omit<
  AlumnoForSelf,
  'rut' | 'dv' | 'telefono'
> & { id: number };

export interface DocenteForSelf {
  rut: string;
  dv: string;
  apellidos: string;
  nombres: string;
  correo?: string;
  telefono?: string;
  foto_ubicacion?: string;
}

export interface DocenteForLogin {
  id: number;
  contrasena: Buffer;
}

export interface LoginRequestBody {
  rut: string;
  contrasena: string;
}

export interface Nota {
  asignatura: string;
  numero: number;
  porcentaje: number;
  calificacion: number;
}

export interface NotaForCreation {
  numero: number;
  porcentaje: number;
  calificacion: number;
  idAlumno: number;
  idAsignatura: number;
}

export interface ClaseForAlumno {
  id: number;
  asignatura: string;
}

export interface ClaseForDocente extends ClaseForAlumno {
  curso: string;
}

export interface Recurso {
  id: number;
  titulo: string;
  ubicacion: string;
}

export type Role = 'alumno' | 'docente';

export interface Payload {
  id: number;
  role: Role;
}

export interface DecodedToken extends Payload {
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      alumno?: DecodedToken;
      docente?: DecodedToken;
    }
  }
}

export interface BloqueHorarioForAlumno {
  dia: string;
  hora_inicio: string;
  hora_termino: string;
  sala: string;
  asignatura: string;
  docente: string;
}

export interface BloqueHorarioForDocente {
  dia: string;
  hora_inicio: string;
  hora_termino: string;
  sala: string;
  asignatura: string;
  curso: string;
}
