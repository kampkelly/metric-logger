import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

import metricRouter from './routes/metric';

const app = express();
const { PORT = 5000 } = process.env;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataStructure = {
  metrics: {},
};

app.set('appData', dataStructure);

app.use('/', metricRouter);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Testing the api!',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found! The page you are trying to access does not exist!',
    status: 'Failed',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});

export default app;
