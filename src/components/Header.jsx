import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: 0,
    fontSize: '40px',
    boxSizing: 'content-box',
    border: 'none',
    fontFamily: "'open sans',arial,sans-serif",
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    textOverflow: 'clip',
    textShadow: `3px 3px 0 ${theme.palette.primary.main},
    4px 4px 0 ${theme.palette.primary.main}, 
    5px 5px 0 ${theme.palette.primary.main},
    6px 6px 0 ${theme.palette.primary.main},
    7px 7px 0 ${theme.palette.primary.main},
    8px 8px 0 ${theme.palette.primary.main},
    9px 9px 0 ${theme.palette.primary.main},
    10px 10px 0 ${theme.palette.primary.main},
    11px 11px 0 ${theme.palette.primary.main},
    12px 12px 0 ${theme.palette.primary.main},
    13px 13px 0 ${theme.palette.primary.main},
    14px 14px 0 ${theme.palette.primary.main},
    15px 15px 0 ${theme.palette.primary.main},
    16px 16px 0 ${theme.palette.primary.main},
    17px 17px 0 ${theme.palette.primary.main},
    18px 18px 0 ${theme.palette.primary.main},
    19px 19px 0 ${theme.palette.primary.main},
    20px 20px 0 ${theme.palette.primary.main}`,
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
    textShadow: `3px 3px 0 ${theme.palette.primary.main},
    4px 4px 0 ${theme.palette.primary.main}, 
    5px 5px 0 ${theme.palette.primary.main},
    6px 6px 0 ${theme.palette.primary.main},
    7px 7px 0 ${theme.palette.primary.main},
    8px 8px 0 ${theme.palette.primary.main},
    9px 9px 0 ${theme.palette.primary.main},
    10px 10px 0 ${theme.palette.primary.main},
    11px 11px 0 ${theme.palette.primary.main},
    12px 12px 0 ${theme.palette.primary.main},
    13px 13px 0 ${theme.palette.primary.main},
    14px 14px 0 ${theme.palette.primary.main},
    15px 15px 0 ${theme.palette.primary.main},
    16px 16px 0 ${theme.palette.primary.main},
    17px 17px 0 ${theme.palette.primary.main},
    18px 18px 0 ${theme.palette.primary.main},
    19px 19px 0 ${theme.palette.primary.main},
    20px 20px 0 ${theme.palette.primary.main}`,
  },
}));

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
