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
import BookingDetails from "../BookingDetails/BookingDetails";
import TicketDetails from "../../../Reservations/Components/TicketDetails/TicketDetails";
import SeatPriceInfo from "./SeatPriceInfo/SeatPriceInfo";
class FlightSeatSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumberFrom: 1,
            passengerChooseSeat: "",
            bookingInfo: {},
            seatReserveFee: 0,
        };
    }

    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {
        let { bookingInfo, updateData } = nextProps;
        if (updateData) {
            let passengers = bookingInfo.passengers;
            passengers.forEach((item) => {
                (item["seat_code"] = ""), (item["price"] = "");
            });
            bookingInfo.passengers = passengers;
            this.setState({
                bookingInfo: bookingInfo,
            });
        }
    };

    setPassengerSeat = (data) => {
        this.setState({
            passengerChooseSeat: data,
        });
    };

    setSeatCodeForPassengerChoosed = (seatCode, price) => {
        let { passengerChooseSeat, bookingInfo, seatReserveFee } = this.state;
        let seatFee = 0;
        let seatCodeRemove = "";
        let { passengers } = bookingInfo;
        let intoMoney = bookingInfo.ticket.into_money;
        passengers.forEach((item) => {
            if (item.id === passengerChooseSeat.id) {
                if (
                    item["seat_code"] !== "" &&
                    item["seat_code"] !== seatCode &&
                    seatCode !== ""
                ) {
                    seatCodeRemove = item["seat_code"];
                    intoMoney -= item["price"];
                } else if (seatCode == "") {
                    seatCodeRemove = item["seat_code"];
                }
                item["seat_code"] = seatCode;
                item["price"] = price;
                if (seatCode !== "") {
                    intoMoney += price;
                } else {
                    intoMoney -= price;
                }
                UserService.chooseSeatFlight(bookingInfo.ticket_id, {
                    seat_code: seatCode,
                    seat_code_remove: seatCodeRemove,
                }).then((res) => {
                    console.log("choose seat success");
                });
            }
            if (item["seat_code"] !== "") {
                seatFee += item["price"];
            }
        });

        seatReserveFee = seatFee;
        bookingInfo.ticket.into_money = intoMoney;
        bookingInfo.into_money = intoMoney;
        bookingInfo.passengers = passengers;
        this.props.updateBookingInfo(bookingInfo);
        this.setState({ bookingInfo, seatReserveFee });
    };

    render() {
        const { flightInfo, seatsReserved, onContinue } = this.props;
        const { bookingInfo, passengerChooseSeat, seatReserveFee } = this.state;
        const prices = flightInfo.price;
        const ticket = Object.assign({}, flightInfo.ticket);
        let businessSeatPrice = ticket.business_seat_fee;
        let economySeatPrice = ticket.economy_seat_fee;
        let firstEconomySeatPrice = ticket.deluxe_seat_fee;
        let emergencyExitSeatPrice = ticket.exit_seat_fee;
        const capacity = flightInfo.capacity;
        const businessSeats = flightInfo.business_seats;
        const firstEconomySeats = flightInfo.first_economy_seats;
        const economySeats = flightInfo.economy_seats;
        const emergencyExitSeats = flightInfo.exit_seats;

        // if (onContinue) {
        //     // this.props.updateBookingInfo(bookingInfo);
        // }
        return (
            <div>
                <div className="flight-seat-selection">
                    <div className="row">
                        <div className="col-md-4">
                            <TicketDetails
                                data={bookingInfo.ticket}
                                seatReserveFee={seatReserveFee}
                            />
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
                        <div className="col-md-2">
                            <SeatPriceInfo
                                businessPrice={businessSeatPrice}
                                economyPrice={economySeatPrice}
                                deluxePrice={firstEconomySeatPrice}
                                exitPrice={emergencyExitSeatPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightSeatSelection;
