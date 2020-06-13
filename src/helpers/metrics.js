import moment from 'moment';

const currentTime = moment(new Date());

const getMetricsValuesInLastHour = (metric) => {
  const end = moment(metric.dateTime);
  const duration = moment.duration(currentTime.diff(end));
  if (duration.asHours() <= 1) {
    return metric.value;
  }
  return 0;
};

export const sumMetricValues = (sum, currentValue) => sum + currentValue;

export default getMetricsValuesInLastHour;
