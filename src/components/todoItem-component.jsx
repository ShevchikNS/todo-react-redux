import React from 'react';
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import Navbar from "./navbar";

const TodoItemComponent = ({item, onDelete, onEdit}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [editedTodoName, setEditedTodoName] = useState(item)

    const changeTodoName = (e) => {
        setEditedTodoName(e.target.value)
    }
    const enableEditMode = () => {
        setIsEditMode(true)
    }
    const disableEditMode = () => {
        setIsEditMode(false)
        onEdit(editedTodoName)
    }
    const handleKeyPressEdit = (event) => {
        if (event.key === 'Enter') {
            disableEditMode()
        }
    }
    return (

            <div className="todoItems">
                {
                    isEditMode ?
                        <TextField
                            required
                            className="todoItem"
                            id="outlined-required"
                            label="Edit"
                            multiline
                            value={editedTodoName}
                            onChange={changeTodoName}
                            onKeyPress={(e) => handleKeyPressEdit(e)}
                        />
                        :
                        <TextField
                            disabled
                            className="todoItem"
                            id="outlined-disabled"
                            multiline
                            value={item}
                        />

                }
                <div className="DeleteEditButton">
                    {
                        isEditMode ?
                            <Button className="EditButton" variant="outlined" color="success" onClick={disableEditMode}>
                                Save
                            </Button>
                            :
                            <>
                                <Button className="EditButton" id="EditButton" variant="outlined"
                                        onClick={enableEditMode}>
                                    Edit
                                </Button>
                                <Button className="DeleteButton" id="DeleteButton" variant="contained"
                                        onClick={onDelete}>
                                    Delete
                                </Button>
                            </>


                    }

                </div>

            </div>
    );
};

export default TodoItemComponent;