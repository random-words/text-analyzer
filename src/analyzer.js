const text = require("./text");

class Analyzer {
  constructor() {}

  getMostUsedWords(text) {
    const words = text.split(" ").toSorted((a, b) => a.localeCompare(b));
    console.log(words);
  }
}

Analyzer.getMostUsedWords(text);
