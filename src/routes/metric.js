import express from 'express';

import metricValidator from '../middlewares/metricValidator';
import metricController from '../controllers/metricController';

const metricRouter = express.Router();

metricRouter.post('/metric/:key', metricValidator, metricController.addMetric);

export default metricRouter;
