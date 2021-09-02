import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./TicketFromLocation.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import {
    dateConvert,
    getDate,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import {
    URL_IMAGE_AIRLINE,
    URL_IMAGE_DESTINATION,
} from "../../../../../../Constances/const";
import { Link } from "react-router-dom";
import { goTo } from "../../../../../../Helpers/Redirect/Redirect";

class TicketFromLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { ticketList, location } = this.props;
        let ticketListLocation = [];
        if (Array.isArray(ticketList) && ticketList.length >= 3) {
            for (let i = 0; i < 3; i++) {
                ticketListLocation.push(ticketList[i]);
            }
        }
        return (
            <div>
                {ticketListLocation.length >= 3 ? (
                    <div className="ticket-from-location">
                        <div className="wrap-container">
                            <Typography variant="h4">
                                {`The best flight deals from Hanoi ${location.city}`}
                            </Typography>
                            <div>
                                <Typography
                                    variant="body1"
                                    className="float-left"
                                >
                                    {` Get back out there for less with the lowest fares we’ve found this week.`}
                                </Typography>
                                <Link to="discount-tickets">
                                    <Typography
                                        variant="body1"
                                        className="float-right view-more"
                                    >
                                        See more deals
                                    </Typography>
                                </Link>
                            </div>

                            <div className="ticket-list">
                                <div className="row">
                                    {ticketListLocation.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className="col-md-4"
                                                onClick={() =>
                                                    goTo(
                                                        `search-flight?departure=${
                                                            item.flight
                                                                .departure.id
                                                        }&destination=${
                                                            item.flight
                                                                .destination.id
                                                        }&time=${getDate(
                                                            item.flight
                                                                .departure_datetime
                                                        )}`
                                                    )
                                                }
                                            >
                                                <div className="ticket-item">
                                                    <div className="img-box">
                                                        <img
                                                            src={
                                                                URL_IMAGE_DESTINATION +
                                                                item.flight
                                                                    .destination
                                                                    .image[0][
                                                                    "image_name"
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                    <Typography
                                                        variant="h6"
                                                        className="destination-name"
                                                    >
                                                        {
                                                            item.flight
                                                                .destination
                                                                .city
                                                        }
                                                    </Typography>
                                                    <div className="flight-info">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="logo-airline-box">
                                                                    <img
                                                                        className="logo-airline"
                                                                        src={
                                                                            URL_IMAGE_AIRLINE +
                                                                            item
                                                                                .flight
                                                                                .airline
                                                                                .logo
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="info">
                                                                    <Typography
                                                                        variant="h6"
                                                                        className="item-info"
                                                                    >
                                                                        {dateConvert(
                                                                            item
                                                                                .flight
                                                                                .departure_datetime
                                                                        )}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h6"
                                                                        className="item-info"
                                                                    >
                                                                        {`${item.flight.departure.airport_code} - ${item.flight.destination.airport_code}, ${item.flight.airline.airline_name}`}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="price-info">
                                                        <div className="title-box">
                                                            <Typography
                                                                variant="body1"
                                                                className="title"
                                                            >
                                                                <RiErrorWarningLine className="icon" />
                                                                Moderate
                                                                restrictions
                                                            </Typography>
                                                        </div>

                                                        <Typography
                                                            variant="body1"
                                                            className="price"
                                                        >
                                                            {`From ${formatCurrency(
                                                                item.price +
                                                                    item.tax
                                                            )}`}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default TicketFromLocation;
