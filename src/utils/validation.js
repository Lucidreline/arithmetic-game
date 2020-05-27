module.exports = {
  inputValidation: value => {
    try {
      console.log(value);
      if (Number.isInteger(value)) {
        if (value < 1 || value > 9) return false;
        else return true;
      }
    } catch (err) {
      return false;
    }
  },
};
