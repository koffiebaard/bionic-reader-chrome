// Press the convert button to translate the current page
document.getElementById("convert").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/content-script.js']
  }, () => {

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertPageToBionic,
    });
  });
});

// Fetch the font size and update the settings form
chrome.storage.sync.get("font_size", ({ font_size }) => {
  updateFontSize(font_size);
});

// If the slider is moved, we'll update the font size
document.getElementById('font_size').addEventListener("change", function() {
  font_size = document.getElementById('font_size').value;
  chrome.storage.sync.set({ font_size });
  updateFontSize(font_size);
}, false);

function updateFontSize(font_size) {
  document.getElementById('font_size').value = font_size;
  document.getElementById('font_size_output').textContent = font_size;
  console.log('Setting font size to ${font_size}', `font_size: ${font_size}`);
}

function convertPageToBionic() {
  // Add font to page
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = '//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,500,600,650,700,800,900';
  document.head.appendChild(link);

  // Style the page
  chrome.storage.sync.get("font_size", ({ font_size }) => {
    var style = document.createElement("style");
    style.textContent = `p,h1,h2,h3,h4,h5,h6,ul li,a { font-family: 'Open Sans' !important; font-weight: 100 !important; } p { font-size: ${font_size}px; } b { font-weight: 650 !important } `;
    document.head.appendChild(style);
  });

  // Translate all paragraphs and lists to Bionic Reading
  let paragraphs = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,ul li');
  for (let paragraph of paragraphs) {
    paragraph.innerHTML = translateParagraphToBionic(paragraph.innerHTML);
  }
}
