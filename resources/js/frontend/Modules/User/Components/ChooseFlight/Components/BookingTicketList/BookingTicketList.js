import { Button, Typography } from "@material-ui/core";
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
        const { flightList } = this.props;
        return (
            <div>
                <div className="booking-ticket-list">
                    {flightList.map((item) => {
                        return <TicketItem key={item.id} data={item} />;
                    })}
                </div>
            </div>
        );
    }
}

export default BookingTicketList;
