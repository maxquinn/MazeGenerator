import ControlPanel from '../src/components/ControlPanel';
import Header from '../src/components/Header';

function Highscores() {
  return (
    <div>
      <Header title="Highscores" />
      <ControlPanel navigationValue="/highscores" />
    </div>
  );
}

export default Highscores;
