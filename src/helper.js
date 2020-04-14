const truncator = (value, precision) => {
  const step = 10 ** precision || 0;
  const temp = Math.trunc(step * value);

  return temp / step;
};
module.exports = truncator;
