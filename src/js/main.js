import "../css/style.css";
import Utils from "./utils";
import { createStore } from "zustand/vanilla";

// STORE
// Data
// const words = ;
// let index = 0;
// let scoreIndex = 0;
const { getState, setState } = createStore(() => ({
  // <= you can destructure straight away :)
  words: ["done", "should", "ready", "there", "long"],
  index: 0,
  scoreIndex: 0,
}));

// 1. UI (View / Presentation) view...
// 2. Update (business logic) update...
// 3. Data (DB / Store)

// DOM Nodes
const scoresDOM = Utils.qs(".scores");
const btnTryDOM = Utils.qs(".btn-try");
const btnNextDOM = Utils.qs(".btn-next");
const resultDOM = Utils.qs(".result");
const wordsDOM = Utils.qs(".words");
const inputWordDOM = Utils.qs(".input-word");

const viewScramble = () => {
  const state = getState();
  const { words, index, scoreIndex } = state;

  const word = words[index];
  const letters = word.split("");

  wordsDOM.textContent = Utils.shuffleArray(letters).join("");
  scoresDOM.textContent = `${scoreIndex} / ${words.length}`;

  btnTryDOM.addEventListener("click", () => {
    const inputWord = inputWordDOM.value;

    if (Utils.isAnagram(word, inputWord)) {
      setState((s) => ({ ...s, scoreIndex: s.scoreIndex + 1 }), true); // <= you need to update store this way (and `true` has to be the 2nd arg. It stands for "replace" the store)

      resultDOM.textContent = "Correct 👏";
      // scoresDOM.textContent = `${++scoreIndex} / ${words.length}`;
      scoresDOM.textContent = `${scoreIndex + 1} / ${words.length}`;
    } else {
      resultDOM.textContent = "🫤 Incorrect, 🔄 please   try again";
      scoresDOM.textContent = `${scoreIndex} / ${words.length}`;
    }
  });
};

// Start App (main/initApp)
const initApp = () => {
  const { words, index } = getState();

  btnNextDOM.addEventListener("click", () => {
    if (index < words.length - 1) {
      // index++;
      setState((s) => ({ ...s, index: s.index + 1 }), true);

      viewScramble();
    }
  });

  viewScramble();
};

initApp();
