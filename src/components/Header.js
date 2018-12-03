import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
    const { title, subtitle } = props;
    return (
        <React.Fragment>
            <h1 className="Component_Header-title">{title}</h1>
            {subtitle && <span className="Component_Header-subtitle">{subtitle}</span>}
        </React.Fragment>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

Header.defaultProps = {
    subtitle: null
};

export default Header;
