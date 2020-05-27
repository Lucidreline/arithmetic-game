module.exports = {
  inputValidation: value => {
    try {
      if (Number.isInteger(value)) {
        if (value < 1 || value > 10) return false;
        else return true;
      }
    } catch (err) {
      return false;
    }
  },
  findNextTarget: currentTotal => {
    const series = [1, 12, 23, 34, 45, 56, 67, 78, 89, 100];

    for (let i = 0; i < series.length; i++) {
      if (series[i] > currentTotal) return series[i];
    }
    return null;
  },
};
