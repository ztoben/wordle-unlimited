import React from 'react';
import Modal from './Modal';
import './SettingsModal.css';

export default function SettingsModal({open, onClose}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Settings"
    >
      <div className="Settings-modal--content">
        <ul>
          <li>
            Settings will be added over time :)
          </li>
          <li>
            Feedback
            <div>
              <a href="https://twitter.com/ztoben">Twitter</a> | <a href="https://github.com/ztoben">GitHub</a>
            </div> 
          </li>
        </ul>
      </div>
    </Modal>
  );
}
