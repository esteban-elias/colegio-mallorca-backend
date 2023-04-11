import bcrypt from 'bcrypt';

async function generateInsertStatementsDocente() {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`docente${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
        console.log(`(${i}, '0', 'testing', 'docente${i}', 'docente${i}@testing.com', X'${passwordHex}'),`);
    }
}
console.log(generateInsertStatementsNota(2));

async function generateInsertStatementsAlumno(idCurso) {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`alumno${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
          console.log(`(${i}, '0', 'testing', 'alumno${i}', 'alumno${i}@testing.com', X'${passwordHex}', ${idCurso}),`);
    }
}

function generateInsertStatementsNota(idClase) {
    for (let n = 1; n <= 4; n++) {
      for (let i = 21; i <= 40; i++) {
          const calificacion = Math.floor(Math.random() * 70 + 10)/10;
          console.log(`(1, ${n}, 25, ${calificacion}, ${i}, ${idClase}),`);
      }
    }
}

/*  
VIEW clase
select concat(curso.nivel, curso.letra) as curso, asignatura.nombre, docente.nombres
from docente inner join clase on docente.id=clase.id_docente
inner join asignatura on clase.id_asignatura=asignatura.id
inner join curso on clase.id_curso=curso.id;


VIEW alumno_curso_asignatura_docente
select alumno.nombres, concat(curso.nivel, curso.letra) as curso, asignatura.nombre, docente.nombres
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

