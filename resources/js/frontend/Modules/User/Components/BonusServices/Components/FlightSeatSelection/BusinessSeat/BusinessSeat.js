import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { BiRectangle } from "react-icons/bi";
import "./BusinessSeat.scss";
import { FaUserCheck } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";

class BusinessSeat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChooseSeatForPassenger = (rowNumber, code, price) => {
        this.props.setSeatCodePassenger(rowNumber + code, price);
    };

    render() {
        const { seats, price, rowNumberFrom, seatsReserved, passengers } =
            this.props;

        let seatsRow = [];
        let seatRowNumber = rowNumberFrom;

        for (let i = 0; i < seats / 6; i++) {
            const seatItem = { rowNumber: i, price, seatRowNumber };
            seatRowNumber++;
            seatsRow.push(seatItem);
        }

        let seatsLeft = [];
        let seatsRight = [];
        const seatsCodeLeft = ["A", "B", "C"];
        const seatsCodeRight = ["D", "E", "F"];

        for (let i = 0; i < seatsCodeLeft.length; i++) {
            const seatLeftItem = {
                seatCode: seatsCodeLeft[i],
            };
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
                if (item.seat_code === seatCurrent) {
                    result = true;
                }
            });
            return result;
        };

        return (
            <div>
                <div className="business-seat">
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
                                                onClick={() =>
                                                    this.onChooseSeatForPassenger(
                                                        item.seatRowNumber,
                                                        seat.seatCode,
                                                        item.price
                                                    )
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
                                                onClick={() =>
                                                    this.onChooseSeatForPassenger(
                                                        item.seatRowNumber,
                                                        seat.seatCode,
                                                        item.price
                                                    )
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
export default BusinessSeat;
