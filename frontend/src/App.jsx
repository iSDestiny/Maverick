import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Admin from './pages/Admin';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from './shared/Navbar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff9900',
            contrastText: '#fff'
        }
    }
});

function App() {
    // const buildingCodes = [
    //     'DSF3',
    //     'DSF4',
    //     'DSF5',
    //     'DSF7',
    //     'DSF8',
    //     'DXC5',
    //     'DXC8',
    //     'DCX5',
    //     'DSJ7',
    //     'DFO3',
    //     'DFA5'
    // ];
    const [outbound, setOutbound] = useState([
        { id: 1, amzl: 'DSF3', door: '122' },
        { id: 2, amzl: 'DSF2', door: '93' }
    ]);
    const [inbound, setInbound] = useState([
        { id: 1, door: '222' },
        { id: 2, door: '253' },
        { id: 3, door: '234' }
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Main outbound={outbound} inbound={inbound} />
                </Route>
                <Route path="/admin">
                    <Admin
                        outbound={outbound}
                        setOutbound={setOutbound}
                        inbound={inbound}
                        setInbound={setInbound}
                    />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
