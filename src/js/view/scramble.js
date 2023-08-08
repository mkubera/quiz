import Utils from "./../utils";
import Store from "./../store";

const wordsDOM = Utils.qs(".words");
const scoresDOM = Utils.qs(".scores");

const render = () => {
  const { words, index, scoreIndex } = Store.getState();
  const letters = words[index].split("");

  wordsDOM.textContent = Utils.shuffleArray(letters).join("");
  scoresDOM.textContent = `${scoreIndex} / ${words.length}`;
};

const ViewScramble = { render };

export default ViewScramble;
