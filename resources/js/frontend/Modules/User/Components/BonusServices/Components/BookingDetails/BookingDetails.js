import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./BookingDetails.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import { URL_IMAGE_AIRLINE } from "../../../../../../Constances/const";

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data,
        });
    };

    getPassengerList = () => {
        const { data } = this.state;
        let passenger = [];
        for (const ps of data.passenger) {
            if (ps.quantity > 0) {
                passenger.push(ps);
            }
        }
        return passenger;
    };

    render() {
        const { data } = this.state;
        console.log(
            "🚀 ~ file: BookingDetails.js ~ line 41 ~ BookingDetails ~ render ~ data",
            data
        );
        let passenger = [];
        if (Array.isArray(data.passenger)) {
            data.passenger.forEach((item) => {
                if (item.quantity > 0) passenger.push(item);
            });
        }

        const flight = Object.assign({}, data.flight);
        const departure = Object.assign({}, flight.departure);
        const destination = Object.assign({}, flight.destination);
        const airline = Object.assign({}, flight.airline);
        return (
            <div className="booking-details">
                <div className="ticket-details">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Chi tiết giá vé
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="flight-time">
                                    <Typography
                                        variant="body1"
                                        className="destination"
                                    >
                                        {departure.city}
                                    </Typography>
                                    <FaLongArrowAltRight className="icon-arrow" />
                                    <Typography
                                        variant="body1"
                                        className="destination"
                                    >
                                        {destination.city}
                                    </Typography>
                                </div>
                                <div className="flight-time">
                                    <BiTime className="icon-clock" />
                                    <Typography
                                        variant="body1"
                                        className="time"
                                    >
                                        {getTime(flight.departure_datetime) +
                                            " " +
                                            dateConvert(
                                                flight.departure_datetime
                                            )}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="logo-airline">
                                    <img
                                        src={`${URL_IMAGE_AIRLINE}${airline.logo}`}
                                        className="logo"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="ticket-price">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Typography
                                                variant="h6"
                                                className="title left-title"
                                            >
                                                Tóm tắt giá vé
                                            </Typography>
                                        </div>
                                        <div className="col-md-6">
                                            <Typography
                                                variant="h6"
                                                className="title total-title"
                                            >
                                                Tổng
                                            </Typography>
                                        </div>
                                        <div className="passenger-list-price">
                                            {passenger.map((item) => {
                                                return (
                                                    <div
                                                        key={
                                                            item.passenger_type
                                                        }
                                                        className="row"
                                                    >
                                                        <div className="col-sm-4">
                                                            <Typography
                                                                variant="body1"
                                                                className="content-line"
                                                            >
                                                                {item.passenger_type ==
                                                                1
                                                                    ? "Người lớn"
                                                                    : item.passenger_type ==
                                                                      2
                                                                    ? "Trẻ em"
                                                                    : item.passenger_type ==
                                                                      3
                                                                    ? "Em bé"
                                                                    : ""}
                                                            </Typography>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <Typography
                                                                variant="body1"
                                                                className="content-line"
                                                            >
                                                                {`${
                                                                    item.quantity
                                                                } x ${formatCurrency(
                                                                    data.total_price
                                                                )}`}
                                                            </Typography>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <Typography
                                                                variant="body1"
                                                                className="content-line right"
                                                            >
                                                                {formatCurrency(
                                                                    item.quantity *
                                                                        data.total_price
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Typography
                                                        variant="h4"
                                                        className="total-price"
                                                    >
                                                        Tổng chi phí
                                                    </Typography>
                                                </div>
                                                <div className="col-md-6">
                                                    <Typography
                                                        variant="h4"
                                                        className="total-price right"
                                                    >
                                                        {formatCurrency(
                                                            data.into_money
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
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
export default BookingDetails;
