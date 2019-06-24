import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  title: {
    fontSize: '40px',
    boxSizing: 'content-box',
    border: 'none',
    fontFamily: "'open sans',arial,sans-serif",
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    textOverflow: 'clip',
    textShadow: '3px 3px 0 #0199d9 , 4px 4px 0 #0199d9 , 5px 5px 0 #0199d9 , 6px 6px 0 #0199d9 , 7px 7px 0 #0199d9 , 8px 8px 0 #0199d9 , 9px 9px 0 #0199d9 , 10px 10px 0 #0199d9 , 11px 11px 0 #0199d9 , 12px 12px 0 #0199d9 , 13px 13px 0 #0199d9 , 14px 14px 0 #0199d9 , 15px 15px 0 #0199d9 , 16px 16px 0 #0199d9 , 17px 17px 0 #0199d9 , 18px 18px 0 #0199d9 , 19px 19px 0 #0199d9 , 20px 20px 0 #0199d9',
  },
  subtitle: {
    fontSize: '27px',
    fontWeight: 'bold',
    boxSizing: 'content-box',
    border: 'none',
    fontFamily: "'open sans',arial,sans-serif",
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    textOverflow: 'clip',
    textShadow: '3px 3px 0 #0199d9 , 4px 4px 0 #0199d9 , 5px 5px 0 #0199d9 , 6px 6px 0 #0199d9 , 7px 7px 0 #0199d9 , 8px 8px 0 #0199d9 , 9px 9px 0 #0199d9 , 10px 10px 0 #0199d9 , 11px 11px 0 #0199d9 , 12px 12px 0 #0199d9 , 13px 13px 0 #0199d9 , 14px 14px 0 #0199d9 , 15px 15px 0 #0199d9 , 16px 16px 0 #0199d9 , 17px 17px 0 #0199d9 , 18px 18px 0 #0199d9 , 19px 19px 0 #0199d9 , 20px 20px 0 #0199d9',
  },
});

function Header({ title, subtitle }) {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.title}>{title}</h1>
      {subtitle && <span className={classes.subtitle}>{subtitle}</span>}
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
