import React, {useState} from 'react';
import "./todo.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction, removeTodoAction} from "../store/todoReducer";
import {Button, TextField} from "@mui/material";
import TodoItem from "./todoItem-component";
import {store} from "../store";

const InputTodoComponent = () => {

    const [newTodo, setNewTodo] = useState('')
    const dispatch = useDispatch()
    const todoItems = useSelector(state => state.todos.todos)

    const changeTodoName = (e) => {
        setNewTodo(e.target.value)
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            addTodoItem(newTodo)
        }
    }
    const addTodoItem = (newTodo) => {
        const todo = {
            id: Date.now(),
            text: newTodo
        }
        dispatch(addTodoAction(todo))
        setNewTodo('')
        saveInLocalStorage()
    }

    const saveInLocalStorage = () => {
        localStorage.setItem('todoItems', JSON.stringify(store.getState().todos.todos))
    }
    const EditTodo = (indexToEdit, editTodo) => {
        dispatch(editTodoAction(indexToEdit, editTodo))
        saveInLocalStorage()
    }
    const removeTodoItem = (todoItem) => {
        dispatch(removeTodoAction(todoItem.id))
        saveInLocalStorage()
    }

    return (
        <div>
                <div className="TodoHeader">
                    <TextField
                        id="outlined-basic"
                        label="Todo"
                        variant="outlined"
                        value={newTodo}
                        size = 'medium'
                        onChange={changeTodoName}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                    <Button
                        variant="outlined"
                        id="AddButton"
                        onClick={() => {
                            addTodoItem(newTodo)
                        }}>
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
                                        EditTodo(index, editTodo)
                                    }}
                                    item={todoItem.text}
                                    key={index}>
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