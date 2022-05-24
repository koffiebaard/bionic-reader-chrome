function translateWordToBionic(word) {
  const filtered_word = (word.match(/\w+/g) || [])[0];

  if (typeof filtered_word === "undefined" || word.length <= 1)
    return word;

  const middle = Math.floor(filtered_word.length / 2);
  const first_half = filtered_word.slice(0, middle);
  const second_half = filtered_word.slice(middle);

  return word.replace(filtered_word, `<b>${first_half}</b>${second_half}`);
}

function translateParagraphToBionic(paragraph) {
  let sentences = [];

  // match from beginning (until end or first tag)
  sentences = sentences.concat(paragraph.match(/(^[^<]+)/g));

  // match from end of any tag to beginning of another
  sentences = sentences.concat(paragraph.match(/>([^<^>]+)</g));

  // match from end of last tag to end of paragraph
  sentences = sentences.concat(paragraph.match(/>([^<^>]+)$/g));
  
  for (let sentence of sentences) {
    if (sentence !== null) {
      // Filter out < and > from the regex
      sentence = sentence
        .replace(/^>/, "")
        .replace(/>$/, "");

      new_sentence = sentence.split(" ").map((word) => {
        return translateWordToBionic(word);
      }).join(" ");

      paragraph = paragraph.replace(sentence, new_sentence);
    }
  }

  return paragraph;
}

// We only use node for running tests
if (typeof module !== 'undefined') {
  module.exports.translateWordToBionic = translateWordToBionic;
  module.exports.translateParagraphToBionic = translateParagraphToBionic;
}
