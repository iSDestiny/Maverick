import { Button, Paper, TextField, Typography } from '@material-ui/core';
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
        <FlexContainer
            justify="center"
            style={{ marginTop: '3rem', padding: '0 10rem' }}
        >
            <Paper style={{ maxWidth: '400px', padding: '2rem 3rem' }}>
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}
                >
                    Admin Access
                </Typography>
                <form>
                    <FlexContainer
                        direction="column"
                        justify="center"
                        alignItems="center"
                        height="35vh"
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
        </FlexContainer>
    );
};

export default FakeLogin;
