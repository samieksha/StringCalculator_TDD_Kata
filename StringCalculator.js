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

    const parts = numbers.split(delimiterRegex).map(Number);
    const negatives = parts.filter(n => n < 0);
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
    }

    return parts.reduce((sum, num) => sum + num, 0);
  }
}
module.exports = StringCalculator;