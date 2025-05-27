class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;

    let delimiterRegex = /,|\n/;

    if (numbers.startsWith('//')) {
      const [, delimiterPart, rest] = numbers.match(/^\/\/(.+)\n(.*)$/);
      numbers = rest;
      if (delimiterPart.startsWith('[')) {
        const delimiters = delimiterPart.match(/\[([^\]]+)\]/g).map(d => d.slice(1, -1));
        delimiterRegex = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));
      } else {
        delimiterRegex = new RegExp(delimiterPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      }
    }

    return numbers
      .split(delimiterRegex)
      .map(Number)
      .reduce((sum, num) => sum + num, 0);
  }
}
module.exports = StringCalculator;