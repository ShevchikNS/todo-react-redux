import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction, removeTodoAction} from "../store/todoReducer";
import {Button, TextField} from "@mui/material";
import TodoItem from "./todoItem-component";

const InputTodoComponent = () => {
    const [newTodo, setNewTodo] = useState('')
    const dispatch = useDispatch()
    const todoItems = useSelector(state => state.todos.todos)

    const changeTodoName = (e) => {
        setNewTodo(e.target.value)
    }

    const addTodoItem = (newTodo) => {
        const todo = {
            newTodo,
            id: Date.now()
        }
        dispatch(addTodoAction(todo))
        setNewTodo('')
    }
    const EditTodo = (indexToEdit, editTodo) => {
        dispatch(editTodoAction(indexToEdit))
    }
    const removeTodoItem = (todoItem,) => {
        dispatch(removeTodoAction(todoItem.id))
    }

    return (
        <div>
            <div className="TodoHeader" >
                <TextField
                    id="outlined-basic"
                    label="Todo"
                    variant="outlined"
                    value={newTodo}
                    onChange={changeTodoName}
                />
                <Button
                    variant="outlined"
                    id="AddButton"
                    onClick={() => addTodoItem(newTodo)}
                >
                    ADD
                </Button>
            </div>
            {
                todoItems.length > 0 ?
                    <div>
                        {
                            todoItems.map((todoItem, index) =>
                                <TodoItem
                                    onDelete={() => removeTodoItem(todoItem)}
                                    onEdit={(editTodo) => {
                                        EditTodo(index,editTodo)
                                    }}
                                    item = {todoItem.newTodo}
                                    key = {index}>
                                </TodoItem>
                            )
                        }
                    </div>
                    : console.log()

            }
        </div>
    );
};

export default InputTodoComponent;