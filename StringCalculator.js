class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;
    return numbers
      .split(',')
      .map(Number)
      .reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;