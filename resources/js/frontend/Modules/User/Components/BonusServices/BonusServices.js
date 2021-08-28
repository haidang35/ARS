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

class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightInfo: {},
            seatsReserved: [],
            bookingInfo: {},
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
                const flight_id = event.message.ticket.flight_id;
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
        UserService.getFlightSeats(bookingInfo.ticket_id).then((res) => {
            this.setState({
                seatsReserved: res.data,
            });
        });
    };

    getSeatsFlightInfo = () => {
        const data = this.props.location.state;
        UserService.getSeatAndPriceFlightInfo(data.ticket_id).then((res) => {
            this.setState({
                flightInfo: res.data,
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
                ticket_id: this.bookingInfoUpdated.ticket_id,
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
            };
            UserService.bookingFlightTicket(data)
                .then((res) => {
                    console.log(res.data);
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

    render() {
        const {
            flightInfo,
            seatsReserved,
            bookingInfo,
            onContinue,
            updateData,
            redirect,
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
                        <FlightSeatSelection
                            updateData={updateData}
                            flightInfo={flightInfo}
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
