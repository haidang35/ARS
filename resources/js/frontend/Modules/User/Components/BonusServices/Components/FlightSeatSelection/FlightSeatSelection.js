import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./FlightSeatSelection.scss";
import { IoIosArrowForward } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BiRectangle } from "react-icons/bi";
import LetterRow from "./LetterRow/LetterRow";
import { Business } from "@material-ui/icons";
import BusinessSeat from "./BusinessSeat/BusinessSeat";
import FirstEconomySeat from "./FirstEconomySeat/FirstEconomySeat";
import EconomySeat from "./EconomySeat/EconomySeat";
import EmergencyExitSeat from "./EmergencyExitSeat/EmergencyExitSeat";

class FlightSeatSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumberFrom: 1,
        };
    }

    componentDidMount() {
        this.getFlightInfo();
    }

    getFlightInfo = () => {};

    render() {
        const businessSeats = 18;
        const firstEconomySeats = 18;
        const economySeats = 162;
        const emergencyExitSeats = 18;
        return (
            <div>
                <div className="flight-seat-selection">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="passenger-list">
                                <div className="title-box">
                                    <Typography variant="h6">
                                        Hà Nội{" "}
                                    </Typography>
                                    <span> - </span>
                                    <Typography variant="h6">
                                        {" "}
                                        Đà Nẵng
                                    </Typography>
                                </div>
                                <div className="passengers-box">
                                    <div className="passenger-item">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography
                                                    className="passenger-name"
                                                    variant="body1"
                                                >
                                                    Nguyễn Hải Đăng
                                                </Typography>
                                                <Typography
                                                    className="seat-status"
                                                    variant="body1"
                                                >
                                                    Chọn chỗ ngồi của bạn
                                                    <IoIosArrowForward className="icon-arrow" />
                                                </Typography>
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                    </div>
                                    <div className="passenger-item">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography
                                                    className="passenger-name"
                                                    variant="body1"
                                                >
                                                    Nguyễn Hải Đăng
                                                </Typography>
                                                <Typography
                                                    className="seat-status seat-status-active"
                                                    variant="body1"
                                                >
                                                    <ImCheckmark className="checked-icon" />
                                                    Đã thêm chỗ ngồi
                                                </Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="seat-selected-info">
                                                    <MdAirlineSeatReclineNormal className="seat-icon" />
                                                    <div>
                                                        <Typography
                                                            variant="body1"
                                                            className="seat-name"
                                                        >
                                                            7A
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            className="seat-price"
                                                        >
                                                            +44.000
                                                        </Typography>
                                                    </div>

                                                    <IoCloseSharp className="close-icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="seat-map">
                                <div className="title-box">
                                    <Typography className="title" variant="h6">
                                        Chọn chỗ ngồi
                                    </Typography>
                                </div>
                                <div className="seats-diagram">
                                    <div className="seat-list">
                                        <div className="carbin first-carbin">
                                            <LetterRow />
                                            <BusinessSeat
                                                seats={18}
                                                rowNumberFrom={1}
                                            />
                                            <FirstEconomySeat
                                                seats={18}
                                                rowNumberFrom={18 / 6 + 1}
                                            />
                                            <EconomySeat
                                                seats={30}
                                                rowNumberFrom={
                                                    18 / 6 + 18 / 6 + 1
                                                }
                                            />
                                        </div>
                                        <div className="carbin second-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={24}
                                                rowNumberFrom={
                                                    18 / 6 + 18 / 6 + 30 / 6 + 1
                                                }
                                            />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    18 / 6 +
                                                    18 / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    1
                                                }
                                            />
                                        </div>
                                        <div className="carbin third-carbirn">
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    18 / 6 +
                                                    18 / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                            />
                                            <EconomySeat
                                                seats={54}
                                                rowNumberFrom={
                                                    18 / 6 +
                                                    18 / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                            />
                                        </div>
                                        <div className="carbin fourth-carbirn">
                                            <LetterRow />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    18 / 6 +
                                                    18 / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    1
                                                }
                                            />
                                        </div>
                                        <div className="carbin fifth-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={54}
                                                rowNumberFrom={
                                                    18 / 6 +
                                                    18 / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightSeatSelection;
