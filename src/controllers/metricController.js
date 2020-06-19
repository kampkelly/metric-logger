import moment from 'moment';

import returnMetricsInLastHour from '../helpers/metrics';

/**
   * @export
   * @class metricController
   *  @description Performs operations on metrics
   */
class metricController {
  /**
    * @description -This method adds a metric
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - empty object
    */
  static addMetric(req, res) {
    const dataStructure = req.app.get('appData');
    const { key } = req.params;
    const { value } = req.body;

    const currentDateTime = moment(new Date());

    const metricData = {
      value,
      dateTime: currentDateTime,
    };
    // if key is already present, just add to it
    if (key in dataStructure.metrics) {
      dataStructure.metrics[key].push(metricData);
    } else {
      dataStructure.metrics[key] = [metricData];
    }

    return res.status(200).json({});
  }

  /**
    * @description -This method gets the sum of a metric
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - sum of metric values
    */
  static getMetricSum(req, res) {
    const dataStructure = req.app.get('appData');
    const { key } = req.params;
    if (key in dataStructure.metrics) {
      // filter for only metrics that have been added in the last hour
      const metricsInLastHour = dataStructure.metrics[key].filter(returnMetricsInLastHour);
      const sumValues = metricsInLastHour.reduce((sum, metric) => sum + metric.value, 0);

      return res.status(200).json({ value: sumValues });
    }

    return res.status(404).json({ message: 'Metric key not found!' });
  }

  /**
    * @description -This method deletes metric older than 1 hour
    * @param {object} data - The dataStructure object
    * @returns {object} - None
    */
  static deleteOldMetrics(data) {
    const dataStructure = data;
    Object.keys(dataStructure.metrics).forEach((key) => {
      // filter to remove metrics older than 1 hour
      dataStructure.metrics[key] = dataStructure.metrics[key].filter(returnMetricsInLastHour);
    });
  }
}

export default metricController;
