import React, {useEffect, useState} from 'react';
import "./todo.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction, removeTodoAction} from "../store/todoReducer";
import {Button, TextField} from "@mui/material";
import TodoItem from "./TodoItem-component";
import {store} from "../store";
import Navbar from "./Navbar";
import {logDOM} from "@testing-library/react";
// import {collection, addDoc} from "firebase/firestore"
// import {db} from "../firebase";

const InputTodoComponent = () => {
    const [todoList, setTodoList] = useState("")
    const [newTodo, setNewTodo] = useState('')
    const currentUser = useSelector(state => state.currentUser.user)
    const currentFolder = useSelector(state => state.currentFolder.folder)
    const dispatch = useDispatch()
    const todoItems = useSelector(state => state.todos.todos).filter(todo => todo.userId === currentUser.userId)
    // setTodoList(todoItems)
    const changeTodoName = (e) => {
        setNewTodo(e.target.value)
    }
    useEffect(() => {
        console.log()
       //TODO create working folders for todo
        if (currentFolder.folderName === "ALL") {
            setTodoList(todoItems)
            console.log("____________________")
            console.log(todoList)
            console.log("____________________")
        } else {
            console.log("++++++++++++++++++++++")
            let filteredItem = todoItems.filter(todo => todo.folderId === currentFolder.folderId)
            setTodoList(filteredItem)
            console.log(todoList)
            console.log("++++++++++++++++++++++")

        }
    }, [currentFolder])
    const handleKeyPressAdd = async (event) => {
        if (event.key === 'Enter') {
            await addTodoItem(newTodo)
        }
    }
    const addTodoItem = async (newTodo) => {
        const todo = {
            id: Date.now(),
            text: newTodo,
            userId: currentUser.userId,
            folderId: currentFolder.folderId
        }
        // await addDoc(collection(db, "todos"), todo)
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
            <Navbar/>
            <div className="TodoHeader">
                <TextField
                    id="layer2"
                    label="Todo"
                    variant="outlined"
                    value={newTodo}
                    multiline
                    size='medium'
                    onChange={changeTodoName}
                    onKeyPress={(e) => handleKeyPressAdd(e)}
                />
                <Button
                    variant="outlined"
                    id="AddButton"
                    onClick={async () => {
                        await addTodoItem(newTodo)
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