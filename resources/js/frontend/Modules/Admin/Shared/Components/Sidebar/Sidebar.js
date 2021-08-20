import React from "react";
import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { FaPlane, FaTicketAlt } from "react-icons/fa";
import { RiPlaneFill, RiReservedFill } from "react-icons/ri";
import { MdLocationOn, MdDashboard } from "react-icons/md";
import { SiFloatplane } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
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
                                <Link to="" style={{ textDecoration: "none" }}>
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
                                <NavLink
                                    to="/admin/dashboard"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <MdDashboard style={{ fontSize: "25px" }} />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/flights"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <RiPlaneFill style={{ fontSize: "25px" }} />
                                    <span>Flights</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/destinations"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <MdLocationOn
                                        style={{ fontSize: "25px" }}
                                    />
                                    <span>Destinations</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/airlines"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <SiFloatplane
                                        style={{ fontSize: "25px" }}
                                    />
                                    <span>Airlines</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/tickets"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <FaTicketAlt style={{ fontSize: "25px" }} />
                                    <span>Tickets</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/bookings"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <RiReservedFill
                                        style={{ fontSize: "25px" }}
                                    />
                                    <span>Bookings</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/passengers"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <HiUserGroup style={{ fontSize: "25px" }} />
                                    <span>Passengers</span>
                                </NavLink>
                                <NavLink
                                    to="/admin/chat-box"
                                    className="sidebar-link"
                                    activeStyle={{ backgroundColor: "#d7ebef" }}
                                >
                                    <BsFillChatSquareDotsFill
                                        style={{ fontSize: "25px" }}
                                    />
                                    <span>Chat Box</span>
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
