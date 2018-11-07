import React from 'react';

const GameContext = React.createContext();

class Loop extends React.Component {
    render() {
        return (
            <GameContext.Provider loop={/*somefuction*/}>{this.props.children}</GameContext.Provider>
        );
    }
}

export default Loop;
