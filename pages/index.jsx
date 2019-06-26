import React from 'react';
import ControlPanel from '../src/components/ControlPanel';
import Game from '../src/components/Game';
import LoadStateWrapper from '../src/components/LoadStateWrapper';

function Index() {
  return (
    <LoadStateWrapper>
      <div>
        <Game />
        <ControlPanel navigationValue="/" />
      </div>
    </LoadStateWrapper>
  );
}

export default Index;
