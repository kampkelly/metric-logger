const metricValidator = (req, res, next) => {
  const { key } = req.params;
  let { value } = req.body;

  // if not valid data was sent
  if (!value || (typeof key !== 'string')) {
    return res.status(400).json({ error: 'Bad Request!' });
  }

  // eslint-disable-next-line
  if (!isNaN(value)) { // if it's a number, round it
    value = Math.round(value);
  }

  // check if rounded value is now an integer
  if (!Number.isInteger(Number(value))) {
    return res.status(400).json({ error: 'Bad Request!' });
  }
  // set req.body.value to value because we may have rounded it
  req.body.value = value;
  return next();
};

export default metricValidator;
