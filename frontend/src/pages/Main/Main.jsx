import React from 'react';
import { Grid } from '@material-ui/core';
import { FlexContainer } from '../../shared/container-styles';
import {
    OutboundBodyText,
    MainHeaderText,
    InboundBodyText,
    Container,
    Dot
} from './main-styles';

const Main = (props) => {
    const { outbound, inbound } = props;

    return (
        <Container>
            <Grid container spacing={1} style={{ height: '100%' }}>
                <Grid
                    item
                    md={9}
                    style={{
                        borderRight: '5px solid black'
                    }}
                >
                    <FlexContainer
                        direction="column"
                        alignItems="center"
                        padding="0 2rem"
                    >
                        <MainHeaderText variant="h1">OUTBOUND</MainHeaderText>
                        <Grid
                            container
                            spacing={0}
                            justify="flex-start"
                            style={{ padding: '0 10rem' }}
                        >
                            {outbound.length > 0 &&
                                outbound.map(({ _id, amzl, door }) => (
                                    <Grid
                                        id="grid for ob"
                                        container
                                        item
                                        xs={6}
                                        key={_id}
                                        justify="center"
                                    >
                                        <FlexContainer
                                            justify="space-between"
                                            id="text"
                                            width="480px"
                                        >
                                            <OutboundBodyText variant="body1">
                                                {amzl}
                                            </OutboundBodyText>
                                            <OutboundBodyText
                                                color="primary"
                                                variant="body1"
                                            >
                                                {door}
                                            </OutboundBodyText>
                                        </FlexContainer>
                                    </Grid>
                                ))}
                        </Grid>
                    </FlexContainer>
                </Grid>

                <Grid item md={3}>
                    <FlexContainer direction="column" alignItems="center">
                        <MainHeaderText variant="h1">INBOUND</MainHeaderText>
                        <Grid container spacing={1}>
                            {inbound.length > 0 &&
                                inbound
                                    .slice(0, 5)
                                    .map(({ _id, door }, index) => (
                                        <Grid
                                            container
                                            item
                                            direction="column"
                                            key={_id}
                                            alignItems="center"
                                        >
                                            <FlexContainer
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <InboundBodyText variant="body1">
                                                    {door}
                                                </InboundBodyText>
                                                <Dot
                                                    visibility={
                                                        index === 0
                                                            ? 'visible'
                                                            : 'hidden'
                                                    }
                                                />
                                            </FlexContainer>
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
