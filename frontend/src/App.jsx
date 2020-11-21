import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
import Admin from './pages/Admin';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from './shared/Navbar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FakeLogin from './pages/FakeLogin';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff9900',
            contrastText: '#fff'
        }
    }
});

const correctPassword = 'jasoniscool123';

function App() {
    const [outbound, setOutbound] = useState([]);
    const [inbound, setInbound] = useState([]);
    const [password, setPassword] = useState('');

    const addOutbound = (outbound) => {
        console.log('add outbound received socket');
        setOutbound((prev) => {
            let newOutbound = [...prev];
            const found = prev.find((ob) => ob._id === outbound._id);
            if (!found) newOutbound.push(outbound);
            console.log(newOutbound);
            // return newOutbound.filter((ob) => !ob.isTemp);
            return newOutbound;
        });
    };

    const deleteOutbound = (id) => {
        console.log('delete outbound received socket');
        setOutbound((prev) => prev.filter((ob) => ob._id !== id));
    };

    const modifyOutbound = (outbound) => {
        console.log('modify outbound received socket');
        const { _id } = outbound;
        setOutbound((prev) => {
            let newOutbound = [...prev];
            const index = prev.findIndex((ob) => ob._id === _id);
            if (index >= 0) newOutbound[index] = outbound;
            return newOutbound;
        });
    };

    const addInbound = (inbound) => {
        console.log('add inbound received socket');
        setInbound((prev) => {
            let newInbound = [...prev];
            const found = prev.find((ib) => ib._id === inbound._id);
            if (!found) newInbound.push(inbound);
            // return newInbound.filter((ib) => !ib.isTemp);
            return newInbound;
        });
    };

    const deleteInbound = (id) => {
        console.log('delete inbound received socket');
        setInbound((prev) => {
            const result = prev.filter((ib) => ib._id !== id);
            console.log(result);
            return result;
        });
    };

    const modifyInbound = (inbound) => {
        const { _id } = inbound;
        console.log('modify inbound received socket');
        setInbound((prev) => {
            let newInbound = [...prev];
            const index = prev.findIndex((ib) => ib._id === _id);
            if (index >= 0) newInbound[index] = inbound;
            return newInbound;
        });
    };

    const socketOutboundActions = useCallback((socket) => {
        socket.on('outbound', (data) => {
            const { action, outbound } = data;
            switch (action) {
                case 'create':
                    addOutbound(outbound);
                    break;
                case 'modify':
                    modifyOutbound(outbound);
                    break;
                case 'delete':
                    deleteOutbound(outbound._id);
                    break;
                default:
                    console.log('Action is not valid');
                    return;
            }
        });
    }, []);

    const socketInboundActions = useCallback((socket) => {
        socket.on('inbound', (data) => {
            const { action, inbound } = data;
            switch (action) {
                case 'create':
                    addInbound(inbound);
                    break;
                case 'modify':
                    modifyInbound(inbound);
                    break;
                case 'delete':
                    deleteInbound(inbound._id);
                    break;
                default:
                    console.log('Action is not valid');
                    return;
            }
        });
    }, []);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BACKEND_DOMAIN + '/main')
            .then((res) => {
                const { inbounds, outbounds } = res.data;
                setOutbound(outbounds);
                setInbound(inbounds);
            })
            .catch((err) => {
                console.log(err);
            });
        const socket = openSocket(process.env.REACT_APP_BACKEND_DOMAIN);
        socketOutboundActions(socket);
        socketInboundActions(socket);
    }, [socketOutboundActions, socketInboundActions]);

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Main outbound={outbound} inbound={inbound} />
                </Route>

                <Route path="/admin">
                    <Admin
                        correctPassword={correctPassword}
                        password={password}
                        outbound={outbound}
                        setOutbound={setOutbound}
                        inbound={inbound}
                        setInbound={setInbound}
                    />
                </Route>
                <Route path="/login">
                    <FakeLogin
                        correctPassword={correctPassword}
                        password={password}
                        setPassword={setPassword}
                    />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
