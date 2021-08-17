import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IoAirplane, IoArrowDown, IoRemove } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { getTime } from "../../../../../../Helpers/DateTime/ConvertDateTime";
import {
    formatCash,
    formatCurrency,
} from "../../../../../../Helpers/FormatCurrency";
import FlightDetails from "../../../ChooseFlight/Components/FlightDetails/FlightDetails";
import "./FlightChoosed.scss";
import { withRouter } from "react-router-dom";
import { URL_IMAGE_AIRLINE } from "../../../../../../Constances/const";

class FlightChoosed extends Component {
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

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        let { data } = this.props;
        let flight = Object.assign({}, data.flight);
        let destination = Object.assign({}, flight.destination);
        let departure = Object.assign({}, flight.departure);
        let airline = Object.assign({}, flight.airline);
        return (
            <div>
                <div className="flight-choosed">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Chuyến bay đã lựa chọn
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="item-ticket-choosed">
                            <div className="row">
                                <div className="col-md-2 airline-logo-box">
                                    <div className="airline-logo">
                                        <img
                                            className="logo"
                                            src={`${URL_IMAGE_AIRLINE}${airline.logo}`}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="flight-info">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="destination">
                                                    <Typography className="city">
                                                        {departure.city}
                                                    </Typography>
                                                    <Typography className="time">
                                                        {getTime(
                                                            flight.departure_datetime
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="info">
                                                    <Typography className="flight-name">
                                                        {flight.flight_code}
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
                                                        {destination.city}
                                                    </Typography>
                                                    <Typography className="time">
                                                        {getTime(
                                                            flight.arrival_datetime
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
                                        <Button
                                            className="btn-choose"
                                            variant="contained"
                                            color="primary"
                                            onClick={this.goBack}
                                        >
                                            Thay đổi chuyến bay
                                        </Button>
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
            </div>
        );
    }
}
export default withRouter(FlightChoosed);
