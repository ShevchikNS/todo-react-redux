import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import SignIn from "./SignIn";
import InputTodoComponent from "./inputTodo-component";
import {useDispatch, useSelector} from "react-redux";
import {changeAuthAction} from "../store/authReducer";

const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.authState)
    return (
        isAuth ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route path={route.path} element = {route.element} exact={route.exact}/>
                    )}
                    <Route path="*" element={ <Navigate to="/" /> } />
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route path={route.path} element = {route.element} exact={route.exact}/>
                    )}
                    <Route path="*" element={ <Navigate to="/signin" /> } />
                </Routes>

    );
};

export default AppRouter;