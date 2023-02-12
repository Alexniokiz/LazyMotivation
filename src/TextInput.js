import './TextInput.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const TextInput = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="text-input-container">
        <input
            type="text"
            placeholder="Url du job de vos rêves ..."
            className="text-input"
        />
        <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faPaperPlane} color='#fff' />
        </button>
    </form>

  );
};

export default TextInput;