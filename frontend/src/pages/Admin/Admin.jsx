import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Inbound from './Inbound';
import Outbound from './Outbound';

const Admin = (props) => {
    const { outbound, inbound, setOutbound, setInbound } = props;
    const [currentOutbound, setCurrentOutbound] = useState([]);
    const [currentInbound, setCurrentInbound] = useState([]);

    useEffect(() => {
        setCurrentInbound(inbound);
        setCurrentOutbound(outbound);
    }, [inbound, outbound]);

    return (
        <Container
            maxWidth="xl"
            style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
        >
            <Grid container spacing={4} justify="center">
                <Grid container item md={7}>
                    <Outbound
                        setOutbound={setOutbound}
                        currentOutbound={currentOutbound}
                        setCurrentOutbound={setCurrentOutbound}
                    />
                </Grid>

                <Grid container item md={5}>
                    <Inbound
                        setInbound={setInbound}
                        currentInbound={currentInbound}
                        setCurrentInbound={setCurrentInbound}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Admin;
