import React from "react";
import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="sidebar" className="sidebar-admin active">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <Link to="" style={{textDecoration: 'none'}}>
                                   ARS Manage
                                </Link>
                            </div>
                            <div className="toggler">
                                <a
                                    href="#"
                                    className="sidebar-hide d-xl-none d-block"
                                >
                                    <i className="bi bi-x bi-middle" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Menu</li>
                            <li className="sidebar-item  ">
                                <NavLink to="/admin" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink to="/admin/flights" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Flights</span>
                                </NavLink>
                                <NavLink to="/admin/destinations" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Destinations</span>
                                </NavLink>
                                <NavLink to="/admin/airlines" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Airlines</span>
                                </NavLink>
                                <NavLink to="/admin/tickets" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Tickets</span>
                                </NavLink>
                                <NavLink to="/admin/bookings" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Bookings</span>
                                </NavLink>
                                <NavLink to="/admin/passengers" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Passengers</span>
                                </NavLink>
                                <NavLink to="/admin/booking-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Booking Details</span>
                                </NavLink>
                           
                                <NavLink to="/admin/flight-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Flight Details</span>
                                </NavLink>
                                <NavLink to="/admin/destination-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Destination Details</span>
                                </NavLink>
                                <NavLink to="/admin/airline-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Airline Details</span>
                                </NavLink>
                                <NavLink to="/admin/ticket-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Ticket Details</span>
                                </NavLink>
                                <NavLink to="/admin/passenger-details" className="sidebar-link">
                                    <i className="bi bi-grid-fill" />
                                    <span>Passenger Details</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x">
                        <i data-feather="x" />
                    </button>
                </div>
            </div>
        );
    }
}

export default SideBar;
