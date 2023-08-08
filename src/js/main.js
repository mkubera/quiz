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

// Start App (main/initApp)
const initApp = () => {
  btnTryDOM.addEventListener("click", () => {
    const { words, index, scoreIndex } = Store.getState();
    const word = words[index];
    const inputWord = inputWordDOM.value;

    if (Utils.isAnagram(word, inputWord)) {
      Store.setState(
        (state) => ({ ...state, scoreIndex: state.scoreIndex + 1 }),
        true
      ); // <= you need to update store this way (and `true` has to be the 2nd arg. It stands for "replace" the store)

      resultDOM.textContent = "Correct 👏";
      scoresDOM.textContent = `${scoreIndex + 1} / ${words.length}`;
    } else {
      resultDOM.textContent = "🫤 Incorrect, 🔄 please   try again";
      scoresDOM.textContent = `${scoreIndex} / ${words.length}`;
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
