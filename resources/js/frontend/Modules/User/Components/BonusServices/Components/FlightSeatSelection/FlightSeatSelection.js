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
            seatReserveFeeReturn: 0,
            chooseSeatFlight: 0,
            ticketChoosed: {},
        };
    }

    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {
        let { bookingInfo, updateData } = nextProps;
        if (updateData) {
            let passengers = bookingInfo.passengers;
            passengers.forEach((item) => {
                (item["seat_code"] = ""), (item["price"] = "");
                item["seat_code_return"] = "";
                item["price_return"];
                item["tickets"] = bookingInfo.ticket;
            });

            bookingInfo.passengers = passengers;
            this.setState({
                bookingInfo: bookingInfo,
                ticketChoosed: bookingInfo.ticket[0],
            });
        }
    };

    setPassengerSeat = (data, ticket) => {
        let { passengerChooseSeat, ticketChoosed, chooseSeatFlight } =
            this.state;
        const tripType = JSON.parse(window.localStorage.getItem("tripType"));
        passengerChooseSeat = {
            data,
            ticket,
        };
        if (tripType == 1) {
            chooseSeatFlight = 0;
            ticketChoosed = ticket;
        } else if (ticket.id !== ticketChoosed.id) {
            chooseSeatFlight = chooseSeatFlight === 0 ? 1 : 0;
            ticketChoosed = ticket;
        }

        this.setState({
            passengerChooseSeat,
            chooseSeatFlight,
            ticketChoosed,
        });
    };

    setSeatCodeForPassengerChoosed = (seatCode, price) => {
        let {
            passengerChooseSeat,
            bookingInfo,
            seatReserveFee,
            chooseSeatFlight,
            seatReserveFeeReturn,
            ticketChoosed,
        } = this.state;
        let seatCodeRemove = "";
        let { passengers } = bookingInfo;
        let intoMoney = bookingInfo.into_money;
        if (chooseSeatFlight == 0) {
            passengers.forEach((item) => {
                if (item.id === passengerChooseSeat.data.id) {
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
                    UserService.chooseSeatFlight(ticketChoosed.flight_id, {
                        seat_code: seatCode,
                        seat_code_remove: seatCodeRemove,
                    }).then((res) => {
                        console.log("choose seat success");
                    });

                    if (item["seat_code"] !== "") {
                        seatReserveFee += item["price"];
                    } else {
                        seatReserveFee -= item["price"];
                    }
                }
            });
        } else if (chooseSeatFlight == 1) {
            passengers.forEach((item) => {
                if (item.id === passengerChooseSeat.data.id) {
                    if (
                        item["seat_code_return"] !== "" &&
                        item["seat_code_return"] !== seatCode &&
                        seatCode !== ""
                    ) {
                        seatCodeRemove = item["seat_code_return"];
                        intoMoney -= item["price_return"];
                    } else if (seatCode == "") {
                        seatCodeRemove = item["seat_code_return"];
                    }
                    item["seat_code_return"] = seatCode;
                    item["price_return"] = price;
                    if (seatCode !== "") {
                        intoMoney += price;
                    } else {
                        intoMoney -= price;
                    }
                    UserService.chooseSeatFlight(ticketChoosed.flight_id, {
                        seat_code: seatCode,
                        seat_code_remove: seatCodeRemove,
                    }).then((res) => {
                        console.log("choose seat success");
                    });
                    if (item["seat_code_return"] !== "") {
                        seatReserveFeeReturn += item["price_return"];
                    } else {
                        seatReserveFeeReturn -= item["price_return"];
                    }
                }
            });
        }
        bookingInfo.ticket[0]["seatFee"] = seatReserveFee;
        if (bookingInfo.trip_type == 2) {
            bookingInfo.ticket[1]["seatFee"] = seatReserveFeeReturn;
        }

        bookingInfo.ticket.into_money = intoMoney;
        bookingInfo.into_money = intoMoney;
        bookingInfo.passengers = passengers;
        this.props.updateBookingInfo(bookingInfo);
        this.setState({ bookingInfo, seatReserveFee, seatReserveFeeReturn });
    };

    render() {
        let { flightsInfo, seatsReserved, onContinue, onOpen } = this.props;
        const {
            bookingInfo,
            passengerChooseSeat,
            seatReserveFee,
            chooseSeatFlight,
            ticketChoosed,
            seatReserveFeeReturn,
        } = this.state;
        seatsReserved = seatsReserved.filter((item) => {
            return item.flight_id == ticketChoosed.id;
        });
        let ticket = {};
        let businessSeatPrice = 0;
        let economySeatPrice = 0;
        let firstEconomySeatPrice = 0;
        let emergencyExitSeatPrice = 0;
        let capacity = 0;
        let businessSeats = 0;
        let firstEconomySeats = 0;
        let economySeats = 0;
        let emergencyExitSeats = 0;
        if (Array.isArray(flightsInfo) && flightsInfo.length > 0) {
            ticket = Object.assign({}, flightsInfo[chooseSeatFlight].ticket);
            businessSeatPrice = ticket.business_seat_fee;
            economySeatPrice = ticket.economy_seat_fee;
            firstEconomySeatPrice = ticket.deluxe_seat_fee;
            emergencyExitSeatPrice = ticket.exit_seat_fee;
            capacity = flightsInfo[chooseSeatFlight].capacity;
            businessSeats = flightsInfo[chooseSeatFlight].business_seats;
            firstEconomySeats =
                flightsInfo[chooseSeatFlight].first_economy_seats;
            economySeats = flightsInfo[chooseSeatFlight].economy_seats;
            emergencyExitSeats = flightsInfo[chooseSeatFlight].exit_seats;
        }

        return (
            <div>
                {onOpen ? (
                    <div className="flight-seat-selection">
                        <div className="row">
                            <div className="col-md-4">
                                <TicketDetails
                                    data={bookingInfo.ticket}
                                    intoMoney={bookingInfo.into_money}
                                    seatReserveFee={seatReserveFee}
                                    seatReserveFeeReturn={seatReserveFeeReturn}
                                    dataRoundTrip={""}
                                />
                                <BookingInfo
                                    bookingInfo={bookingInfo}
                                    chooseSeatFlight={chooseSeatFlight}
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
                                        <Typography
                                            className="title"
                                            variant="h6"
                                        >
                                            Chọn chỗ ngồi{" "}
                                            {`${flightsInfo[chooseSeatFlight].departure.city} - ${flightsInfo[chooseSeatFlight].destination.city} `}
                                        </Typography>
                                    </div>
                                    <div className="seats-diagram">
                                        <div className="seat-list">
                                            <div className="carbin first-carbin">
                                                <LetterRow />
                                                <BusinessSeat
                                                    ticketChoosed={
                                                        chooseSeatFlight
                                                    }
                                                    seats={businessSeats}
                                                    rowNumberFrom={1}
                                                    price={businessSeatPrice}
                                                    setSeatCodePassenger={
                                                        this
                                                            .setSeatCodeForPassengerChoosed
                                                    }
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
                                                    passengers={
                                                        bookingInfo.passengers
                                                    }
                                                />
                                                <FirstEconomySeat
                                                    seats={firstEconomySeats}
                                                    rowNumberFrom={
                                                        businessSeats / 6 + 1
                                                    }
                                                    price={
                                                        firstEconomySeatPrice
                                                    }
                                                    setSeatCodePassenger={
                                                        this
                                                            .setSeatCodeForPassengerChoosed
                                                    }
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    price={
                                                        emergencyExitSeatPrice
                                                    }
                                                    setSeatCodePassenger={
                                                        this
                                                            .setSeatCodeForPassengerChoosed
                                                    }
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    price={
                                                        emergencyExitSeatPrice
                                                    }
                                                    setSeatCodePassenger={
                                                        this
                                                            .setSeatCodeForPassengerChoosed
                                                    }
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    price={
                                                        emergencyExitSeatPrice
                                                    }
                                                    setSeatCodePassenger={
                                                        this
                                                            .setSeatCodeForPassengerChoosed
                                                    }
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                                                    seatsReserved={
                                                        seatsReserved
                                                    }
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
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default FlightSeatSelection;
