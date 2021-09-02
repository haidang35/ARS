import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { URL_IMAGE_SUPPORT } from "../../../../../../Constances/const";
import "./SupportInfo.scss";

class SupportInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="support-info">
                    <div className="wrap-container">
                        {/* <Typography variant="h4" className="title">
                            Support
                        </Typography> */}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support1.svg"
                                            }
                                            className="img-support"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Ready when you are
                                        </Typography>
                                        <Typography variant="body1">
                                            See where you can travel to right
                                            now and find the best deals across
                                            thousands of flights, hotels and car
                                            hire options
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support2.svg"
                                            }
                                            className="img-support img-support-2"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Plan with confidence
                                        </Typography>
                                        <Typography variant="body1">
                                            Stay one step ahead with flexible
                                            flight tickets, free hotel and car
                                            cancellation and the cleanest rooms
                                            around.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support3.svg"
                                            }
                                            className="img-support img-support-3"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Keep it simple
                                        </Typography>
                                        <Typography variant="body1">
                                            No hidden fees. No hidden charges.
                                            No funny business. With us, you’ll
                                            always know exactly where your money
                                            goes. So you can relax before your
                                            trip even begins.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SupportInfo;
