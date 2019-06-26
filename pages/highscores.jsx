import ControlPanel from '../src/components/ControlPanel';

function Highscores() {
  return (
    <div>
      <div>Highscores</div>
      <ControlPanel navigationValue="/highscores" />
    </div>
  );
}

Highscores.getInitialProps = async ({ req }) => {
  console.log(req);
};

export default Highscores;
