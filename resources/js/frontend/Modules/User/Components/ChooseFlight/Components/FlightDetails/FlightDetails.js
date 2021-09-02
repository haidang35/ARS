import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./FlightDetails.scss";
import { BsInfoCircleFill } from "react-icons/bs";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import { URL_IMAGE_AIRLINE } from "../../../../../../Constances/const";

class FlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { data } = this.props;

        return (
            <div>
                <div className="flight-details">
                    <div className="flight-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Flight details
                            </Typography>
                        </div>

                        <div className="content">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="logo-box">
                                        <img
                                            className="logo"
                                            src={
                                                URL_IMAGE_AIRLINE +
                                                data.flight.airline.logo
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.flight.departure.city +
                                                ` (${data.flight.departure.airport_code})`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Airport ${data.flight.departure.airport_name}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Take off ${getTime(
                                                data.flight.departure_datetime
                                            )}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Date ${dateConvert(
                                                data.flight.departure_datetime
                                            )}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.flight.destination.city +
                                                ` (${data.flight.destination.airport_code})`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Airport ${data.flight.destination.airport_name}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Landing ${getTime(
                                                data.flight.arrival_datetime
                                            )}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Date ${dateConvert(
                                                data.flight.arrival_datetime
                                            )}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {`Flight ${data.flight.flight_code}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Class ${data.available_class}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Ticket: ${data.ticket_type}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Aircraft ${data.flight.aircraft}`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Ticket details
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead>
                                        <tr>
                                            <th>Passenger</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Taxes and fees</th>
                                            <th>Total money</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.passenger.map((item) => {
                                            if (item.quantity > 0)
                                                return (
                                                    <tr
                                                        key={
                                                            item.passenger_type
                                                        }
                                                    >
                                                        <td>
                                                            {item.passenger_type ==
                                                            1
                                                                ? "Adult"
                                                                : item.passenger_type ==
                                                                  2
                                                                ? "Children"
                                                                : "Infant"}
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            {formatCurrency(
                                                                data.price
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                data.tax
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                item.quantity *
                                                                    (data.price +
                                                                        data.tax)
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                        })}

                                        <tr>
                                            <td colSpan="4">
                                                Total fare (VND)
                                            </td>
                                            <td>
                                                {" "}
                                                {formatCurrency(
                                                    data.into_money
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="baggage-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Baggage conditions
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Carbin baggage
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            {`${data.carbin_bag}kg`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Checkin baggage
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            {`${data.checkin_bag}kg`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Ticket conditions
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="note">
                                <Typography>
                                    *Important Note: Please check return flight
                                    information before flight date 24 sound and
                                    follow the correct journey order fly on the
                                    ticket, if any leg does not fly happily
                                    Please report back to Vemaybay.vn for
                                    support Avoid booking cancellation.
                                </Typography>
                            </div>
                            <div className="note-change">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography>Flight change</Typography>
                                    </div>
                                    <div className="col-sm-9">
                                        <Typography>
                                            - 12 hours before departure time:
                                            Thu fee 297,000VND/way/pax +
                                            difference fare difference (if any)
                                        </Typography>
                                        <Typography>
                                            - Within 12 hours and after hours
                                            Departure: Not applicable
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

export default FlightDetails;
