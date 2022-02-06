import React from 'react';
import './HelpModal.css';
import Modal from './Modal';
import Row from './Row';

export default function HelpModal({open, onClose}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How to play"
    >
      <div className="Help-modal--content">
        <p>Guess the <b>WORDLE</b> in 6 tries.</p>
        <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

        <hr/>

        <h4>Examples</h4>

        <Row index={0} guesses={['weary']} word="wxxxx" />

        <p>The letter <b>W</b> is in the word and in the correct spot.</p>

        <Row index={0} guesses={['pills']} word="ixxxx" />

        <p>The letter <b>I</b> is in the word but in the wrong spot.</p>

        <Row index={0} guesses={['vague']} word="xxxxx" />

        <p>None of the selected letters are in the word.</p>

        <hr />

        <p>
          <b>Click the refresh icon in the top left corner to reset your game and get a new word at any time.</b>
        </p>
      </div>
    </Modal>
  );
}
