import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.authState)
    return (
        isAuth ?
            <Routes key= {Date.now()}>
                {privateRoutes.map(route =>
                    <Route key= {Date.now()} path={route.path} element={route.element} exact={route.exact}/>
                )}
                <Route key= {Date.now()} path="*" element={<Navigate to="/"/>}/>
            </Routes>
            :
            <Routes key= {Date.now()}>
                {publicRoutes.map(route =>
                    <Route key= {Date.now()} path={route.path} element={route.element} exact={route.exact}/>
                )}
                <Route key= {Date.now()} path="*" element={<Navigate to="/signin"/>}/>
            </Routes>

    );
};

export default AppRouter;