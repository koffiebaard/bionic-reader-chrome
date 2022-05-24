function translateWordToBionic(word) {
  const midPoint = Math.floor(word.length / 2);
  const firstHalf = word.slice(0, midPoint);
  const secondHalf = word.slice(midPoint);
  return `<b>${firstHalf}</b>${secondHalf}`;
}

function translateParagraphToBionic(paragraph) {
  words = paragraph.textContent.split(" ");

  return words.map((word) => {
    if (word.indexOf("-") >= 0) {
      const translatedDashWords = word.split("-").map((word) => {
        return translateWordToBionic(word);
      });

      return translatedDashWords.join("-");
    }

    return translateWordToBionic(word);
  }).join(" ");
}
