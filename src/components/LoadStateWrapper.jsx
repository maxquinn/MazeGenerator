import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GlobalContext from './GlobalContext';

const useStyles = makeStyles({
  loadingIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const LoadStateWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const { settings, dispatch } = useContext(GlobalContext);
  const classes = useStyles();

  useEffect(() => {
    const state = localStorage.getItem('state');
    if (state) dispatch({ type: 'LOAD_STATE', payload: JSON.parse(state) });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('state', JSON.stringify(settings));
  }, [settings]);
  return (
    <>
      {loaded ? (
        { ...children }
      ) : (
        <div className={classes.loadingIcon}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

LoadStateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LoadStateWrapper as default };
