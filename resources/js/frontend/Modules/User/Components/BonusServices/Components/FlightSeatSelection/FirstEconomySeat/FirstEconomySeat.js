import React from "react";
import { Component } from "react";
import "./FirstEconomySeat.scss";
import { Typography } from "@material-ui/core";
import { BiRectangle } from "react-icons/bi";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";

class FirstEconomySeat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChooseSeatForPassenger = (rowNumber, code, price) => {
        this.props.setSeatCodePassenger(rowNumber + code, price);
    };

    render() {
        const {
            seats,
            price,
            rowNumberFrom,
            seatsReserved,
            passengers,
            ticketChoosed,
        } = this.props;
        let passengerList = [];
        if (Array.isArray(passengers)) {
            passengerList = passengers;
        }
        let seatsRow = [];
        let seatRowNumber = rowNumberFrom;
        for (let i = 0; i < seats / 6; i++) {
            const seatItem = { rowNumber: i, price: price, seatRowNumber };
            seatRowNumber++;
            seatsRow.push(seatItem);
        }
        let seatsLeft = [];
        let seatsRight = [];
        const seatsCodeLeft = ["A", "B", "C"];
        const seatsCodeRight = ["D", "E", "F"];

        for (let i = 0; i < seatsCodeLeft.length; i++) {
            const seatLeftItem = { seatCode: seatsCodeLeft[i] };
            seatsLeft.push(seatLeftItem);
        }
        for (let i = 0; i < seatsCodeRight.length; i++) {
            const seatRightItem = {
                seatCode: seatsCodeRight[i],
            };
            seatsRight.push(seatRightItem);
        }

        const checkSeatReserved = (seatCurrent) => {
            let result = false;
            seatsReserved.forEach((item) => {
                if (item.seat_code_reserved === seatCurrent) {
                    result = true;
                }
            });
            return result;
        };

        const checkSeatChoosed = (seatCurrent) => {
            let result = false;
            passengers.forEach((item) => {
                if (ticketChoosed === 0) {
                    if (item.seat_code === seatCurrent) {
                        result = true;
                    }
                } else if (ticketChoosed === 1) {
                    if (item.seat_code_return === seatCurrent) {
                        result = true;
                    }
                }
            });
            return result;
        };

        return (
            <div>
                <div className="first-economy-seat">
                    {seatsRow.map((item) => {
                        return (
                            <div key={item.rowNumber} className="seats-row">
                                <div className="seat-list-left">
                                    {seatsLeft.map((seat) => {
                                        return (
                                            <div
                                                key={seat.seatCode}
                                                className={`seat-item ${
                                                    checkSeatReserved(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    ) ||
                                                    checkSeatChoosed(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                        ? `seat-reserved`
                                                        : ``
                                                }`}
                                                onClick={
                                                    !checkSeatReserved(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    ) &&
                                                    !checkSeatChoosed(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                        ? () =>
                                                              this.onChooseSeatForPassenger(
                                                                  item.seatRowNumber,
                                                                  seat.seatCode,
                                                                  item.price
                                                              )
                                                        : () => {}
                                                }
                                            >
                                                {checkSeatReserved(
                                                    item.seatRowNumber +
                                                        seat.seatCode
                                                ) ? (
                                                    <MdDoNotDisturbAlt className="icon-prevent" />
                                                ) : checkSeatChoosed(
                                                      item.seatRowNumber +
                                                          seat.seatCode
                                                  ) ? (
                                                    <FaUserCheck className="icon-checked" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="number-list">
                                    <div>
                                        <Typography
                                            className="number-item"
                                            variant="body1"
                                        >
                                            {item.seatRowNumber}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="seat-list-right">
                                    {seatsRight.map((seat) => {
                                        return (
                                            <div
                                                key={seat.seatCode}
                                                className={`seat-item ${
                                                    checkSeatReserved(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    ) ||
                                                    checkSeatChoosed(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                        ? `seat-reserved`
                                                        : ``
                                                }`}
                                                onClick={
                                                    !checkSeatReserved(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    ) &&
                                                    !checkSeatChoosed(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                        ? () =>
                                                              this.onChooseSeatForPassenger(
                                                                  item.seatRowNumber,
                                                                  seat.seatCode,
                                                                  item.price
                                                              )
                                                        : () => {}
                                                }
                                            >
                                                {checkSeatReserved(
                                                    item.seatRowNumber +
                                                        seat.seatCode
                                                ) ? (
                                                    <MdDoNotDisturbAlt className="icon-prevent" />
                                                ) : checkSeatChoosed(
                                                      item.seatRowNumber +
                                                          seat.seatCode
                                                  ) ? (
                                                    <FaUserCheck className="icon-checked" />
                                                ) : (
                                                    ""
                                                )}
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
export default FirstEconomySeat;
