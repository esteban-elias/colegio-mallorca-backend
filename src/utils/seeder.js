import bcrypt from 'bcrypt';

async function generateInsertStatementsDocente() {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`docente${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
        if (i < 10) {
          console.log(`(${i}0000000, '0', 'testing', 'docente${i}', 'docente${i}@testing.com', X'${passwordHex}'),
          `);
        }
        else {
          console.log(`(${i}000000, '0', 'testing', 'docente${i}', 'docente${i}@testing.com', X'${passwordHex}'),
          `);
        }
    }
}

async function generateInsertStatementsAlumno(idCurso) {
    for (let i = 1; i <= 20; i++) {
        const passwordBcrypt = await bcrypt.hash(`alumno${i}`, 10);
        const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
        const passwordHex = passwordBuffer.toString('hex');
        if (i < 10) {
          console.log(`(${i}0000000, '0', 'testing', 'alumno${i}', 'alumno${i}@testing.com', X'${passwordHex}', ${idCurso}),
          `);
        }
        else {
          console.log(`(${i}000000, '0', 'testing', 'alumno${i}', 'alumno${i}@testing.com', X'${passwordHex}', ${idCurso}'),
          `);
        }
    }
}
