import moment from 'moment';

const returnMetricsInLastHour = (metric) => {
  const currentTime = moment(new Date());
  const metricDateTime = moment(metric.dateTime);
  const duration = moment.duration(currentTime.diff(metricDateTime));
  if (duration.asHours() <= 1) {
    return metric;
  }
};

export default returnMetricsInLastHour;
