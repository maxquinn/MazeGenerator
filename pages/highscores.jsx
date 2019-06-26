import React from 'react';
import LoadStateWrapper from '../src/components/LoadStateWrapper';
import ControlPanel from '../src/components/ControlPanel';

function Highscores() {
  return (
    <LoadStateWrapper>
      <div>
        <div>Highscores</div>
        <ControlPanel navigationValue="/highscores" />
      </div>
    </LoadStateWrapper>
  );
}

export default Highscores;
