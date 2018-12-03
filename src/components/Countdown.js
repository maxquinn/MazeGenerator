import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Countdown extends React.PureComponent {
    render() {
        const { s } = this.props;
        return (
            <div className="Component_Countdown-container">
                <Header title="Game starting in" subtitle={s} />
            </div>
        );
    }
}

Countdown.propTypes = {
    s: PropTypes.string.isRequired
};

export default Countdown;
