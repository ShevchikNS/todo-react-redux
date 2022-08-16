import React from 'react';
import  {useState} from "react";
import {Button, TextField} from "@mui/material";

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
    return (
        <div className="todoItems">
            {
                isEditMode ?
                    <TextField
                        required
                        className = "todoItem"
                        id="outlined-required"
                        label="Edit"
                        value={editedTodoName}
                        onChange={changeTodoName}
                    />
                    :
                    <TextField
                        disabled
                        className = "todoItem"
                        id="outlined-disabled"
                        value= {item}
                    />

            }
            <div className="DeleteEditButton">
                {
                    isEditMode ?
                        <Button className="EditButton" variant="outlined" color = "success" onClick={disableEditMode}>
                            Save
                        </Button>
                        :
                        <>
                            <Button className="EditButton" variant="outlined" onClick={enableEditMode}>
                                Edit
                            </Button>
                            <Button className="DeleteButton" id="DeleteButton" variant="contained" onClick={onDelete}>
                                Delete
                            </Button>
                        </>


                }

            </div>

        </div>
    );
};

export default TodoItemComponent;