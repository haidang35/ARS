import { Button, LinearProgress, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IoAirplane, IoArrowDown, IoRemove } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import "./BookingTicketList.scss";
import { getTime } from "../../../../../../Helpers/DateTime/ConvertDateTime";
import {
    formatCash,
    formatCurrency,
} from "../../../../../../Helpers/FormatCurrency";
import FlightDetails from "../FlightDetails/FlightDetails";
import TicketItem from "./TicketItem/TicketItem";
import { GiAirplaneDeparture } from "react-icons/gi";

class BookingTicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onViewFlightDetails: false,
            flightDetailsId: "",
        };
    }

    viewFlightDetails = (id) => {
        this.setState({
            onViewFlightDetails: true,
            flightDetailsId: id,
        });
    };
    render() {
        const { flightList, tripType, chooseTicket, ticketsChoosed } =
            this.props;
        return (
            <div>
                <div className="booking-ticket-list">
                    {flightList.map((item) => {
                        return (
                            <TicketItem
                                key={item.id}
                                data={item}
                                tripType={tripType}
                                chooseTicket={chooseTicket}
                                ticketsChoosed={ticketsChoosed}
                            />
                        );
                    })}
                    {flightList.length == 0 ? (
                        <div className="notice-none-flight">
                            <GiAirplaneDeparture className="plane-icon" />
                            <div className="progress-search">
                                <LinearProgress />
                            </div>
                            <Typography variant="h6">
                                Hiện tại, không có chuyến bay vào phù hợp với
                                yêu cầu của quý khách.
                            </Typography>
                            <Typography variant="h6">
                                Quý khách có thể thay đổi thời gian để tìm
                                chuyến bay phù hợp
                            </Typography>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default BookingTicketList;
