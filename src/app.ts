import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/db';
import indexRouter from './routes/index.route';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


db.getConnection()
  .then((connection) => {
    console.log('Conexión con la base de datos exitosa');
    connection.release();
  })
  .catch((error) =>
    console.error('Error de conexión con la base de datos', error)
  );
