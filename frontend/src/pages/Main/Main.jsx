import React from 'react';
import { Grid } from '@material-ui/core';
import { FlexContainer } from '../../shared/container-styles';
import {
    OutboundBodyText,
    MainHeaderText,
    DoorText,
    InboundBodyText,
    Container,
    Dot
} from './main-styles';

const Main = (props) => {
    const { outbound, inbound } = props;
    return (
        <Container>
            <Grid container spacing={4} style={{ height: '100%' }}>
                <Grid item md={7} style={{ borderRight: '4px solid black' }}>
                    <FlexContainer direction="column" alignItems="center">
                        <MainHeaderText variant="h1">OUTBOUND</MainHeaderText>
                        <Grid container spacing={3}>
                            {outbound &&
                                outbound.map(({ id, amzl, door }) => (
                                    <Grid
                                        container
                                        item
                                        xs={6}
                                        key={id}
                                        justify="center"
                                    >
                                        <OutboundBodyText variant="body1">
                                            {amzl} <DoorText>{door}</DoorText>
                                        </OutboundBodyText>
                                    </Grid>
                                ))}
                        </Grid>
                    </FlexContainer>
                </Grid>

                <Grid item md={5}>
                    <FlexContainer direction="column" alignItems="center">
                        <MainHeaderText variant="h1">INBOUND</MainHeaderText>
                        <Grid container spacing={1}>
                            {inbound &&
                                inbound
                                    .slice(0, 5)
                                    .map(({ id, door }, index) => (
                                        <Grid
                                            container
                                            item
                                            direction="column"
                                            key={id}
                                            alignItems="center"
                                        >
                                            <InboundBodyText variant="body1">
                                                <FlexContainer
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <span>{door}</span>{' '}
                                                    {index === 0 && <Dot />}
                                                </FlexContainer>
                                            </InboundBodyText>
                                        </Grid>
                                    ))}
                        </Grid>
                    </FlexContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
