import React from "react";
import { Component } from "react";
import "./SideBar.scss";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

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
                        <li className="menu-item">
                            {" "}
                            <FaUserCircle className="icon-menu" />
                            Profile
                        </li>
                        <li className="menu-item">
                            <TiShoppingCart className="icon-menu" />
                            Booking
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default SideBar;
