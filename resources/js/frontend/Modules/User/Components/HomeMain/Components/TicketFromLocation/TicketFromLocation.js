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
        console.log(
            "🚀 ~ file: TicketFromLocation.js ~ line 26 ~ TicketFromLocation ~ render ~ ticketList",
            ticketList
        );
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
                                {`Vé máy bay giá rẻ khi khởi hành từ ${location.city}`}
                            </Typography>
                            <div>
                                <Typography
                                    variant="body1"
                                    className="float-left"
                                >
                                    {` Xem vé máy bay giá rẻ nhất khởi hành trong vòng 90
                            ngày tới. Vé máy bay giá rẻ khi khởi hành từ ${location.city}`}
                                </Typography>
                                <Link to="discount-tickets">
                                    <Typography
                                        variant="body1"
                                        className="float-right view-more"
                                    >
                                        Xem thêm các ưu đãi khác
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
                                                                Hạn chế vừa phải
                                                            </Typography>
                                                        </div>

                                                        <Typography
                                                            variant="body1"
                                                            className="price"
                                                        >
                                                            {`Giá từ ${formatCurrency(
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
