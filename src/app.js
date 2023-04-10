import express from 'express';
// import db from "./config/db.js"; ???
import indexRouter from './routes/index.route.js';  // /index.js?

const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo ocurrió!');
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

/*
// connect to database ???
db.connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
*/