import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import db from './config/db';
import { PORT } from './config/env';
import errorHandler from './errors/error-handler';
import indexRouter from './routes/index.route';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('port', PORT);

app.use('/', indexRouter);

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port') as string}`);
});

db.getConnection()
  .then((connection) => {
    console.log('Conexión con la base de datos exitosa');
    connection.release();
  })
  .catch((error) =>
    console.error('Error de conexión con la base de datos', error)
  );
