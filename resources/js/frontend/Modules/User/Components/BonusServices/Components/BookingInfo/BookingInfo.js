import React from "react";
import { Component } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BiRectangle } from "react-icons/bi";
import { Typography } from "@material-ui/core";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import TicketDetails from "../../../Reservations/Components/TicketDetails/TicketDetails";

class BookingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            bookingInfo,
            passengerChoosedSeat,
            chooseSeatFlight,
            onChooseSeatStart,
            onChooseSeatReturn,
        } = this.props;

        let flightsChoosed = [];
        if (flightsChoosed.length == 0) {
            flightsChoosed.push(chooseSeatFlight);
        }
        flightsChoosed.forEach((item) => {
            if (chooseSeatFlight.id !== item.id) {
                flightsChoosed.push(chooseSeatFlight);
            }
        });
        const passengerChoosedInfo = Object.assign(
            {},
            passengerChoosedSeat.data
        );
        const tickets = bookingInfo.ticket;
        return (
            <div>
                <div className="booking-info-service">
                    {tickets.map((item) => {
                        return (
                            <div key={item.id} className="passenger-list">
                                <div className="title-box">
                                    <Typography variant="h6">
                                        {`${item.flight.departure.city} - ${item.flight.destination.city}`}
                                    </Typography>
                                    <Typography variant="h6"></Typography>
                                </div>
                                <div className="passengers-box">
                                    {bookingInfo.passengers.map((psg) => {
                                        return (
                                            <div
                                                key={psg.id}
                                                className={`passenger-item ${
                                                    passengerChoosedInfo.id ===
                                                        psg.id &&
                                                    passengerChoosedSeat.ticket
                                                        .id === item.id
                                                        ? `passenger-item-active`
                                                        : ``
                                                }`}
                                                onClick={() =>
                                                    this.props.setPassengerSeat(
                                                        psg,
                                                        item
                                                    )
                                                }
                                            >
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Typography
                                                            className="passenger-name"
                                                            variant="body1"
                                                        >
                                                            {psg.passenger_name}
                                                        </Typography>
                                                        {(chooseSeatFlight ==
                                                            0 &&
                                                            psg.seat_code !==
                                                                "" &&
                                                            passengerChoosedSeat
                                                                .ticket.id ===
                                                                item.id) ||
                                                        (chooseSeatFlight ===
                                                            1 &&
                                                            psg.seat_code_return !==
                                                                "" &&
                                                            passengerChoosedSeat
                                                                .ticket.id ===
                                                                item.id) ||
                                                        (chooseSeatFlight ==
                                                            1 &&
                                                            psg.seat_code !==
                                                                "" &&
                                                            passengerChoosedSeat
                                                                .ticket.id !==
                                                                item.id) ||
                                                        (chooseSeatFlight ==
                                                            0 &&
                                                            psg.seat_code_return !==
                                                                "" &&
                                                            passengerChoosedSeat
                                                                .ticket.id !==
                                                                item.id) ? (
                                                            <Typography
                                                                className="seat-status seat-status-active"
                                                                variant="body1"
                                                            >
                                                                <ImCheckmark className="checked-icon" />
                                                                Seats added
                                                            </Typography>
                                                        ) : (
                                                            <Typography
                                                                className="seat-status"
                                                                variant="body1"
                                                            >
                                                                Choose your seat
                                                                <IoIosArrowForward className="icon-arrow" />
                                                            </Typography>
                                                        )}
                                                    </div>
                                                    {(chooseSeatFlight === 0 &&
                                                        psg.seat_code !== "" &&
                                                        passengerChoosedSeat
                                                            .ticket.id ===
                                                            item.id) ||
                                                    (chooseSeatFlight === 1 &&
                                                        psg.seat_code_return !==
                                                            "" &&
                                                        passengerChoosedSeat
                                                            .ticket.id ===
                                                            item.id) ? (
                                                        <div className="col-md-6">
                                                            <div className="seat-selected-info">
                                                                <MdAirlineSeatReclineNormal className="seat-icon" />
                                                                <div>
                                                                    <Typography
                                                                        variant="body1"
                                                                        className="seat-name"
                                                                    >
                                                                        {chooseSeatFlight ===
                                                                        1
                                                                            ? psg.seat_code_return
                                                                            : psg.seat_code}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body1"
                                                                        className="seat-price"
                                                                    >
                                                                        {`+${
                                                                            chooseSeatFlight ===
                                                                            1
                                                                                ? formatCurrency(
                                                                                      psg.price_return
                                                                                  )
                                                                                : formatCurrency(
                                                                                      psg.price
                                                                                  )
                                                                        }`}
                                                                    </Typography>
                                                                </div>

                                                                <IoCloseSharp
                                                                    className="close-icon"
                                                                    onClick={
                                                                        passengerChoosedSeat
                                                                            .ticket
                                                                            .id ===
                                                                            item.id &&
                                                                        passengerChoosedSeat
                                                                            .data
                                                                            .id ===
                                                                            psg.id
                                                                            ? chooseSeatFlight ==
                                                                              0
                                                                                ? () =>
                                                                                      this.props.setSeatCodePassenger(
                                                                                          "",
                                                                                          psg.price
                                                                                      )
                                                                                : () =>
                                                                                      this.props.setSeatCodePassenger(
                                                                                          "",
                                                                                          psg.price_return
                                                                                      )
                                                                            : {}
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default BookingInfo;
