const text = require("./text");

class Analyzer {
  constructor() {}

  getMostUsedWords(text) {
    const symbols = [",", ".", "!", "?", ":", ";", "/"];
    const sortedFilteredText = text
      .split(" ")
      .toSorted((a, b) => a.localeCompare(b))
      .filter((word) => word.trim());
    const textInLowerCase = sortedFilteredText
      .join(" ")
      .toLowerCase()
      .split(" ");
    const result = textInLowerCase.map((word) => {
      let cleanWord = "";
      for (const char of word) {
        if (!symbols.includes(char)) {
          cleanWord += char;
        }
      }
      return cleanWord;
    });

    const wordsCounter = {};
    for (const word of result) {
      if (!wordsCounter.hasOwnProperty(word)) {
        wordsCounter[word] = 0;
      }

      wordsCounter[word] += 1;
    }
    console.log(wordsCounter);
  }
}

const textAnalyzer = new Analyzer();

textAnalyzer.getMostUsedWords(text);
