import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

import metricRouter from './routes/metric';
import metricController from './controllers/metricController';

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
    message: 'Welcome to metric logger api!',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found! The url you are trying to access does not exist!',
    status: 'Failed',
  });
});

// run a cron-job every hour to delete old metrics
cron.schedule('0 * * * *', () => metricController.deleteOldMetrics(dataStructure));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});

module.exports.run = serverless(app);
