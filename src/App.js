import React, {useState, useEffect, useCallback} from 'react';
import Div100vh from 'react-div-100vh'
import {words} from './words';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import './App.css';
import Modal from './components/Modal';

const GAME_STATES = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
};

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [inWordGuesses, setInWordGuesses] = useState([]);

  const resetGame = () => {
    const randomWord = getRandomWord();

    setWord(randomWord);
    setGuess('');
    setGuesses([]);
    setCorrectGuesses([]);
    setInWordGuesses([]);
    setGameState(GAME_STATES.PLAYING);
  };

  useEffect(() => {
    const randomWord = getRandomWord();
    
    setWord(randomWord);
  }, []);

  const handleKeyDown = useCallback((e) => {
    const validLetters = /^[A-Za-z]+$/;

    if (gameState === GAME_STATES.PLAYING) {
      if (e.key === 'Enter' && guess.length === 5 && guesses.length < 6) {
        if (words.includes(guess)) {
          setGuess('');
          setGuesses([...guesses, guess]);

          let newCorrectGuesses = [];
          let newInWordGuesses = [];

          guess.split('').forEach((letter, index) => {
            if (word.includes(letter)) {
              if (word[index] === letter) {
                newCorrectGuesses.push(letter);
              } else {
                newInWordGuesses.push(letter);
              }
            }
          });

          setCorrectGuesses([...correctGuesses, ...newCorrectGuesses]);
          setInWordGuesses([...inWordGuesses, ...newInWordGuesses]);
        }

        if (word === guess) {
          setGameState(GAME_STATES.WON);
        }

        if (guesses.length === 5 && word !== guess) {
          setGameState(GAME_STATES.LOST);
        }
      } else if (e.key === 'Backspace' && guess.length > 0) {
        setGuess(guess.slice(0, -1));
      } else if (e.key.length === 1 && validLetters.test(e.key) && guess.length < 5) {
        setGuess(`${guess}${e.key}`.toLowerCase());
      }
    }
  }, [gameState, guess, guesses, correctGuesses, inWordGuesses, word]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  return (
    <Div100vh>
      <div className="App">
        <Header resetGame={resetGame} />
        <GameBoard guess={guess} guesses={guesses} word={word} />
        <Keyboard
          guesses={guesses}
          correctGuesses={correctGuesses}
          inWordGuesses={inWordGuesses}
          handleKeyDown={handleKeyDown}
        />
        <Modal
          open={gameState === GAME_STATES.LOST}
          title="You lost!"
          onClose={resetGame}
        >
          <p>The word was <b>{word}</b>.</p>
          <p>Better luck next time!</p>
          <button onClick={resetGame}>Play again</button>
        </Modal>
        <Modal
          open={gameState === GAME_STATES.WON}
          title="You won!"
          onClose={resetGame}
        >
          <p>The guessed the word <b>{word}</b> in <b>{guesses.length}</b> guesses!</p>
          <button onClick={resetGame}>Play again</button>
        </Modal>
      </div>
    </Div100vh>
  );
}

export default App;
