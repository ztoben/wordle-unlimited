import React, { useState } from 'react';
import Help from '../icons/help.svg';
import Refresh from '../icons/refresh.svg';
import Settings from '../icons/settings.svg';
import Stats from '../icons/stats.svg';
import HelpModal from './HelpModal';
import './Header.css';
import SettingsModal from './SettingsModal';

export default function Header({ resetGame }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <header className="App-header">
      <div className="App-icon-container">
        <img src={Help} alt="help" width={24} onClick={toggleHelp} />
        <img src={Refresh} alt="refresh" width={24} onClick={resetGame} />
      </div>
      <h2>WORDLE UNLIMITED</h2>
      <div className="App-icon-container">
        <img
          src={Stats}
          alt="stats"
          width={24}
          onClick={() => alert('Not yet implemented.')}
        />
        <img
          src={Settings}
          alt="settings"
          width={24}
          onClick={toggleSettings}
        />
      </div>
      <HelpModal open={showHelp} onClose={toggleHelp} />
      <SettingsModal open={showSettings} onClose={toggleSettings} />
    </header>
  );
}
