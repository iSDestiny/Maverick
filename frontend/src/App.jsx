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
    const [outbound, setOutbound] = useState([
        { id: 1, amzl: 'DSAD', door: '122' },
        { id: 2, amzl: 'DS2A', door: '93' },
        { id: 3, amzl: '2ACC', door: '93' },
        { id: 4, amzl: 'DS11', door: '93' },
        { id: 5, amzl: 'DS11', door: '93' },
        { id: 6, amzl: 'DS11', door: '93' },
        { id: 7, amzl: 'DS11', door: '93' },
        { id: 8, amzl: 'DS11', door: '93' },
        { id: 9, amzl: 'DS11', door: '93' },
        { id: 10, amzl: 'DS11', door: '93' },
        { id: 11, amzl: 'DS11', door: '93' }
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
