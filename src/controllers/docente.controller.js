import * as docenteServices from '../services/docente.service.js'

export async function createDocente(req, res) {
    const docente = req.body;
}

export function getDocente(req, res) {
    const { id } = req.params;
}

export async function getDocentes(req, res) {
    const docentes = await docenteServices.getDocentes();
    res.json(docentes);
}

export function updateDocente(req, res) {
    const { id } = req.params;
    const docente = req.body;

}

export function deleteDocente(req, res) {
    const { id } = req.params;
    // ...
    res.json({message: `Docente (ID: ${id}) eliminado`})
}

