const textAnalyzer = require("./analyzer");
const text = require("./text");

console.log(textAnalyzer.getMostUsedWords(text));
console.log(textAnalyzer.getUniqueWords(text));
console.log(textAnalyzer.getAverageTextLength(text));
console.log(textAnalyzer.getMinWordsQuantityInSentence(text));
console.log(textAnalyzer.getMaxWordsQuantityInSentence(text));
