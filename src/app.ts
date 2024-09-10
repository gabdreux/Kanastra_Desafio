import express from 'express';
import routes from './routes/boletosRoutes'; 
import errorHandler from './middlewares/errorHandler';


const app = express();

app.use(express.json());

app.use(errorHandler);


app.use('/api', routes); 

export default app;
