const tools = require('../src/content-script.js');

test('Test paragraph: "This is a test."', () => {
  expect(tools.translateParagraphToBionic("This is a test.")).toBe("<b>Th</b>is <b>i</b>s a <b>te</b>st.");
});

test('Test paragraph: "I like cake & I cannot lie"', () => {
  expect(tools.translateParagraphToBionic("I like cake & I cannot lie")).toBe("I <b>li</b>ke <b>ca</b>ke & I <b>can</b>not <b>l</b>ie");
});

test('Test paragraph: two links with text on all sides"', () => {
  expect(tools.translateParagraphToBionic('hello this is a test & such <a href="">linky dink dink</a> and test test <a href="">another link</a> HAHAHA.')).toBe('<b>he</b>llo <b>th</b>is <b>i</b>s a <b>te</b>st & <b>su</b>ch <a href=""><b>li</b>nky <b>di</b>nk <b>di</b>nk</a> <b>a</b>nd <b>te</b>st <b>te</b>st <a href=""><b>ano</b>ther <b>li</b>nk</a> <b>HAH</b>AHA.');
});

test('Test paragraph: messy with link inside"', () => {
  expect(tools.translateParagraphToBionic('whatdid<a href="la die da">link</a>say?')).toBe('<b>wha</b>tdid<a href="la die da"><b>li</b>nk</a><b>s</b>ay?');
});

test('Test paragraph: b and i tag present', () => {
  expect(tools.translateParagraphToBionic('Do you like <b>CHEESE</b>? You must. You <i>MUST</i>.')).toBe('<b>D</b>o <b>y</b>ou <b>li</b>ke <b><b>CHE</b>ESE</b>? <b>Y</b>ou <b>mu</b>st. <b>Y</b>ou <i><b>MU</b>ST</i>.');
});
