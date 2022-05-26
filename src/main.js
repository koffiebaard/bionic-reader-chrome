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

// Fetch the font & font size and update the settings form
chrome.storage.sync.get(['font', 'font_size'], ({ font, font_size }) => {
  updateFont(font);
  updateFontSize(font_size);
});

// If the slider is moved, we'll update the font size
document.getElementById('font_size').addEventListener("change", function() {
  font_size = document.getElementById('font_size').value;
  chrome.storage.sync.set({ font_size });
  updateFontSize(font_size);
}, false);

// If the font dropdown is changed, we'll update the font
document.getElementById('font').addEventListener("change", function() {
  font = document.getElementById('font').value;
  chrome.storage.sync.set({ font });
  updateFont(font);
}, false);

function updateFontSize(font_size) {
  document.getElementById('font_size').value = font_size;
  document.getElementById('font_size_output').textContent = font_size;
  console.log('Setting font size to ${font_size}', `font_size: ${font_size}`);
}

function updateFont(font) {
  document.getElementById('font').value = font;
  console.log('Setting font to ${font}', `font: ${font}`);
}

function convertPageToBionic() {
  const font_settings = {
    "Open Sans":        { "weight_default": 100, "weight_bold": 650 },
    "Noto Sans":        { "weight_default": 200, "weight_bold": 500 },
    "Source Sans Pro":  { "weight_default": 100, "weight_bold": 600 }
  }

  chrome.storage.sync.get(['font', 'font_size'], ({ font, font_size }) => {
    // Add font to page
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'bionic-reader-font';
    link.href = `//fonts.googleapis.com/css?family=${font.replace(' ', '+')}:100,200,500,600,650,700,800,900`;
    document.head.appendChild(link);

    // Style the page
    var style = document.createElement("style");
    style.textContent = `p,h1,h2,h3,h4,h5,h6,ul li,a { font-family: '${font}' !important; font-weight: ${font_settings[font]['weight_default']} !important; } p { font-size: ${font_size}px; } b { font-weight: ${font_settings[font]['weight_bold']} !important } `; 
    document.head.appendChild(style);
  });

  // Only translate once
  if (document.body.classList.contains('bionic-reader-translated') === false) {
    // Translate all paragraphs and lists to Bionic Reading
    let paragraphs = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,ul li');
    for (let paragraph of paragraphs) {
      paragraph.innerHTML = translateParagraphToBionic(paragraph.innerHTML);
    }

    // Keep track of the Bionic translation
    document.body.classList.add('bionic-reader-translated');
  }
}
