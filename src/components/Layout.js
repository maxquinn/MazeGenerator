import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

function Layout(props) {
    const { children } = props;
    return (
        <div>
            <Header title="Title TBD" />
            <div className="Component_Layout-container">{children[0]}</div>
            <div className="Component_Layout-container">{children[1]}</div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired
};

export default Layout;
