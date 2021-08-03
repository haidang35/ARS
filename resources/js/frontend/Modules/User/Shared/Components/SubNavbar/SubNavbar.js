import React from "react";
import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./SubNavbar.scss";
import { NavLink } from "react-router-dom";

class SubNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="user-sub-nav">
                <AppBar position="static" className="nav-bar" color="transparent">
                    <div className="wrap-container">
                        <Toolbar style={{padding: '0'}}>
                            <Typography variant="h5" style={{color: "#ffff"}}>Flight Booking</Typography>
                            <div className="list-menu">
                                <NavLink to="/" className="menu-item" activeClassName="active">
                                    Home
                                </NavLink>
                                <NavLink to="/about" className="menu-item" activeClassName="active">
                                    About
                                </NavLink>
                                <NavLink to="/services" className="menu-item" activeClassName="active">
                                    Service
                                </NavLink>
                                <NavLink to="/contact" className="menu-item" activeClassName="active">
                                    Contact
                                </NavLink>
                            </div>
                            <Button color="inherit" className="btn-login">
                                Login
                            </Button>
                        </Toolbar>
                    </div>
                </AppBar>
                
            </div>
        );
    }
}
export default SubNavbar;
