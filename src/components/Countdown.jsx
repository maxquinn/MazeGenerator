import PropTypes from 'prop-types';
import Header from './Header';

function Countdown({ s }) {
  return (
    <div className="Component_Countdown-container">
      <Header title="Game starting in" subtitle={s} />
    </div>
  );
}

Countdown.propTypes = {
  s: PropTypes.string.isRequired,
};

export default Countdown;
