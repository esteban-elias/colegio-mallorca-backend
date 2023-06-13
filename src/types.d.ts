export interface AlumnoForSelf {
  rut: string;
  dv: string;
  apellidos: string;
  nombres: string;
  correo?: string;
  telefono?: string;
  foto_ubicacion?: string;
}

export interface AlumnoForLogin extends AlumnoForSelf {
  contrasena: Buffer;
}

export type AlumnoForDocente = Omit<
  AlumnoForSelf,
  'rut' | 'dv' | 'telefono'
>;

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
  ano: number;
  semestre: number;
  id_alumno: number;
  id_asignatura: number;
}

export interface ClaseForAlumno {
  id: number;
  asignatura: string;
}

export interface ClaseForDocente extends ClaseForAlumno {
  curso: string;
}

export interface Recurso {
  titulo: string;
  ubicacion: string;
}

export interface DocenteForSelf {
  rut: string;
  dv: string;
  apellidos: string;
  nombres: string;
  correo?: string;
  telefono?: string;
  foto_ubicacion?: string;
}

export interface DocenteForLogin extends DocenteForSelf {
  contrasena: Buffer;
}
