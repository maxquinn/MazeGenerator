import { useState } from 'react';
import ControlPanel from '../src/components/ControlPanel';
import Game from '../src/components/Game';
import '../src/style/style.css';

function Index() {
  const [navigationValue, setNavigationValue] = useState(1);

  function handleNavigationChange(event, value) {
    setNavigationValue(value);
  }

  let componentToRender = null;
  switch (navigationValue) {
    case 0:
      componentToRender = <div className="highscores" />;
      break;
    case 1:
      componentToRender = <Game />;
      break;
    case 2:
      componentToRender = <div className="modes" />;
      break;
    default:
      componentToRender = null;
  }
  return (
    <div>
      {componentToRender}
      <ControlPanel navigationValue={navigationValue} onNavigationChange={handleNavigationChange} />
    </div>
  );
}

export default Index;
