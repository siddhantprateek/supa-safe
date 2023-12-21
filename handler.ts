import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import router from './routes/routes';

const app: Express = express();

// middleware
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Supa Safe');
});

export {
  app,
}

