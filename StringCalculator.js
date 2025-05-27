class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;
    const delimiterRegex = /,|\n/;
    return numbers
      .split(delimiterRegex)
      .map(Number)
      .reduce((sum, num) => sum + num, 0);
  }
}
module.exports = StringCalculator;