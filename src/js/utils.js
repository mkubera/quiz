// utils.js

// Helper functions
const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

// The Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const isAnagram = (word, inputWord) =>
  word.toLowerCase() === inputWord.toLowerCase();


const Utils = {qs, qsa, shuffleArray, isAnagram};

export default Utils;