import React from "react";
import { Component } from "react";
import "./SideBar.scss";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="customer-side-bar">
                    <ul className="menu-list">
                        <Link
                            to="/customer-info/profile"
                            style={{ textDecoration: "none" }}
                        >
                            <li className="menu-item">
                                {" "}
                                <FaUserCircle className="icon-menu" />
                                Profile
                            </li>
                        </Link>

                        <Link
                            to="/customer-info"
                            style={{ textDecoration: "none" }}
                        >
                            {" "}
                            <li className="menu-item">
                                <TiShoppingCart className="icon-menu" />
                                Booking
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}
export default SideBar;
