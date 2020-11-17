import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const validUrls = ['/', '/admin'];
    if (location.pathname === '/login') return null;
    return (
        <AppBar position="static">
            <Tabs
                value={location.pathname}
                onChange={() => console.log(location.pathname)}
                indicatorColor="primary"
                style={{ backgroundColor: '#232f3e' }}
            >
                <Tab
                    label="Main"
                    value={validUrls[0]}
                    component={Link}
                    to="/"
                />
                <Tab
                    label="Admin"
                    value={validUrls[1]}
                    component={Link}
                    to="/admin"
                />
            </Tabs>
        </AppBar>
    );
};

export default Navbar;
