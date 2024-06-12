import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

//routes
app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);

// app.use((err: any, req: Request, res: Response) =>
//   errorResponse(res, { statusCode: err.status, message: err.message }),
// );

app.get('/', (req: Request, res: Response) =>
  res.send(`Server is running fine!`),
);

export default app;
