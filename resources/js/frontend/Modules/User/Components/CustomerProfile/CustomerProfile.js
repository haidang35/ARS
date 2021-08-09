import React from "react";
import { Suspense } from "react";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import BookingList from "./Components/BookingList/BookingList";
import SideBar from "./Components/SideBar/SideBar";
import "./CustomerProfile.scss";

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <SubNavbar />
                    <div className="customer-profile">
                        <div className="wrap-container">
                            <div className="row">
                                <div className="col-md-2 col-sm-2">
                                    <SideBar />
                                </div>
                                <div className="col-md-10 col-sm-10">
                                    <Switch>
                                        <Suspense>
                                            <Route
                                                exact
                                                path="/customer-info"
                                                component={BookingList}
                                            />
                                        </Suspense>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
export default CustomerProfile;
