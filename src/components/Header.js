import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
    const { title } = props;
    return <h1 className="Component_Header-title">{title}</h1>;
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
