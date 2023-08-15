import Utils from "./../utils";
import Store from "./../store";

const wordsDOM = Utils.qs(".words");
const scoresDOM = Utils.qs(".scores");

// TODO: MOVE TO ITS OWN MODULE
// (duplicate from main.js)
const getNoOfCorrectAnswers = () => {
  const { words } = Store.getState();
  const noOfCorrectAnswers = words.filter(
    (word) => word.hasCorrectAnswer
  ).length;
  return noOfCorrectAnswers;
};

const render = () => {
  const { words, index, scoreIndex } = Store.getState();
  const letters = words[index].word.split("");

  const noOfCorrectAnswers = getNoOfCorrectAnswers();

  wordsDOM.textContent = Utils.shuffleArray(letters).join("");
  scoresDOM.textContent = `${noOfCorrectAnswers} / ${words.length}`;
  // scoresDOM.textContent = `${scoreIndex} / ${words.length}`;
};

const ViewScramble = { render };

export default ViewScramble;
