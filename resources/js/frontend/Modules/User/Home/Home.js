import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";
import HomePage from "../Components/HomePage/HomePage";
import Navbar from "../Shared/Components/Navbar/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import ChooseFlight from "../Components/ChooseFlight/ChooseFlight";
import Reservations from "../Components/Reservations/Reservations";
import BookingConfirm from "../Components/BookingConfirm/BookingConfirm";
import Login from "../../Origin/User/Login/Login";
import Register from "../../Origin/User/Register/Register";
import CustomerProfile from "../Components/CustomerProfile/CustomerProfile";
import AuthService from "../../../Shared/Service/AuthService";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const isLogged = !!AuthService.userId;
        return (
            <BrowserRouter>
                <div className="user-layout">
                    <Switch>
                        <Suspense>
                            <Route exact path={"/"} component={HomePage} />
                            <Route
                                exact
                                path={"/login"}
                                render={() => {
                                    return isLogged ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Login></Login>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path={"/register"}
                                component={Register}
                            />
                            <Route
                                path={"/search-flight"}
                                component={ChooseFlight}
                            />
                            <Route
                                path={"/reservations/ticket/:id"}
                                component={Reservations}
                            />
                            <Route
                                path={"/reservation/confirm"}
                                component={BookingConfirm}
                            />
                            <Route
                                path={"/customer-info"}
                                render={() => {
                                    return isLogged ? (
                                        <CustomerProfile></CustomerProfile>
                                    ) : (
                                        <Redirect to="/" />
                                    );
                                }}
                            />
                        </Suspense>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default Home;
