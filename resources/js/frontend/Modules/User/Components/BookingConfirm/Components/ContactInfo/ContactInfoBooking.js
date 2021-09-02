import React from "react";
import { Component } from "react";
import "./ContactInfoBooking.scss";
import { Typography } from "@material-ui/core";

class ContactInfoBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { booking } = this.props;

        return (
            <div>
                <div className="contact-info-booking">
                    <div className="title-box">
                        <Typography variant="h6" className="title">
                            Contact information
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Full name:
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.contact_name}
                                    </Typography>
                                </div>

                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Phone number:
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.contact_phone}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Email:
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.contact_email}
                                    </Typography>
                                </div>
                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Special requirements :
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.note}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Address
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.address}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="item-contact">
                                    <Typography
                                        variant="h6"
                                        className="title-item"
                                    >
                                        Payment method
                                    </Typography>
                                    <Typography className="content-item">
                                        {booking.payment_method == 1
                                            ? "Payment at the agent "
                                            : booking.payment_method == 2
                                            ? "Payment via bank transfer "
                                            : booking.payment_method == 3
                                            ? "Payment via Paypal "
                                            : ""}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ContactInfoBooking;
