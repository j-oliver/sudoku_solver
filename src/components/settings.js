import React from 'react';

function Settings(props) {
  return (
    <div className='settings'>
      {
        ['Easy', 'Medium', 'Hard', 'Extreme'].map(d =>
          (<div
            key={d}
            className={`setting ${props.difficulty === d.toLowerCase() ? 'selected' : ''}`}
            onClick={() => props.setDifficulty(d)}>{d}
          </div>)
        )
      }
    </div>
  );
}

export default Settings;