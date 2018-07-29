import React from 'react';
import Header from './Header';

const Layout = props => (
    <div>
        <Header title="Title TBD" />
        <div className="Component_Layout-container">{props.children[0]}</div>
        <div className="Component_Layout-container Component_Layout-mazeContainer">
            {props.children[1]}
        </div>
    </div>
);

export default Layout;
