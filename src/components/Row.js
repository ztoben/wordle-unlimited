import React from 'react';
import Tile from './Tile';
import './Row.css';

export default function Row({index, guesses, guess, word}) {
  const isCurrentRow = index === guesses.length;

  return (
    <div className="Row">
      {[...Array(5)].map((_, i) => (
        <Tile
          key={i}
          index={i}
          value={isCurrentRow ? guess?.[i] : guesses?.[index]?.[i]}
          isCurrentRow={isCurrentRow}
          rowHasGuess={!!guesses?.[index]}
          word={word}
        />
      ))}
    </div>
  );
}
