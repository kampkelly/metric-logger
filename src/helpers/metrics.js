import moment from 'moment';

const currentTime = moment(new Date());

const getMetricValuesInLastHour = (metric) => {
  const metricDateTime = moment(metric.dateTime);
  const duration = moment.duration(currentTime.diff(metricDateTime));
  if (duration.asHours() <= 1) {
    return metric.value;
  }
  return 0;
};

export default getMetricValuesInLastHour;
