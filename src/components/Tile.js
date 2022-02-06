import React, {useEffect} from 'react';
import { motion, useAnimation } from "framer-motion"
import './Tile.css';

function getTileClassName(isCurrentRow, rowHasGuess, word, value, index) {
  if (isCurrentRow) {
    return 'Tile Tile--current-row';
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
  const controls = useAnimation();
  const FLIP_DURATION = 0.75;

  useEffect(() => {
    if (isCurrentRow && value) {
      controls.start({
        scale: [1.1, 1],
        transition: { duration: 0.1, ease: "easeInOut" },
      })
    }

    if (!isCurrentRow && value) {
      controls.start({
        rotateX: 360,
        transition: { duration: FLIP_DURATION, delay: (.2 * index) },
      })
    }
  }, [controls, index, isCurrentRow, value]);

  return (
    <motion.div
      className={getTileClassName(isCurrentRow, rowHasGuess, word, value, index)}
      animate={controls}
      initial={false}
    >
      {value ?? ''}
    </motion.div>
  );
}
