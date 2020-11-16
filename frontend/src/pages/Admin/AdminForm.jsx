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

    useEffect(() => {
        console.log('cb len ' + currentData.length);
        if (currentData.length > 0) {
            setCanEdit(
                [...Array(currentData.length).keys()].map((_, index) => {
                    // return index === currentOutbound.length - 1;
                    return index === currentEditItem;
                })
            );
            // setCurrentEditItem(currentOutbound.length - 1);
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
                console.log('delete ' + id);
                const newData = prev.filter((ob) => ob._id !== id);
                setData(newData);
                return newData;
            });
            if (index === currentData.length - 1) setCanAdd(true);
        };

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
        event.preventDefault();
        console.log('Submit ' + index);
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            newCanEdits[index] = false;
            return newCanEdits;
        });

        const { _id, amzl, door, isTemp } = currentData[index];
        const requestUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/${formType}`;
        const postData =
            formType === 'outbound'
                ? { amzl: amzl, door: door }
                : { door: door };
        const putData = { ...postData, id: _id };

        if (isTemp) {
            axios
                .post(requestUrl, postData)
                .then(({ data }) => {
                    setData(currentData);
                    setCurrentData((prev) => {
                        const newCurr = [...prev];
                        newCurr[index] = data[formType];
                        return newCurr;
                    });
                    if (index === currentData.length - 1) setCanAdd(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .put(requestUrl, putData)
                .then(() => {
                    setData(currentData);
                    if (index === currentData.length - 1) setCanAdd(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const editHandler = (event, index) => {
        event.preventDefault();
        console.log('Editing');
        setCanEdit((prev) => {
            let newCanEdits = [...prev];
            if (currentEditItem >= 0) newCanEdits[currentEditItem] = false;
            setCurrentEditItem(index);
            newCanEdits[index] = true;
            return newCanEdits;
        });
    };

    const addEntryHandler = () => {
        setCurrentEditItem(canEdit.length);
        setCurrentData((prev) => {
            let newData = [...prev];
            newData.push({
                _id: Math.random() * 10,
                amzl: '',
                door: '',
                isTemp: true
            });
            return newData;
        });
        console.log('can edit len ' + canEdit.length);
        setCanAdd(false);
    };

    return (
        <FlexContainer direction="column">
            <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
                {formType}
            </Typography>
            <FlexItem flexGrow="2">
                <MyPaper>
                    {currentData &&
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
