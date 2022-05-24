document.getElementById("convert").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertPageToBionic,
  });
});

chrome.storage.sync.get("font_size", ({ font_size }) => {
  document.getElementById('font_size').value = font_size;
  document.getElementById('font_size_output').textContent = font_size;

  document.getElementById('font_size').addEventListener("change", function() {
    font_size = document.getElementById('font_size').value;
    chrome.storage.sync.set({ font_size });
    document.getElementById('font_size_output').textContent = font_size;
    console.log('Setting font size to ${font_size}', `font_size: ${font_size}`);
  }, false);
});

function convertPageToBionic() {
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = '//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,500,600,650,700,800,900';
  document.head.appendChild(link);

  chrome.storage.sync.get("font_size", ({ font_size }) => {
    var style = document.createElement("style");
    style.textContent = `* { font-family: 'Open Sans' !important; font-weight: 100 !important; color: #333 !important; } p { font-size: ${font_size}px; } b { font-weight: 650 !important } `;
    document.head.appendChild(style);
  });

  let paragraphs = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,ul li');

  for (let paragraph of paragraphs) {
    paragraph.innerHTML = translateParagraphToBionic(paragraph);
  }
}
