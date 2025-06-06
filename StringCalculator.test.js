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

//TEST CASE 3
test('handles newlines between numbers', () => {
  const sc = new StringCalculator();
  expect(sc.add("1\n2,3")).toBe(6);
});

//TEST CASE 4
test('supports custom delimiter', () => {
  const sc = new StringCalculator();
  expect(sc.add("//;\n1;2")).toBe(3);
});

//TEST CASE 5
test('throws on negative numbers', () => {
  const sc = new StringCalculator();
  expect(() => sc.add("1,-2,-3")).toThrow("negatives not allowed: -2, -3");
});

//TEST CASE 6
test('ignores numbers greater than 1000', () => {
  const sc = new StringCalculator();
  expect(sc.add("2,1001")).toBe(2);
});

//TEST CASE 7
test('tracks number of add calls', () => {
  const sc = new StringCalculator();
  sc.add("1,2");
  sc.add("3,4");
  expect(sc.getCalledCount()).toBe(2);
});

//TEST CASE 8
test('emits event after add is called', () => {
  const sc = new StringCalculator();

  let capturedInput = null;
  let capturedResult = null;

  sc.onAddOccurred((input, result) => {
    capturedInput = input;
    capturedResult = result;
  });

  const result = sc.add("1,2");

  expect(capturedInput).toBe("1,2");
  expect(capturedResult).toBe(result);
});
