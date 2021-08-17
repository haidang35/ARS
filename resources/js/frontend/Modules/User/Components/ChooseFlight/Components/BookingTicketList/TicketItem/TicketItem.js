import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IoAirplane, IoArrowDown, IoRemove } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { getTime } from "../../../../../../../Helpers/DateTime/ConvertDateTime";
import {
    formatCash,
    formatCurrency,
} from "../../../../../../../Helpers/FormatCurrency";
import FlightDetails from "../../FlightDetails/FlightDetails";
import "./TicketItem.scss";
import { Link } from "react-router-dom";
import { URL_IMAGE_AIRLINE } from "../../../../../../../Constances/const";

class TicketItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onViewDetails: false,
        };
    }

    viewFlightDetails = (id) => {
        this.setState({
            onViewDetails: !this.state.onViewDetails,
        });
    };

    onChooseFlight = () => {
        window.scrollTo(0, 0);
    };
    render() {
        const { data } = this.props;
        console.log(
            "🚀 ~ file: TicketItem.js ~ line 35 ~ TicketItem ~ render ~ data",
            data
        );
        return (
            <div>
                <div>
                    <div className="item-ticket">
                        <div className="row">
                            <div className="col-md-2 airline-logo-box">
                                <div className="airline-logo">
                                    <img
                                        className="logo"
                                        src={`${URL_IMAGE_AIRLINE}${data.flight.airline.logo}`}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="flight-info">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="destination">
                                                <Typography className="city">
                                                    {data.flight.departure.city}
                                                </Typography>
                                                <Typography className="time">
                                                    {getTime(
                                                        data.flight
                                                            .departure_datetime
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="info">
                                                <Typography className="flight-name">
                                                    {data.flight.flight_code}
                                                </Typography>
                                                <div className="icon-flight-box">
                                                    <HiLocationMarker className="location-icon" />
                                                    <div className="line"></div>
                                                    <IoAirplane className="icon-flight" />
                                                </div>

                                                <Typography
                                                    onClick={() =>
                                                        this.viewFlightDetails(
                                                            data.id
                                                        )
                                                    }
                                                    variant="h6"
                                                    className="detail"
                                                >
                                                    Chi tiết
                                                    {this.state
                                                        .onViewDetails ? (
                                                        <IoMdArrowDropup className="view-detail-icon" />
                                                    ) : (
                                                        <IoMdArrowDropdown className="view-detail-icon" />
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="destination">
                                                <Typography className="city">
                                                    {
                                                        data.flight.destination
                                                            .city
                                                    }
                                                </Typography>
                                                <Typography className="time">
                                                    {getTime(
                                                        data.flight
                                                            .arrival_datetime
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="flight-choose">
                                    <Typography className="price">
                                        {formatCurrency(data.total_price)}
                                    </Typography>
                                    <Link
                                        to={`/reservations/ticket/${data.id}`}
                                        style={{
                                            textDecoration: "none",
                                            width: "100%",
                                        }}
                                    >
                                        <Button
                                            onClick={this.onChooseFlight}
                                            className="btn-choose"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Chọn chuyến bay
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.onViewDetails ? (
                        <FlightDetails key={data.id} data={data} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default TicketItem;
