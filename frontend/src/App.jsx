import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Admin from './pages/Admin';

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
        <div>
            <Admin
                outbound={outbound}
                setOutbound={setOutbound}
                inbound={inbound}
                setInbound={setInbound}
            />
        </div>
    );
}

export default App;
