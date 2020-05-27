module.exports = {
  inputValidation: value => {
    try {
      if (Number.isInteger(value)) {
        if (value < 1 || value > 9) return false;
        else return true;
      }
    } catch (err) {
      return false;
    }
  },
};
