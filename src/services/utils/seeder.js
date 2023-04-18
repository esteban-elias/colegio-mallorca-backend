import bcrypt from 'bcrypt';

async function generateInsertStatementsDocente() {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`docente${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
        console.log(`(${i}, '0', 'testing', 'docente${i}', 'docente${i}@testing.com', X'${passwordHex}'),`);
    }
}

async function generateInsertStatementsAlumno(idCurso) {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`alumno${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
          console.log(`(${i}, '0', 'testing', 'alumno${i}', 'alumno${i}@testing.com', X'${passwordHex}', ${idCurso}),`);
    }
}

/**
 * 
 * Por ahora: 
 * - El primer valor será "1" (semestre)
 * - Serán 4 notas, con un porcentaje de 25% cada una.
 */
function generateInsertStatementsNota(idClase) {
    console.log(`INSERT INTO nota 
(semestre, numero, porcentaje, calificacion, id_alumno, id_clase)
VALUES`)
    for (let numNota = 1; numNota <= 4; numNota++) {
      for (let idAlumno = 21; idAlumno <= 40; idAlumno++) {
          const calificacion = Math.floor(Math.random() * 60 + 10)/10;
          console.log(`(1, ${numNota}, 25, ${calificacion}, ${idAlumno}, ${idClase}),`);
      }
    }
}

/*  
VIEW clase
select clase.id as id_clase, concat(curso.nivel, curso.letra) as curso, 
asignatura.nombre as asignatura, docente.id as id_docente, docente.nombres as docente
from docente inner join clase on docente.id=clase.id_docente
inner join asignatura on clase.id_asignatura=asignatura.id
inner join curso on clase.id_curso=curso.id;


VIEW alumno_curso_asignatura_docente
select alumno.id, alumno.nombres, concat(curso.nivel, curso.letra) as curso, asignatura.nombre, docente.nombres
from docente inner join clase on docente.id=clase.id_docente
inner join asignatura on clase.id_asignatura=asignatura.id
inner join curso on clase.id_curso=curso.id
inner join alumno on curso.id=alumno.id_curso;

VIEW alumno_notas
select alumno.nombres, concat(curso.nivel, curso.letra) as curso, asignatura.nombre, docente.nombres, nota.calificacion
from docente inner join clase on docente.id=clase.id_docente
inner join asignatura on clase.id_asignatura=asignatura.id
inner join curso on clase.id_curso=curso.id
inner join alumno on curso.id=alumno.id_curso
inner join nota on alumno.id=nota.id_alumno and clase.id=nota.id_clase
where alumno.id=21;  
*/

