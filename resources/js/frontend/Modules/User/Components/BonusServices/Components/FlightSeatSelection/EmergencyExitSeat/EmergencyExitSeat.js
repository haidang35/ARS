import React from "react";
import { Component } from "react";
import "./EmergencyExitSeat.scss";
import { Typography } from "@material-ui/core";
import { BiRectangle } from "react-icons/bi";

class EmergencyExitSeat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { seats, price, rowNumberFrom } = this.props;
        let seatsRow = [];
        let seatRowNumber = rowNumberFrom;
        for (let i = 0; i < seats / 6; i++) {
            const seatItem = { rowNumber: i, price: 5000, seatRowNumber };
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
        return (
            <div>
                <div className="emergency-exit-seat">
                    {seatsRow.map((item) => {
                        return (
                            <div key={item.rowNumber} className="seats-row">
                                <div className="seat-list-left">
                                    {seatsLeft.map((seat) => {
                                        return (
                                            <div
                                                key={seat.seatCode}
                                                className="seat-item"
                                                onClick={() =>
                                                    console.log(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                }
                                            >
                                                <BiRectangle className="seat-icon" />
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
                                                className="seat-item"
                                                onClick={() =>
                                                    console.log(
                                                        item.seatRowNumber +
                                                            seat.seatCode
                                                    )
                                                }
                                            >
                                                <BiRectangle className="seat-icon" />
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
export default EmergencyExitSeat;
