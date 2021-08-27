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
import BookingInfo from "../BookingInfo/BookingInfo";
import UserService from "../../../../Shared/UserService/UserService";
import { forEach } from "lodash";
class FlightSeatSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumberFrom: 1,
            passengerChooseSeat: "",
            bookingInfo: {},
        };
    }

    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {
        let { bookingInfo } = nextProps;
        let passengers = bookingInfo.passengers;
        passengers.forEach((item) => {
            (item["seat_code"] = ""), (item["price"] = "");
        });
        bookingInfo.passengers = passengers;
        this.setState({
            bookingInfo: bookingInfo,
        });
    };

    setPassengerSeat = (data) => {
        this.setState({
            passengerChooseSeat: data,
        });
    };

    setSeatCodeForPassengerChoosed = (seatCode, price) => {
        let { passengerChooseSeat, bookingInfo } = this.state;
        let { passengers } = bookingInfo;
        passengers.forEach((item) => {
            if (item.id === passengerChooseSeat.id) {
                item["seat_code"] = seatCode;
                item["price"] = price;
            }
        });
        bookingInfo.passengers = passengers;
        this.setState({ bookingInfo });
        console.log("b", bookingInfo);
    };

    render() {
        const { flightInfo, seatsReserved } = this.props;
        const { bookingInfo, passengerChooseSeat } = this.state;
        const prices = flightInfo.price;
        let businessSeatPrice = 0;
        let economySeatPrice = 0;
        let firstEconomySeatPrice = 0;
        let emergencyExitSeatPrice = 0;
        if (Array.isArray(prices)) {
            prices.forEach((item) => {
                if (item.class === 1) businessSeatPrice = item.price;
                if (item.class === 2) firstEconomySeatPrice = item.price;
                if (item.class === 3) economySeatPrice = item.price;
                if (item.class === 4) emergencyExitSeatPrice = item.price;
            });
        }

        const capacity = flightInfo.capacity;
        const businessSeats = flightInfo.business_seats;
        const firstEconomySeats = flightInfo.first_economy_seats;
        const economySeats = flightInfo.economy_seats;
        const emergencyExitSeats = flightInfo.exit_seats;
        return (
            <div>
                <div className="flight-seat-selection">
                    <div className="row">
                        <div className="col-md-4">
                            <BookingInfo
                                bookingInfo={bookingInfo}
                                passengerChoosedSeat={
                                    this.state.passengerChooseSeat
                                }
                                setPassengerSeat={this.setPassengerSeat}
                                setSeatCodePassenger={
                                    this.setSeatCodeForPassengerChoosed
                                }
                            />
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
                                                seats={businessSeats}
                                                rowNumberFrom={1}
                                                price={businessSeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                            <FirstEconomySeat
                                                seats={firstEconomySeats}
                                                rowNumberFrom={
                                                    businessSeats / 6 + 1
                                                }
                                                price={firstEconomySeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                            <EconomySeat
                                                seats={30}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    1
                                                }
                                                price={economySeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                        </div>
                                        <div className="carbin second-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={24}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    1
                                                }
                                                price={economySeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    1
                                                }
                                                price={emergencyExitSeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                        </div>
                                        <div className="carbin third-carbirn">
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={emergencyExitSeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                            <EconomySeat
                                                seats={54}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={economySeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                        </div>
                                        <div className="carbin fourth-carbirn">
                                            <LetterRow />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    1
                                                }
                                                price={emergencyExitSeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
                                                }
                                            />
                                        </div>
                                        <div className="carbin fifth-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={economySeats - 108}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={economySeatPrice}
                                                setSeatCodePassenger={
                                                    this
                                                        .setSeatCodeForPassengerChoosed
                                                }
                                                seatsReserved={seatsReserved}
                                                passengers={
                                                    bookingInfo.passengers
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
