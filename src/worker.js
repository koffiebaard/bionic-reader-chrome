let font_size = 20;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ font_size });
  console.log('Setting default font size to ${font_size}', `font_size: ${font_size}`);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/content-script.js']
  });
});
