import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="footer-user">
                    <div className="wrap-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="logo-box">
                                    <Typography className="title" variant="h4">
                                        Flight Hi
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="content "
                                    >
                                        We always cooperate with you.
                                    </Typography>
                                    <Typography
                                        className="contact"
                                        variant="h6"
                                    >
                                        Hotline 19001600
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="copyright-box">
                                <Typography
                                    className="content-1"
                                    variant="body1"
                                >
                                    @FlightHi 2021
                                </Typography>
                                <Typography
                                    className="content-2"
                                    variant="body1"
                                >
                                    Developed by YodaTeam T2009M - FPT Aptech
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;
