import { createStore } from "zustand/vanilla";

const { getState, setState } = createStore(() => ({
  // <= you can destructure straight away :)
  words: [
    "done",
    "should",
    "ready",
    "there",
    "long",
    // {id: 1, word: "done", hasCorrectAnswer: null, noOfAttempts: 0},
    // {id: 2, word: "should", hasCorrectAnswer: null, noOfAttempts: 0},
    // {id: 3, word: "ready", hasCorrectAnswer: null, noOfAttempts: 0},
    // {id: 4, word: "there", hasCorrectAnswer: null, noOfAttempts: 0},
    // {id: 5, word: "long", hasCorrectAnswer: null, noOfAttempts: 0}
  ],
  index: 0,
  scoreIndex: 0,
}));

const Store = { getState, setState };

export default Store;

// // IMPERATIVE LOOP (HOW?)
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];

// }

// // DECLARATIVE (FUNCTIONAL) LOOP (WHAT?)
// [1,2,3].forEach(() => WHAT TO DO)
