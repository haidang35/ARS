import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../Modules/User/Home/Home";
import { Suspense } from "react";
import AdminDashBoard from "../Modules/Admin/AdminDashboard/AdminDashboard";
import AuthService from "../Shared/Service/AuthService";
import { Fragment } from "react";
import "./App.scss";
import Login from "../Modules/Origin/Admin/Login/Login";

// const isLogged = !!AuthService.userId;
const isAdminLogged = !!AuthService.adminId;

export const App = (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Suspense>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/admin-login" component={Login} />
                    <Route
                        path="/admin"
                        render={() => {
                            return isAdminLogged ? (
                                <AdminDashBoard></AdminDashBoard>
                            ) : (
                                <Redirect to="/"></Redirect>
                            );
                        }}
                    ></Route>
                </Suspense>
            </Switch>
        </Fragment>
    </BrowserRouter>
);

ReactDOM.render(App, document.getElementById("app"));
