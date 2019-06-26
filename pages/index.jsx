import React from 'react';
import ControlPanel from '../src/components/ControlPanel';
import Game from '../src/components/Game';

function Index() {
  return (
    <div>
      <Game />
      <ControlPanel navigationValue="/" />
    </div>
  );
}

export default Index;
