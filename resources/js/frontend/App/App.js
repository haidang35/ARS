import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../Modules/User/Home/Home";
import { Suspense } from "react";
import AdminDashBoard from "../Modules/Admin/AdminDashboard/AdminDashboard";
import AuthService from "../Shared/Service/AuthService";
import { Fragment } from "react";

// const isLogged = !!AuthService.userId;
const isLogged = true;

export const App = (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Suspense>
                    <Route path="/" component={Home} />
                    <Route
                        
                        path="/admin"
                        render={() => {
                            return (isLogged) ? (
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
