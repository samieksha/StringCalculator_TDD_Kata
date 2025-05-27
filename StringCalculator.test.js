const StringCalculator = require('./StringCalculator');

//TEST CASE 1
test('returns 0 for empty string', () => {
  const sc = new StringCalculator();
  expect(sc.add("")).toBe(0);
});

test('returns number for a single value', () => {
  const sc = new StringCalculator();
  expect(sc.add("1")).toBe(1);
});

test('returns sum for two numbers', () => {
  const sc = new StringCalculator();
  expect(sc.add("1,2")).toBe(3);
});

//TEST CASE 2
test('returns sum for multiple numbers', () => {
  const sc = new StringCalculator();
  expect(sc.add("1,2,3,4")).toBe(10);
});

