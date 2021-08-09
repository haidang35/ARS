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
                            Thông tin liên hệ
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
                                        Họ và tên:
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
                                        Điện thoại:
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
                                        Yêu cầu đặc biệt:
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
                                        Địa chỉ
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
                                        Phương thức thanh toán:
                                    </Typography>
                                    <Typography className="content-item"></Typography>
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
