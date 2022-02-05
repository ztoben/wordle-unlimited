import React from 'react';
import './Keyboard.css';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
];

function getKeyClass(guesses, key, correctGuesses, inWordGuesses) {
  if (key === 'Backspace' || key === 'Enter') {
    return 'keyboard-key';
  }

  if (correctGuesses.includes(key)) {
    return 'keyboard-key keyboard-key--correct';
  }

  if (inWordGuesses.includes(key)) {
    return 'keyboard-key keyboard-key--in-word';
  }

  if (guesses.join('').includes(key)) {
    return 'keyboard-key keyboard-key--guessed';
  }

  return 'keyboard-key';
}

export default function Keyboard({
  guesses,
  correctGuesses,
  inWordGuesses,
  handleKeyDown
}) {
  return (
    <div className="keyboard-container">
      {keys.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key, keyIndex) => (
            <button
              className={getKeyClass(guesses, key, correctGuesses, inWordGuesses)}
              key={keyIndex}
              onClick={() => handleKeyDown({key})}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
