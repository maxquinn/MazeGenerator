import React, { useEffect, useContext, useState } from 'react';
import ControlPanel from '../src/components/ControlPanel';
import Game from '../src/components/Game';
import GlobalContext from '../src/components/GlobalContext';

function Index() {
  const { settings, dispatch } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const state = localStorage.getItem('state');
    if (state) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(state) });
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem('state', JSON.stringify(settings));
  }, [settings]);

  return (
    <div>
      <Game />
      <ControlPanel navigationValue="/" />
    </div>
  );
}

export default Index;
