import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/db';
import indexRouter from './routes/index.route';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT: string =
  process.env.PORT !== undefined && process.env.PORT.trim() !== ''
    ? process.env.PORT
    : '3000';

app.set('port', PORT);

app.use('/', indexRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error inesperado' });
};

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
