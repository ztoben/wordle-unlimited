import React, {useState, useEffect, useCallback} from 'react';
import { use100vh } from 'react-div-100vh';
import { GAME_STATES } from './gameStates';
import {words} from './words';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import Alert from './components/Alert';
import './App.css';

function delayCallback(callback, timeout = 2000) {
  setTimeout(callback, timeout);
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const browserHeight = use100vh();

  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);
  const [alertOpen, setAlertOpen] = useState(false);
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

  const toggleAlert = () => {
    setAlertOpen(!alertOpen);
  };

  useEffect(() => {
    const randomWord = getRandomWord();
    
    setWord(randomWord);
  }, []);

  useEffect(() => {
    if (gameState === GAME_STATES.WON || gameState === GAME_STATES.LOST) {
      delayCallback(() => setAlertOpen(true));
    } else if (gameState === GAME_STATES.PLAYING) {
      setAlertOpen(false);
    }
  }, [gameState]);

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
    <div className="App" style={{height: browserHeight}}>
      <Header resetGame={resetGame} />
      <GameBoard guess={guess} guesses={guesses} word={word} gameState={gameState} />
      <Keyboard
        guesses={guesses}
        correctGuesses={correctGuesses}
        inWordGuesses={inWordGuesses}
        handleKeyDown={handleKeyDown}
      />
      <Alert
        open={gameState === GAME_STATES.LOST && alertOpen}
        title="You lost..."
        onClose={toggleAlert}
      >
        <p>The word was <b>{word}</b>.</p>
        <p>Better luck next time!</p>
        <button onClick={resetGame}>Play again</button>
      </Alert>
      <Alert
        open={gameState === GAME_STATES.WON && alertOpen}
        title="You won!"
        onClose={toggleAlert}
      >
        <p>The guessed the word <b>{word}</b> in <b>{guesses.length}</b> guesses!</p>
        <button onClick={resetGame}>Play again</button>
      </Alert>
    </div>
  );
}

export default App;
