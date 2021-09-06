import React from "react";
import { Component } from "react";
import "./BonusServices.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import FlightSeatSelection from "./Components/FlightSeatSelection/FlightSeatSelection";
import UserService from "../../Shared/UserService/UserService";
import CheckoutBar from "./Components/CheckoutBar/CheckoutBar";
import { Redirect } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import FlightSeatReserve from "./Components/FlightSeatReserve/FlightSeatReserve";

class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusService: 0,
            flightsInfo: [],
            seatsReserved: [],
            bookingInfo: "",
            onContinue: false,
            updateData: true,
            redirect: false,
            onLoadingConfirm: false,
        };
    }

    bookingInfoUpdated = "";

    componentDidMount() {
        this.getBookingInfo();
        this.getSeatsFlightInfo();
        this.getFlightSeatReserved();
        this.getSeatReservedRealTime();
    }

    getSeatReservedRealTime = () => {
        window.Echo.channel("SeatFlight").listen(
            "ChooseSeatFlightEvent",
            (event) => {
                let { seatsReserved } = this.state;
                for (let i = 0; i < seatsReserved.length; i++) {
                    if (
                        seatsReserved[i].seat_code_reserved ==
                        event.message.seat_code_remove
                    ) {
                        seatsReserved.splice(i, 1);
                    }
                }
                const id = Math.floor(Math.random() * 1000000);
                const flight_id = event.message.flight.id;
                const seat_code_reserved = event.message.seat_code;
                seatsReserved.push({ id, flight_id, seat_code_reserved });
                this.setState({ seatsReserved });
            }
        );
    };

    getBookingInfo = () => {
        const bookingInfo = this.props.location.state;
        this.setState({ bookingInfo });
    };

    getFlightSeatReserved = () => {
        const bookingInfo = this.props.location.state;
        bookingInfo.ticket.forEach((item) => {
            UserService.getFlightSeats(item.id).then((res) => {
                this.setState({
                    seatsReserved: res.data,
                });
            });
        });
    };

    getSeatsFlightInfo = () => {
        const bookingInfo = this.props.location.state;
        let { flightsInfo } = this.state;
        bookingInfo.ticket.forEach((item) => {
            UserService.getSeatAndPriceFlightInfo(item.id).then((res) => {
                flightsInfo.push(res.data);
                this.setState({
                    flightsInfo,
                });
            });
        });
    };

    updateBookingInfo = (data) => {
        this.setState({
            updateData: false,
        });
        this.bookingInfoUpdated = data;
    };

    onContinueCheckout = async () => {
        this.setState({
            updateData: false,
            onContinue: true,
        });
        (await this.bookingInfoUpdated) !== "";
        if (this.bookingInfoUpdated !== "") {
            this.setState({
                onLoadingConfirm: true,
            });
            const data = {
                booking_date: this.bookingInfoUpdated.booking_date,
                trip_type: this.bookingInfoUpdated.trip_type,
                ticket_id: this.state.bookingInfo.ticket,
                vocative: this.bookingInfoUpdated.vocative,
                contact_name: this.bookingInfoUpdated.contact_name,
                contact_email: this.bookingInfoUpdated.contact_email,
                contact_phone: this.bookingInfoUpdated.contact_phone,
                address: this.bookingInfoUpdated.address,
                note: this.bookingInfoUpdated.note,
                payment_method: this.bookingInfoUpdated.payment_method,
                payment_status: this.bookingInfoUpdated.payment_status,
                into_money: this.bookingInfoUpdated.into_money,
                passengers: this.bookingInfoUpdated.passengers,
                user_id: this.bookingInfoUpdated.user_id,
                seat_fee: this.bookingInfoUpdated.seat_fee,
            };
            UserService.bookingFlightTicket(data)
                .then((res) => {
                    this.setState({
                        bookingInfo: res.data,
                        redirect: true,
                        onLoadingConfirm: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            window.scrollTo(0, 0);
        }
    };

    onChangeBonusService = (value) => {
        this.setState({
            bonusService: value,
        });
    };

    render() {
        const {
            flightsInfo,
            seatsReserved,
            bookingInfo,
            onContinue,
            updateData,
            redirect,
            bonusService,
        } = this.state;
        if (redirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/reservation/confirm",
                        state: bookingInfo,
                    }}
                />
            );
        }
        return (
            <div>
                <SubNavbar />
                <div className="bonus-services">
                    <div className="wrap-container">
                        <StepListBar step={3} />
                        <FlightSeatReserve
                            bonusService={bonusService}
                            onChangeBonusService={this.onChangeBonusService}
                        />
                        <FlightSeatSelection
                            onOpen={bonusService == 1}
                            updateData={updateData}
                            flightsInfo={flightsInfo}
                            bookingInfo={bookingInfo}
                            seatsReserved={seatsReserved}
                            updateBookingInfo={this.updateBookingInfo}
                            onContinue={onContinue}
                        />
                    </div>
                </div>
                <CheckoutBar
                    data={bookingInfo}
                    onContinue={this.onContinueCheckout}
                />
                <Backdrop
                    open={this.state.onLoadingConfirm}
                    style={{ zIndex: "1000" }}
                >
                    <CircularProgress
                        color="inherit"
                        style={{ color: "#ffff" }}
                    />
                </Backdrop>
            </div>
        );
    }
}
export default BonusServices;
