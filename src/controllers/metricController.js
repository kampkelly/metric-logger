import moment from 'moment';

import getMetricValuesInLastHour from '../helpers/metrics';

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
    const datastructure = req.app.get('appData');
    const { key } = req.params;
    const { value } = req.body;

    const currentDateTime = moment(new Date());

    const metricData = {
      value,
      dateTime: currentDateTime,
    };
    // if key is already present, just add to it
    if (key in datastructure.metrics) {
      datastructure.metrics[key].push(metricData);
    } else {
      datastructure.metrics[key] = [metricData];
    }

    const oneHour = 1000 * 60 * 60;
    // delete this metric after 1 hour
    setTimeout(() => { datastructure.metrics[key].splice(0, 1); }, oneHour);

    return res.status(200).json({});
  }

  /**
    * @description -This method gets the sum of a metric
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - sum of metric values
    */
  static getMetricSum(req, res) {
    const datastructure = req.app.get('appData');
    const { key } = req.params;
    if (key in datastructure.metrics) {
      // filter for only metrics that have been added in the last hour
      const metricValuesInLastHour = datastructure.metrics[key].map(getMetricValuesInLastHour);
      const sumValues = metricValuesInLastHour.reduce((sum, currentValue) => sum + currentValue, 0);

      return res.status(200).json({ value: sumValues });
    }
    return res.status(404).json({ message: 'Metric key not found!' });
  }
}

export default metricController;
