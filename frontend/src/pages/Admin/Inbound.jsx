import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, TextField, Typography } from '@material-ui/core';
import { FlexContainer, FlexItem } from '../../shared/container-styles';
import { InputGroup, Input, MyPaper } from './admin-styles';

const Inbound = ({ setInbound, currentInbound, setCurrentInbound }) => {
    const [canEdit, setCanEdit] = useState([]);
    const [canAdd, setCanAdd] = useState(true);

    useEffect(() => {
        if (currentInbound) setCanEdit(currentInbound.map((ib) => false));
    }, [currentInbound]);

    const inputChangeHandler = (value, index) => {
        setCurrentInbound((prev) => {
            let newInbound = [...prev];
            newInbound[index].door = value;
            return newInbound;
        });
    };

    const deleteHandler = (id, index) => {
        setCurrentInbound((prev) => {
            console.log(id);
            return prev.filter((ib) => ib.id !== id);
        });
        setCurrentInbound((prev) => {
            console.log(id);
            return prev.filter((ib) => ib.id !== id);
        });
        if (index === currentInbound.length - 1) setCanAdd(true);
        setCanEdit((prev) => {
            return prev.filter((ce, ceIndex) => ceIndex !== index);
        });
    };

    const doneEditingHandler = (event, index) => {
        event.preventDefault();
        console.log('Submit');
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            newCanEdits[index] = false;
            return newCanEdits;
        });
        setInbound((prev) => {
            return currentInbound;
        });
        if (index === currentInbound.length - 1) setCanAdd(true);
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
        setCurrentInbound((prev) => {
            let newInbound = [...prev];
            newInbound.push({ id: Math.random() * 10, door: '' });
            return newInbound;
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
            <Typography variant="h4">Inbound</Typography>
            <FlexItem flexGrow="2">
                <MyPaper>
                    {currentInbound &&
                        currentInbound.map(({ id, door }, index) => {
                            return (
                                <form key={id}>
                                    <InputGroup>
                                        <Input flexGrow="3" flexBasis="100%">
                                            <TextField
                                                disabled={!canEdit[index]}
                                                label="Door #"
                                                value={door}
                                                fullWidth
                                                onClick={(event) =>
                                                    !canEdit[index] &&
                                                    editHandler(event, index)
                                                }
                                                onChange={(event) =>
                                                    inputChangeHandler(
                                                        event.target.value,
                                                        index
                                                    )
                                                }
                                            />
                                        </Input>
                                        <Input
                                            flexGrow="1"
                                            style={{ padding: 0 }}
                                        >
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
                                        <Input
                                            flexGrow="1"
                                            style={{ padding: 0 }}
                                        >
                                            <IconButton
                                                color="secondary"
                                                aria-label="delete"
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

export default Inbound;
