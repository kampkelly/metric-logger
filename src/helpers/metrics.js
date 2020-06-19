import moment from 'moment';

const currentTime = moment(new Date());

const returnMetricsInLastHour = (metric) => {
  const metricDateTime = moment(metric.dateTime);
  const duration = moment.duration(currentTime.diff(metricDateTime));
  if (duration.asHours() <= 1) {
    return metric;
  }
};

export default returnMetricsInLastHour;
