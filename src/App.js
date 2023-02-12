import './App.css';

import React, { useState } from "react";

import TextArea from './TextArea';
import TextInput from './TextInput';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [lettre, setLettre] = useState("");
  function onSubmit(event) {
      event.preventDefault();
      console.log(event.target[0].value);
      axios.get('http://localhost:3001/' + /[^/]*$/.exec(event.target[0].value)[0]).then(res => {
        setLettre(res.data);
      });
    }
  
    return (
    <div className="App" style={{backgroundColor: 'rgb(68,70,84)', minHeight: '100vh', paddingTop: '50px' }}>
      <TextInput
        label="First Name"
        onChange={setText}
        onSubmit={onSubmit}
      />
      <p className='LettreMotiv'>{lettre}</p>
    </div>
  );
}

export default App;
