import React from 'react';
import './Tile.css';

function getTileClassName(isCurrentRow, rowHasGuess, word, value, index) {
  if (isCurrentRow) {
    return 'Tile';
  }

  if (value === word[index]) {
    return 'Tile Tile--correct';
  }

  if (word.includes(value)) {
    return 'Tile Tile--in-word';
  }

  if (rowHasGuess) {
    return 'Tile Tile--guessed';
  }

  return 'Tile';
}

export default function Tile({isCurrentRow, index, value, word, rowHasGuess}) {
  return (
    <div className={getTileClassName(isCurrentRow, rowHasGuess, word, value, index)}>
      {value ?? ''}
    </div>
  );
}
