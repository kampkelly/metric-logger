import moment from 'moment';

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

    const currentTime = moment(new Date());

    // if key is already present
    if (key in datastructure.metrics) {
      datastructure.metrics[key].push({
        value,
        dateTime: currentTime,
      });
    } else {
      datastructure.metrics[key] = [{
        value,
        dateTime: new Date(),
      }];
    }
    return res.status(200).json({ datastructure });
    // return res.status(200).json({});
  }
}

export default metricController;
