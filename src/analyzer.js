const text = require("./text");

class Analyzer {
  moodKeywords = {
    negative: [],
    neutral: [],
    positive: [],
  };

  // вони шось не дуже універсальні, вот ці вот два метода...
  filterText(text) {
    const textInLowerCase = text.toLowerCase();
    const textWithoutSymbols = textInLowerCase
      .replaceAll(/[^a-zA-Z0-9']/g, " ")
      .split(" ");
    const result = textWithoutSymbols
      .toSorted((a, b) => a.localeCompare(b))
      .filter((word) => word.trim());

    return result;
  }
  getWordsQuantity(text) {
    const wordsCounter = {};
    for (const word of text) {
      if (!wordsCounter.hasOwnProperty(word)) {
        wordsCounter[word] = 0;
      }

      wordsCounter[word] += 1;
    }

    return wordsCounter;
  }

  getMostUsedWords(text) {
    const filteredText = this.filterText(text);
    const wordsCounter = this.getWordsQuantity(filteredText);

    const topTenWords = [];
    for (let i = 0; i < 10; i += 1) {
      let maxQuantity = 0;
      let maxQuantityWord = "";
      for (const word in wordsCounter) {
        if (wordsCounter[word] > maxQuantity) {
          maxQuantity = wordsCounter[word];
          maxQuantityWord = word;
        }
      }
      topTenWords.push([maxQuantityWord, maxQuantity]);
      wordsCounter[maxQuantityWord] = null;
    }

    return topTenWords;
  }
  getUniqueWords(text) {
    const filteredText = this.filterText(text);
    const wordsCounter = this.getWordsQuantity(filteredText);

    const uniqueWords = [];
    for (const word in wordsCounter) {
      if (wordsCounter[word] < 2) {
        uniqueWords.push(word);
      }
    }

    return uniqueWords;
  }

  getAverageTextLength(text) {
    const sentences = text
      .split(/(?<=[.!?])(?=\s+|\n+(?=\p{Lu}))/gu)
      .map((sentence) => sentence.trim());
    let overallTextLength = 0;
    for (const sentence of sentences) {
      overallTextLength += sentence.length;
    }
    return `Overall words in single sentence in text: ${(
      overallTextLength / sentences.length
    ).toFixed(2)} words`;
  }
  getMinWordsQuantityInSentence(text) {
    const sentences = text
      .split(/(?<=[.!?])(?=\s+|\n+(?=\p{Lu}))/gu)
      .map((sentence) => sentence.trim());

    let minSentenceLength = Infinity;
    for (const sentence of sentences) {
      if (sentence.length < minSentenceLength) {
        minSentenceLength = sentence.length;
      }
    }
    return minSentenceLength;
  }
  getMaxWordsQuantityInSentence(text) {
    const sentences = text
      .split(/(?<=[.!?])(?=\s+|\n+(?=\p{Lu}))/gu)
      .map((sentence) => sentence.trim());

    let maxSentenceLength = 0;
    for (const sentence of sentences) {
      if (sentence.length > maxSentenceLength) {
        maxSentenceLength = sentence.length;
      }
    }
    return maxSentenceLength;
  }

  // в душі не шарю, як це зробити
  determineMoodSentence(text) {
    const sentences = text
      .split(/(?<=[.!?])(?=\s+|\n+(?=\p{Lu}))/gu)
      .map((sentence) => sentence.trim());
  }
}

const textAnalyzer = new Analyzer();

module.exports = textAnalyzer;
