import React from 'react';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
  return (
    <>
      <h1 className="Component_Header-title">{title}</h1>
      {subtitle && <span className="Component_Header-subtitle">{subtitle}</span>}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Header.defaultProps = {
  subtitle: null,
};

export default Header;
