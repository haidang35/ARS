import React from "react";
import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./SubNavbar.scss";
import { Link, NavLink, Redirect } from "react-router-dom";
import AuthService from "../../../../../Shared/Service/AuthService";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { goTo } from "../../../../../Helpers/Redirect/Redirect";
import { IoSearchCircle } from "react-icons/io5";

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
class SubNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openUserMenu: false,
            onLogin: false,
            onLogout: false,
            search: "",
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
        this.setState({
            onLogin: true,
        });
    };

    onLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        goTo("");
    };

    handleChangeSearch = (ev) => {
        this.setState({
            search: ev.target.value,
        });
    };

    onSearchFLightInfo = (ev) => {
        const { search } = this.state;
        if (ev.key === "Enter") {
            goTo(`flight-info?search=${search}`);
        }
    };
    render() {
        const isLogged = !!AuthService.userId;
        let userInfo = {};
        if (isLogged) {
            userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }
        if (this.state.onLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="user-sub-nav">
                <AppBar
                    position="static"
                    className="nav-bar"
                    color="transparent"
                >
                    <div className="wrap-container">
                        <Toolbar style={{ padding: "0" }}>
                            <Typography
                                variant="h5"
                                style={{ color: "#ffff" }}
                                onClick={() => {
                                    goTo("");
                                }}
                                style={{ cursor: "pointer", color: "#ffff" }}
                            >
                                Flight Hi
                            </Typography>

                            <div className="list-menu">
                                <div className="hotline">
                                    <img
                                        src="https://i.postimg.cc/ZnB4qS7v/Icon24h.png"
                                        className="icon-24h"
                                    />
                                    <div className="hotline-info">
                                        <Typography
                                            variant="body1"
                                            className="title"
                                        >
                                            Hotline
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            className="phone"
                                        >
                                            0357446532
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            className="phone"
                                        >
                                            -
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            className="phone"
                                        >
                                            1900.1010
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="search-bar"
                                style={
                                    isLogged
                                        ? { marginLeft: "5%" }
                                        : { marginLeft: "18%" }
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="Search ..."
                                    name="search"
                                    className="search-input"
                                    value={this.state.search}
                                    onChange={this.handleChangeSearch}
                                    onKeyDown={this.onSearchFLightInfo}
                                />
                                <IoSearchCircle
                                    onClick={() =>
                                        goTo(
                                            `flight-info?search=${this.state.search}`
                                        )
                                    }
                                    className="search-icon"
                                />
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
                                    ></Typography>
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
                                                to="/customer-info"
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
export default SubNavbar;
