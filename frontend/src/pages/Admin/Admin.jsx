import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminForm from './AdminForm';

const Admin = (props) => {
    const {
        password,
        correctPassword,
        outbound,
        inbound,
        setOutbound,
        setInbound
    } = props;
    const [currentOutbound, setCurrentOutbound] = useState([]);
    const [currentInbound, setCurrentInbound] = useState([]);
    const history = useHistory();

    if (correctPassword !== password) {
        history.push('/login');
    }

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
                    <AdminForm
                        formType="outbound"
                        setData={setOutbound}
                        currentData={currentOutbound}
                        setCurrentData={setCurrentOutbound}
                    />
                </Grid>

                <Grid container item md={5}>
                    <AdminForm
                        formType="inbound"
                        setData={setInbound}
                        currentData={currentInbound}
                        setCurrentData={setCurrentInbound}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Admin;
