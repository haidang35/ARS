import React from "react";
import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./Navbar.scss";
import { NavLink, Link } from "react-router-dom";
import AuthService from "../../../../../Shared/Service/AuthService";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { goTo } from "../../../../../Helpers/Redirect/Redirect";

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openUserMenu: false,
        };
    }

    handleClick = (event) => {
        this.setState({
            openUserMenu: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            openUserMenu: null,
        });
    };

    onLogin = () => {
        goTo("login");
    };

    onLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        goTo("");
    };
    render() {
        const isLogged = !!AuthService.userId;
        let userInfo = {};
        if (isLogged) {
            userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }
        return (
            <div className="user-nav">
                <AppBar
                    position="static"
                    className="nav-bar"
                    color="transparent"
                >
                    <div className="wrap-container">
                        <Toolbar style={{ padding: "0" }}>
                            <Typography variant="h5" style={{ color: "#ffff" }}>
                                Flight Booking
                            </Typography>
                            <div className="list-menu">
                                <NavLink
                                    to="/"
                                    className="menu-item"
                                    activeClassName="active"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className="menu-item"
                                    activeClassName="active"
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    to="/services"
                                    className="menu-item"
                                    activeClassName="active"
                                >
                                    Service
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className="menu-item"
                                    activeClassName="active"
                                >
                                    Contact
                                </NavLink>
                            </div>

                            {!isLogged ? (
                                <div className="btn-login-box">
                                    <Button
                                        onClick={this.onLogin}
                                        color="inherit"
                                        className="btn-login"
                                    >
                                        Login
                                    </Button>
                                </div>
                            ) : (
                                <div className="user-logged-box">
                                    <Typography
                                        variant="h6"
                                        className="hello-title"
                                    >
                                        Xin chào,
                                    </Typography>
                                    <Button
                                        onClick={this.handleClick}
                                        color="inherit"
                                        className="btn-login"
                                        startIcon={
                                            <AccountCircleIcon className="icon-user" />
                                        }
                                    >
                                        {isLogged ? userInfo.name : ""}
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={this.state.openUserMenu}
                                        keepMounted
                                        open={this.state.openUserMenu}
                                        onClose={this.handleClose}
                                    >
                                        <StyledMenuItem>
                                            <Link
                                                to="customer-info"
                                                style={{
                                                    textDecoration: "none",
                                                    display: "flex",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <AccountBoxIcon
                                                        fontSize="medium"
                                                        className="icon-item"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Thông tin khách hàng"
                                                    style={{
                                                        marginLeft: "-18px",
                                                    }}
                                                />
                                            </Link>
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={this.onLogout}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="medium" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Đăng xuất"
                                                style={{
                                                    marginLeft: "-18px",
                                                }}
                                            />
                                        </StyledMenuItem>
                                    </StyledMenu>
                                </div>
                            )}
                        </Toolbar>
                    </div>
                </AppBar>
            </div>
        );
    }
}
export default Navbar;
