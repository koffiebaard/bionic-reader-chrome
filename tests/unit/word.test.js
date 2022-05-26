const tools = require('../../src/content-script.js');

test('Word length 1', () => {
  expect(tools.translateWordToBionic("a")).toBe("a");
});

test('Word length 2', () => {
  expect(tools.translateWordToBionic("So")).toBe("<b>S</b>o");
});

test('Word length 3', () => {
  expect(tools.translateWordToBionic("The")).toBe("<b>T</b>he");
});

test('Word length 4', () => {
  expect(tools.translateWordToBionic("CaKe")).toBe("<b>Ca</b>Ke");
});

test('Word length 5', () => {
  expect(tools.translateWordToBionic("sleep")).toBe("<b>sl</b>eep");
});

test('Word length 6', () => {
  expect(tools.translateWordToBionic("cheese")).toBe("<b>che</b>ese");
});

test('Word length 7', () => {
  expect(tools.translateWordToBionic("Amazing")).toBe("<b>Ama</b>zing");
});

test('Word length 20', () => {
  expect(tools.translateWordToBionic("sleepSLEEPsleepSLEEP")).toBe("<b>sleepSLEEP</b>sleepSLEEP");
});

test('Word length 5 with question mark', () => {
  expect(tools.translateWordToBionic("sleep?")).toBe("<b>sl</b>eep?");
});

test('Word length 9 with dot', () => {
  expect(tools.translateWordToBionic("abhorrent.")).toBe("<b>abho</b>rrent.");
});

test('Word with weird', () => {
  expect(tools.translateWordToBionic("...WhAtIsThIs???L0l.")).toBe("...<b>WhAtI</b>sThIs???L0l.");
});

test('Word with only question mark', () => {
  expect(tools.translateWordToBionic("?")).toBe("?");
});
