import React, {useEffect, useMemo, useState} from 'react';
import "./todo.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction, fetchTodos, removeTodoAction, } from "../store/todoReducer";
import {Button, TextField} from "@mui/material";
import TodoItem from "./TodoItem-component";
import Navbar from "./Navbar";
import {collection, addDoc, deleteDoc, doc, getDocs} from "firebase/firestore"
import {db} from "../firebase";


const InputTodoComponent = () => {
        const dispatch = useDispatch()
        const [newTodo, setNewTodo] = useState('')
        if (localStorage.getItem("todoItems") === null || localStorage.getItem("todoItems") === undefined)
            localStorage.setItem('todoItems', '[]');
        const todoList = useSelector(state => state.todos.todos)
        const currentUser = useSelector(state => state.currentUser.user)
        const currentFolder = useSelector(state => state.currentFolder.folder)



        const changeTodoName = (e) => {
            setNewTodo(e.target.value)
        }

        const handleKeyPressAdd = async (event) => {
            if (event.key === 'Enter') {
                await addTodoItem(newTodo)
            }
        }
        const addTodoItem = async (newTodo) => {
            const todo = {
                todoId: `${Date.now()}`,
                text: newTodo,
                userId: currentUser.userId,
                folderId: currentFolder.folderId
            }
            await addDoc(collection(db, "todos"), todo)
            //todoList.push(todo)
            dispatch(addTodoAction(todo))
            setNewTodo('')
        }

        const saveInLocalStorage = (todo) => {
            if (localStorage.getItem("todoItems") == null)
                localStorage.setItem('todoItems', '[]');
            else
                localStorage.setItem('todoItems', JSON.stringify(todo))
        }
        const EditTodo =  async (indexToEdit, editTodo) => {


            dispatch(editTodoAction(indexToEdit, editTodo))
            saveInLocalStorage(todoList.map((todo, index) => {
                if (index === indexToEdit) {
                    return {
                        id: `${todo.id}`,
                        text: editTodo,
                        userId: todo.userId,
                        folderId: todo.folderId
                    }
                }
                return todo
            }))


        }


        const removeTodoItem = async (todoItem) => {
            let currentTodo = "";
            const querySnapshot = await getDocs(collection(db, "todos"));
            querySnapshot.forEach((doc) => {
                    if (`${doc.data().todoId}` === `${todoItem.todoId}`) {
                        currentTodo = doc.id
                    }
                }
            );
            await deleteDoc(doc(db, 'todos', `${currentTodo}`))
            dispatch(removeTodoAction(todoItem.id))
            saveInLocalStorage(todoList.filter(todo => todo.id !== todoItem.id))
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
                    todoList.length > 0 ?
                        <div>
                            {
                                todoList.map((todoItem, index) =>
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
    }
;

export default InputTodoComponent;