// Jest shouldn't judge anyone on their slow start in life. It's all good.
jest.useFakeTimers();

// This extension ID is generated from the development key in manifest.json
const extension_id = "afofodfmpeikmcpjoobibhipehodefjc";
const extension_popup = 'src/settings.html'

beforeAll(async () => {
  await page.goto(`chrome-extension://${extension_id}/${extension_popup}`);
});

test('Check header', async () => {
  await expect(page.title()).resolves.toMatch('Bionic Reader');
});

test('Font size slider', async () => {
  // Verify default font size
  let font_size_slider  = await page.$eval('#font_size', element => element.value)
  expect(font_size_slider).toBe("20");

  // Update font size and trigger change event
  await page.$eval('#font_size', element => {
    element.value = '15';
    const event = new Event('change');
    element.dispatchEvent(event);
  });

  // Verify the slider has been updated
  font_size_slider = await page.$eval('#font_size', element => element.value)
  expect(font_size_slider).toBe("15");
  
  // Verify the output has been updated too
  font_size_output  = await page.$eval('#font_size_output', element => element.textContent)
  expect(font_size_output).toBe("15");
});

test('Font size storage', async () => {
  // Update font size and trigger change event
  await page.$eval('#font_size', element => {
    element.value = '30';
    const event = new Event('change');
    element.dispatchEvent(event);
  });

  // Go to the page again
  await page.goto(`chrome-extension://${extension_id}/${extension_popup}`);

  // Verify the font size is the same
  font_size = await page.$eval('#font_size', element => element.value)
  expect(font_size).toBe("30");
});

test('Font storage', async () => {
  // Verify default font
  let font  = await page.$eval('#font', element => element.value)
  expect(font).toBe("Open Sans");

  // Update font and trigger change event
  await page.$eval('#font', element => {
    element.value = 'Noto Sans';
    const event = new Event('change');
    element.dispatchEvent(event);
  });

  // Go to the page again
  await page.goto(`chrome-extension://${extension_id}/${extension_popup}`);

  // Verify the font is the same
  font = await page.$eval('#font', element => element.value)
  expect(font).toBe("Noto Sans");
});
