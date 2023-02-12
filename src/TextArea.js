import React, { useState } from 'react';

const TextArea = ({text}) => {
  const [value, setValue] = useState('');

  return (
    <textarea
      value={text}
      style={{
        width: '500px',
        height: 'auto',
        resize: 'vertical',
        overflow: 'auto',
        backgroundColor: 'rgb(68,70,84)'
      }}
    />
  );
};

export default TextArea;