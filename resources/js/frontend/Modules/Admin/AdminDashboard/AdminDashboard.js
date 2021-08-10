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
import Flight from "../Components/Flight/Flight";
import Airline from "../Components/Airline/Airline";
import Ticket from "../Components/Ticket/Ticket";
import Booking from "../Components/Booking/Booking";
import Passenger from "../Components/Passenger/Passenger";
import AirlineDetails from "../Components/Airline/Components/AirlineDetails/AirlineDetails";
import BookingDetails from "../Components/Booking/Components/BookingDetails/BookingDetails";
import TicketDetails from "../Components/Ticket/Components/TicketDetails/TicketDetails";
import PassengerDetails from "../Components/Passenger/Components/PassengerDetails/PassengerDetails";
import FlightDetails from "../Components/Flight/Components/FlightDetails/FlightDetails";
import DestinationDetails from "../Components/Destination/Components/DestinationDetails/DestinationDetails";
import AddNewDestination from "../Components/Destination/Components/AddNewDestination/AddNewDestination";
import AddNewAirline from "../Components/Airline/Components/AddNewAirline/AddNewAirline";
class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div id="app" className="admin-dashboard">
                        <Sidebar />
                        <div id="main">
                            <Header />
                            <div>
                                <Switch>
                                    <Suspense>
                                        <Route
                                            exact
                                            path={`/admin`}
                                            component={DashBoard}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/destinations`}
                                            component={Destination}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/flights`}
                                            component={Flight}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/airlines`}
                                            component={Airline}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/tickets`}
                                            component={Ticket}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/bookings`}
                                            component={Booking}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/passengers`}
                                            component={Passenger}
                                        />
                                      
                                        <Route
                                            exact
                                            path={`/admin/destinations/:id`}
                                            component={DestinationDetails}
                                        />
                                         <Route
                                            exact
                                            path={`/admin/destinations/create`}
                                            component={AddNewDestination}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/flights/:id`}
                                            component={FlightDetails}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/tickets/:id`}
                                            component={TicketDetails}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/booking/:id`}
                                            component={BookingDetails}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/airlines/:id`}
                                            component={AirlineDetails}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/airlines/create`}
                                            component={AddNewAirline}
                                        />
                                        <Route
                                            exact
                                            path={`/admin/passengers/:id`}
                                            component={PassengerDetails}
                                        />
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
