export interface Alumno {
    id: number,
    rut: string,
    dv: string,
    apellidos: string,
    nombres: string,
    correo: string,
    telefono: string,
    fecha_nacimiento: Date,
    foto_ubicacion: string,
    direccion: string,
};

export interface Docente extends Alumno {};
