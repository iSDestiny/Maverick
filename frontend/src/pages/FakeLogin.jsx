import { Button, Container, Paper, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { FlexContainer } from '../shared/container-styles';

const FakeLogin = ({ correctPassword, password, setPassword }) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const history = useHistory();
    const submitHandler = (event) => {
        event.preventDefault();
        if (correctPassword === password) {
            setIsInvalid(false);
            history.push('/admin');
        } else {
            setIsInvalid(true);
        }
    };
    return (
        <Container style={{ marginTop: '3rem', padding: '0 30rem' }}>
            <Paper>
                <form>
                    <FlexContainer
                        direction="column"
                        justify="center"
                        alignItems="center"
                        height="50vh"
                    >
                        <TextField
                            type="password"
                            error={isInvalid}
                            helperText={isInvalid && 'Invalid password'}
                            label="Password"
                            variant="outlined"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ width: '14rem', marginTop: '5px' }}
                            onClick={(event) => submitHandler(event)}
                        >
                            Submit
                        </Button>
                    </FlexContainer>
                </form>
            </Paper>
        </Container>
    );
};

export default FakeLogin;
