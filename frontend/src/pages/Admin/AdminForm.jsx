import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { FlexContainer, FlexItem } from '../../shared/container-styles';
import { InputGroup, Input, MyPaper } from './admin-styles';
import { TextField, Typography, IconButton } from '@material-ui/core';

const AdminForm = ({ formType, setData, currentData, setCurrentData }) => {
    const [canEdit, setCanEdit] = useState([]);
    const [canAdd, setCanAdd] = useState(true);
    const [currentEditItem, setCurrentEditItem] = useState(-1);
    const [error, setError] = useState([]);
    useEffect(() => {
        // console.log('cb len ' + currentData.length);
        setCanAdd(true);
        if (currentData.length < currentEditItem) setCurrentEditItem(-1);
        if (currentData.length > 0) {
            setCanEdit((prev) =>
                [...Array(currentData.length).keys()].map((_, index) => {
                    return index === currentEditItem ? prev[index] : false;
                })
            );
            setError((prev) =>
                prev.length === 0
                    ? [...Array(currentData.length).keys()].map((_) => {
                          return { amzl: false, door: false };
                      })
                    : [...Array(currentData.length).keys()].map((_, index) => {
                          if (
                              prev[index] &&
                              (prev[index].amzl || prev[index].door)
                          )
                              setCanAdd(false);
                          return prev[index]
                              ? prev[index]
                              : { amzl: false, door: false };
                      })
            );
        }
    }, [currentData.length, currentEditItem]);

    const inputChangeHandler = (value, property, index) => {
        setCurrentData((prev) => {
            let newData = [...prev];
            newData[index][property] = value;
            return newData;
        });
    };

    const deleteHandler = (id, index) => {
        const deleteLogic = () => {
            setCurrentData((prev) => {
                // console.log('delete ' + id);
                const newData = prev.filter((ob) => ob._id !== id);
                setData(newData);
                // console.log(newData.length);
                if (newData.length === 0) setCanAdd(true);
                return newData;
            });
            if (index === currentData.length - 1) setCanAdd(true);
        };
        if (index === currentEditItem) {
            setCurrentEditItem(-1);
        } else {
            if (currentEditItem >= 0 && currentEditItem !== index)
                doneEditingHandler(null, currentEditItem);
            if (currentEditItem >= 0 && error[currentEditItem]) {
                const { amzl, door } = error[currentEditItem];
                console.log('edit error ' + error[currentEditItem]);
                if (
                    (formType === 'outbound' && (amzl || door)) ||
                    (formType === 'inbound' && door)
                )
                    return;
            }
        }
        // console.log('delete index ' + index);
        // console.log(currentData[index]);
        if (currentData[index].isTemp) return deleteLogic();
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/${formType}/${id}`
            )
            .then(() => {
                console.log('delete success');
            });
    };

    const doneEditingHandler = (event, index) => {
        console.log(currentEditItem);
        if (event) event.preventDefault();
        if (!currentData[index]) return;
        // console.log('Submit ' + index);
        // console.log('done index ' + index);
        // console.log(currentData[index]);
        let { _id, amzl, door, isTemp } = currentData[index];
        const requestUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/${formType}`;
        const postData =
            formType === 'outbound'
                ? { amzl: amzl, door: door }
                : { door: door };
        const putData = { ...postData, id: _id };

        if (amzl) amzl = amzl.trim();
        if (door) door = door.trim();

        if (
            (formType === 'outbound' && (!amzl || !door)) ||
            (formType === 'inbound' && !door)
        ) {
            setError((prev) => {
                const newError = [...prev];
                // console.log('new error ' + newError);
                // console.log('error index ' + index);
                newError[index].amzl = formType === 'outbound' && !amzl;
                newError[index].door = !door;
                return newError;
            });
            return;
        }
        setCurrentEditItem(-1);
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            newCanEdits[index] = false;
            return newCanEdits;
        });

        setError((prev) => {
            const newError = [...prev];
            newError[index] = { amzl: false, door: false };
            return newError;
        });
        if (isTemp) {
            axios
                .post(requestUrl, postData)
                .then(() => {
                    setCanAdd(true);
                    if (index === currentData.length - 1) {
                        setCanAdd(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .put(requestUrl, putData)
                .then(() => {
                    // setData(currentData);
                    setCanAdd(true);
                    if (index === currentData.length - 1) setCanAdd(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // Handles setting the current edit item to the clicked item, toggles the new edit item to be editable and submits the previous
    // item that was being edited
    const editHandler = (event, index) => {
        if (event) event.preventDefault();
        // console.log('Editing');
        console.log('previous edit item ' + currentEditItem);
        if (currentEditItem >= 0 && currentEditItem !== index)
            doneEditingHandler(event, currentEditItem);
        if (currentEditItem >= 0 && error[currentEditItem]) {
            const { amzl, door } = error[currentEditItem];
            console.log('edit error ' + error[currentEditItem]);
            if (
                (formType === 'outbound' && (amzl || door)) ||
                (formType === 'inbound' && door)
            )
                setCanAdd(false);
            return;
        }
        setOnlyEdits(index);
    };

    // Logic for editHandler without submitting the previous value
    const setOnlyEdits = (index) => {
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            if (currentEditItem >= 0 && currentEditItem !== index) {
                newCanEdits[currentEditItem] = false;
            }
            setCurrentEditItem(index);
            newCanEdits[index] = true;
            return newCanEdits;
        });
    };

    const addEntryHandler = () => {
        console.log(currentEditItem);
        if (currentEditItem >= 0) doneEditingHandler(null, currentEditItem);
        setCanAdd(false);
        if (currentEditItem >= 0 && error[currentEditItem]) {
            const { amzl, door } = error[currentEditItem];
            console.log('edit error ' + error[currentEditItem]);
            if (
                (formType === 'outbound' && (amzl || door)) ||
                (formType === 'inbound' && door)
            )
                return;
        }
        setOnlyEdits(canEdit.length);
        setCurrentEditItem(canEdit.length);
        setCurrentData((prev) => {
            let newData = [...prev];
            newData.push({
                _id: `${Math.random() * 10}${canEdit.length}`,
                amzl: '',
                door: '',
                isTemp: true
            });
            return newData;
        });
        // console.log('can edit len ' + canEdit.length);
    };

    return (
        <FlexContainer direction="column">
            <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
                {formType}
            </Typography>
            <FlexItem flexGrow="2">
                <MyPaper>
                    {currentData.length > 0 &&
                        currentData.map(({ _id, amzl, door }, index) => {
                            return (
                                <form key={_id}>
                                    <InputGroup>
                                        {formType === 'outbound' && (
                                            <Input
                                                flexGrow="3"
                                                flexBasis="100%"
                                            >
                                                <TextField
                                                    error={
                                                        error[index] &&
                                                        error[index].amzl
                                                    }
                                                    helperText={
                                                        error[index] &&
                                                        error[index].amzl
                                                            ? 'Must not be empty'
                                                            : null
                                                    }
                                                    disabled={!canEdit[index]}
                                                    label="Delivery Station"
                                                    value={amzl}
                                                    onClick={(event) =>
                                                        !canEdit[index] &&
                                                        editHandler(
                                                            event,
                                                            index
                                                        )
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
                                        )}
                                        <Input flexGrow="3" flexBasis="100%">
                                            <TextField
                                                error={
                                                    error[index] &&
                                                    error[index].door
                                                }
                                                helperText={
                                                    error[index] &&
                                                    error[index].door
                                                        ? 'Must not be empty'
                                                        : null
                                                }
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
                                                onClick={() =>
                                                    deleteHandler(_id, index)
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

export default AdminForm;
