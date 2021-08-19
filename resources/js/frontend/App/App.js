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
import { goTo } from "../Helpers/Redirect/Redirect";

import Echo from "laravel-echo";

// const isLogged = !!AuthService.userId;
const isAdminLogged = !!AuthService.adminId;

export const App = (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Suspense>
                    <Route path="/" component={Home} />
                    <Route exact path="/admin-login" component={Login} />
                    <Route
                        path="/admin"
                        render={() => {
                            return isAdminLogged ? (
                                <AdminDashBoard></AdminDashBoard>
                            ) : (
                                goTo("")
                            );
                        }}
                    ></Route>
                </Suspense>
            </Switch>
        </Fragment>
    </BrowserRouter>
);

ReactDOM.render(App, document.getElementById("app"));
