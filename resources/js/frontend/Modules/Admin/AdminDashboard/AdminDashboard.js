import React from "react";
import { Fragment } from "react";
import { Suspense } from "react";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashBoard from "../Components/DashBoard/DashBoard";
import Destination from "../Components/Destination/Destination";
import Header from "../Shared/Components/Header/Header";
import Sidebar from "../Shared/Components/Sidebar/Sidebar";
import "../../../../../../public/assets/css/bootstrap.css";
import "../../../../../../public/assets/css/app.css";
import "../../../../../../public/assets/vendors/iconly/bold.css";
import "../../../../../../public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css";
import "../../../../../../public/assets/vendors/bootstrap-icons/bootstrap-icons.css";


class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div id="app" className="admin-dashboard" >
                        <Sidebar />
                        <div id="main" >
                            <Header />
                            <div>
                                <Switch>
                                    <Suspense>
                                        <Route exact path={`/admin`}  component={DashBoard} />
                                        <Route exact path={`/admin/destinations`} component={Destination} />
                                    </Suspense>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default AdminDashBoard;
