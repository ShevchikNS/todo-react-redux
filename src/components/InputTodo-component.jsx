import React, {useState} from 'react';
import "./todo.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction, removeTodoAction,} from "../store/todoReducer";
import {Button, TextField} from "@mui/material";
import TodoItem from "./TodoItem-component";
import Navbar from "./Navbar";
import {collection, addDoc, deleteDoc, doc, getDocs} from "firebase/firestore"
import {db} from "../firebase";

const InputTodoComponent = () => {
        const dispatch = useDispatch()
        const [newTodo, setNewTodo] = useState('')
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
            dispatch(addTodoAction(todo))
            setNewTodo('')
        }

        const EditTodo = async (indexToEdit, editTodo) => {
            console.log(editTodo + "!!!")
            dispatch(editTodoAction(indexToEdit, editTodo))
        }

        const removeTodoItem = async (todoItem) => {
            dispatch(removeTodoAction(todoItem.todoId))
            let currentTodo = "";
            const querySnapshot = await getDocs(collection(db, "todos"));
            querySnapshot.forEach((doc) => {
                    if (`${doc.data().todoId}` === `${todoItem.todoId}`) {
                        currentTodo = doc.id
                    }
                }
            );
            await deleteDoc(doc(db, 'todos', `${currentTodo}`))
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
                    currentFolder.folderId === "1" ?
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
                        :
                        todoList.length > 0 ?
                            <div>
                                {

                                    todoList.map((todoItem, index) =>
                                        todoItem.folderId === currentFolder.folderId ?
                                            <TodoItem
                                                onDelete={() => removeTodoItem(todoItem)}
                                                onEdit={(editTodo) => {
                                                    EditTodo(index, editTodo)
                                                }}
                                                item={todoItem.text}
                                                key={index}>
                                            </TodoItem> : console.log()

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