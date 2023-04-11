import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.route.js';  // /index.js?

const app = express();  

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo ocurrió!');
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
