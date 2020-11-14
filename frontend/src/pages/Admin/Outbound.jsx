import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { FlexContainer, FlexItem } from '../../shared/container-styles';
import { InputGroup, Input, MyPaper } from './admin-styles';
import { TextField, Typography, IconButton } from '@material-ui/core';

const Outbound = ({ currentOutbound, setCurrentOutbound }) => {
    const [canEdit, setCanEdit] = useState(currentOutbound.map((ob) => false));
    const [canAdd, setCanAdd] = useState(true);

    const inputChangeHandler = (value, property, index) => {
        setCurrentOutbound((prev) => {
            let newOutbound = [...prev];
            newOutbound[index][property] = value;
            return newOutbound;
        });
    };

    const deleteHandler = (id, index) => {
        setCurrentOutbound((prev) => {
            console.log(id);
            return prev.filter((ob) => ob.id !== id);
        });
        if (index === currentOutbound.length - 1) setCanAdd(true);
    };

    const doneEditingHandler = (event, index) => {
        event.preventDefault();
        console.log('Submit');
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            newCanEdits[index] = false;
            return newCanEdits;
        });
        if (index === currentOutbound.length - 1) setCanAdd(true);
    };

    const editHandler = (event, index) => {
        event.preventDefault();
        console.log('Editing');
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            newCanEdits[index] = true;
            return newCanEdits;
        });
    };

    const addEntryHandler = () => {
        setCurrentOutbound((prev) => {
            let newOutbound = [...prev];
            newOutbound.push({ id: Math.random() * 10, amzl: '', door: '' });
            return newOutbound;
        });
        setCanEdit((prev) => {
            let newCanEdit = [...prev];
            newCanEdit[prev.length] = true;
            return newCanEdit;
        });
        console.log('can edit len ' + canEdit.length);
        setCanAdd(false);
    };

    return (
        <FlexContainer direction="column">
            <Typography variant="h4">Outbound</Typography>
            <FlexItem flexGrow="2">
                <MyPaper>
                    {currentOutbound.map(({ id, amzl, door }, index) => {
                        return (
                            <form key={id}>
                                <InputGroup>
                                    <Input flexGrow="3" flexBasis="100%">
                                        <TextField
                                            disabled={!canEdit[index]}
                                            label="AMZL"
                                            value={amzl}
                                            onClick={(event) =>
                                                !canEdit[index] &&
                                                editHandler(event, index)
                                            }
                                            onChange={(event) =>
                                                inputChangeHandler(
                                                    event.target.value,
                                                    'amzl',
                                                    index
                                                )
                                            }
                                            fullWidth
                                        />
                                    </Input>
                                    <Input flexGrow="3" flexBasis="100%">
                                        <TextField
                                            disabled={!canEdit[index]}
                                            label="Door #"
                                            value={door}
                                            onClick={(event) =>
                                                !canEdit[index] &&
                                                editHandler(event, index)
                                            }
                                            onChange={(event) => {
                                                inputChangeHandler(
                                                    event.target.value,
                                                    'door',
                                                    index
                                                );
                                            }}
                                            fullWidth
                                        />
                                    </Input>
                                    <Input flexGrow="1" style={{ padding: 0 }}>
                                        <IconButton
                                            color="primary"
                                            type="submit"
                                            onClick={
                                                canEdit[index]
                                                    ? (event) =>
                                                          doneEditingHandler(
                                                              event,
                                                              index
                                                          )
                                                    : (event) =>
                                                          editHandler(
                                                              event,
                                                              index
                                                          )
                                            }
                                        >
                                            {canEdit[index] ? (
                                                <DoneIcon />
                                            ) : (
                                                <EditIcon />
                                            )}
                                        </IconButton>
                                    </Input>
                                    <Input flexGrow="1" style={{ padding: 0 }}>
                                        <IconButton
                                            color="secondary"
                                            onClick={() =>
                                                deleteHandler(id, index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Input>
                                </InputGroup>
                            </form>
                        );
                    })}
                    <FlexContainer justify="center" style={{}}>
                        <IconButton
                            color="primary"
                            onClick={addEntryHandler}
                            disabled={!canAdd}
                        >
                            <AddIcon />
                        </IconButton>
                    </FlexContainer>
                </MyPaper>
            </FlexItem>
        </FlexContainer>
    );
};

export default Outbound;
