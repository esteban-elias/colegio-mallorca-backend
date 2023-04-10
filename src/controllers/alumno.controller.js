import * as alumnoServices from '../services/alumno.service.js'

export async function createAlumno(req, res) {
    const alumno = req.body;

}

export function getAlumno(req, res) {
    const { id } = req.params;
}

export async function getAlumnos(req, res) {
    const alumnos = await alumnoServices.getAlumnos();
    res.send(alumnos);
}

export function updateAlumno(req, res) {
    const { id } = req.params;
    const alumno = req.body;

}


export function deleteAlumno(req, res) {
    const { id } = req.params;
    // ...
    res.json({message: `Alumno (ID: ${id}) eliminado`})
}
