const metricValidator = (req, res, next) => {
  const { key } = req.params;
  let { value } = req.body;

  if (!value || (typeof key !== 'string')) {
    return res.status(400).json({ error: 'Bad Request!' });
  }

  // eslint-disable-next-line
  if (!isNaN(value)) {
    value = Math.round(value);
  }

  if (!Number.isInteger(Number(value))) {
    return res.status(400).json({ error: 'Bad Request!' });
  }
  // set req.body.value to value  because we may have rounded it
  req.body.value = value;
  return next();
};

export default metricValidator;
