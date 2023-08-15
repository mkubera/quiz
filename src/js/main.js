import "../css/style.css";
import Utils from "./utils";
import Store from "./store";
import ViewScramble from "./view/scramble";

// 1. UI (View / Presentation) view...
// 2. Update (business logic) update...
// 3. Data (DB / Store)

// DOM Nodes
const scoresDOM = Utils.qs(".scores");
const btnTryDOM = Utils.qs(".btn-try");
const btnNextDOM = Utils.qs(".btn-next");
const resultDOM = Utils.qs(".result");
const inputWordDOM = Utils.qs(".input-word");

// HELPER FN
const getHasCorrectAnswerByWordIndex = () => {
  const { words, index } = Store.getState();
  const { hasCorrectAnswer } = words[index];
  return hasCorrectAnswer;
};
const getNoOfCorrectAnswers = () => {
  const { words } = Store.getState();
  const noOfCorrectAnswers = words.filter(
    (word) => word.hasCorrectAnswer
  ).length;
  return noOfCorrectAnswers;
};

// Start App (main/initApp)
const initApp = () => {
  btnTryDOM.addEventListener("click", () => {
    const { words, index } = Store.getState();
    // const { words, index, scoreIndex } = Store.getState();
    const { id, word } = words[index];
    const inputWord = inputWordDOM.value;

    console.log(word, inputWord);

    // TODO: add +1 to the word's (by id) noOfAttempts
    // user .map on words

    if (Utils.isAnagram(word, inputWord)) {
      Store.setState(
        (state) => ({
          ...state,
          // scoreIndex: state.scoreIndex + 1,
          words: state.words.map((word) =>
            word.id === id ? { ...word, hasCorrectAnswer: true } : word
          ),
        }),
        true
      ); // <= you need to update store this way (and `true` has to be the 2nd arg. It stands for "replace" the store)

      const hasCorrectAnswer = getHasCorrectAnswerByWordIndex();
      const noOfCorrectAnswers = getNoOfCorrectAnswers();

      resultDOM.textContent = `Correct 👏 (${hasCorrectAnswer})`;
      scoresDOM.textContent = `${noOfCorrectAnswers} / ${words.length}`;
      // scoresDOM.textContent = `${scoreIndex + 1} / ${words.length}`;
    } else {
      Store.setState(
        (state) => ({
          ...state,
          words: state.words.map((word) =>
            word.id === id ? { ...word, hasCorrectAnswer: false } : word
          ),
        }),
        true
      );

      const hasCorrectAnswer = getHasCorrectAnswerByWordIndex();
      const noOfCorrectAnswers = getNoOfCorrectAnswers();

      resultDOM.textContent = `🫤 Incorrect, 🔄 please   try again (${hasCorrectAnswer})`;
      scoresDOM.textContent = `${noOfCorrectAnswers} / ${words.length}`;
      // scoresDOM.textContent = `${scoreIndex} / ${words.length}`;
    }
  });

  btnNextDOM.addEventListener("click", () => {
    const { words, index } = Store.getState();
    if (index < words.length - 1) {
      Store.setState((state) => ({ ...state, index: state.index + 1 }), true);

      ViewScramble.render();
    }
  });

  ViewScramble.render();
};

initApp();
