import React from 'react';
import Help from '../icons/help.svg'
import Refresh from '../icons/refresh.svg';
import Settings from '../icons/settings.svg';
import Stats from '../icons/stats.svg';
import './Header.css';

export default function Header({resetGame}) {
  return (
    <header className="App-header">
      <div className="App-icon-container">
        <img src={Help} alt="help" width={24} />
        <img src={Refresh} alt="refresh" width={24} onClick={resetGame} />
      </div>
      <h2>WORDLE UNLIMITED</h2>
      <div className="App-icon-container">
        <img src={Stats} alt="stats" width={24} />
        <img src={Settings} alt="settings" width={24} />
      </div>
    </header>
  );
}
