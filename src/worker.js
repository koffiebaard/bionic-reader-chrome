let font = "Open Sans";
let font_size = 20;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({font, font_size});
  console.log('Setting default font to ${font}', `font: ${font}`);
  console.log('Setting default font size to ${font_size}', `font_size: ${font_size}`);
});
