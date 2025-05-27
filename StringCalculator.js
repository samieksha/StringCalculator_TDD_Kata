class StringCalculator {
  constructor() {
    this.callCount = 0;
    this.addOccurredListeners = [];
  }

  getCalledCount() {
    return this.callCount;
  }

  onAddOccurred(listener) {
    this.addOccurredListeners.push(listener);
  }

  	
  _triggerAddOccurred(input, result) {
    this.addOccurredListeners.forEach(fn => fn(input, result));
  }

  add(numbers) {
    this.callCount++;
    if (!numbers) {
      this._triggerAddOccurred(numbers, 0);
      return 0};

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

    const total = parts
      .filter(n => n <= 1000)
      .reduce((sum, num) => sum + num, 0);

    this._triggerAddOccurred(numbers, total);
    return total;
  }
}
module.exports = StringCalculator;