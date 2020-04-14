const truncator = (value, precision) => {
    let step = Math.pow(10,precision || 0);
    let temp = Math.trunc(step * value);

    return temp / step;
};
module.exports = truncator;