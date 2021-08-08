import React from "react";
import { Component } from "react";
import "./FlightBookingDetail.scss";
import { Typography } from "@material-ui/core";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";

class FlightBookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { flight, departure, destination, ticket } = this.props;
        return (
            <div className="flight-booking-detail">
                <div className="title-box">
                    <Typography variant="h6" className="title">
                        Chi tiết chuyến bay
                    </Typography>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="logo-box">
                                <img
                                    className="logo"
                                    src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="list-info">
                                <Typography className="info-item">
                                    {departure.city +
                                        ` (${departure.airport_code})`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Sân bay ${departure.airport_name}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Cất cánh ${getTime(
                                        flight.departure_datetime
                                    )}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Ngày ${dateConvert(
                                        flight.departure_datetime
                                    )}`}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="list-info">
                                <Typography className="info-item">
                                    {destination.city +
                                        ` (${destination.airport_code})`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Sân bay ${destination.airport_name}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Hạ cánh ${getTime(
                                        flight.arrival_datetime
                                    )}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Ngày ${dateConvert(
                                        flight.arrival_datetime
                                    )}`}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="list-info">
                                <Typography className="info-item">
                                    {`Chuyến bay: ${flight.flight_code}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Hạng ghế ngồi: ${ticket.available_class}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Loại vé: ${ticket.ticket_type}`}
                                </Typography>
                                <Typography className="info-item">
                                    {`Máy bay ${flight.aircraft}`}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlightBookingDetail;
