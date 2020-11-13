import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Inbound from './Inbound';
import Outbound from './Outbound';

const Admin = (props) => {
    const { outbound, inbound, setOutbound, setInbound } = props;
    // const [currentOutbound, setCurrentOutbound] = useState(outbound);
    // const [currentInbound, setCurrentInbound] = useState(inbound);

    return (
        <Container
            maxWidth="xl"
            style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
        >
            <Grid container spacing={4} justify="center">
                <Grid container item md={7}>
                    <Outbound
                        currentOutbound={outbound}
                        setCurrentOutbound={setOutbound}
                    />
                </Grid>

                <Grid container item md={5}>
                    <Inbound
                        currentInbound={inbound}
                        setCurrentInbound={setInbound}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Admin;
