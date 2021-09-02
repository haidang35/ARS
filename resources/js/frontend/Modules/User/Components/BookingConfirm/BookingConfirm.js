import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import "./BookingConfirm.scss";
import { GiCommercialAirplane, GiTrumpet } from "react-icons/gi";
import { IoAirplane, IoCloudyNight } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import FlightBookingDetail from "./Components/FlightBookingDetail/FlightBookingDetail";
import PassengerInfo from "./Components/PassengerInfo/PassengerInfo";
import ContactInfo from "../Reservations/Components/ContactInfo/ContactInfo";
import ContactInfoBooking from "./Components/ContactInfo/ContactInfoBooking";
import { getTime } from "../../../../Helpers/DateTime/ConvertDateTime";
import Payment from "./Components/Payment/Payment";
import UserService from "../../../User/Shared/UserService/UserService";
import SearchFlightBar from "../SearchFlightBar/SearchFlightBar";
import ChatBox from "../ChatBox/ChatBox";
import PaymentNoticeBox from "./Components/PaymentNoticeBox/PaymentNoticeBox";

class BookingConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingsInfo: [],
            updateData: false,
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        const data = this.props.location.state;
        const { bookingsInfo } = this.state;
        data.forEach((item) => {
            UserService.getBookingInfo(item.id).then((res) => {
                bookingsInfo.push(res.data);
                this.setState({ bookingsInfo });
            });
        });
    };

    onPaymentBooking = () => {
        const data = this.props.location.state;
        UserService.paymentBooking(data[0].id, { payment_status: 1 }).then(
            (res) => {
                this.getBookingInfo();
            }
        );
    };

    render() {
        const { bookingsInfo, updateData } = this.state;
        let bookingTime = "";
        let paymentMethod = 0;
        let checkHasBookingInfo = false;
        let checkPayment = GiTrumpet;
        if (bookingsInfo.length > 0) {
            checkHasBookingInfo = true;
            paymentMethod = bookingsInfo[0].payment_method;
            bookingTime = new Date(bookingsInfo[0].booking_date);
            bookingTime.setHours(bookingTime.getHours() + 5);
        }
        bookingsInfo.forEach((item) => {
            if (item.payment_status == 0) {
                checkPayment = false;
            }
        });

        return (
            <div>
                <SubNavbar />
                <SearchFlightBar />
                <div className="booking-confirm">
                    <div className="wrap-container">
                        <StepListBar step={3} />
                        <div className="main-content">
                            <div className="confirm-notice">
                                <div className="title-box">
                                    <Typography variant="h4" className="title">
                                        Notice of booking status
                                    </Typography>
                                </div>
                                <div className="content">
                                    <div className="animation-flight">
                                        <FaCloud className="cloud-icon" />
                                        <IoAirplane className="flight-icon" />

                                        <FaCloud className="cloud-icon cloud-1" />
                                        <FaCloud className="cloud-icon cloud-2" />
                                    </div>
                                    {checkHasBookingInfo ? (
                                        <Typography
                                            className="notice-title"
                                            variant="h6"
                                        >
                                            {`You have successfully booked, your booking code is: `}
                                            <span
                                                style={{
                                                    color: "#7b61f2",
                                                }}
                                            >{`#${bookingsInfo[0].booking_code}`}</span>
                                        </Typography>
                                    ) : (
                                        ""
                                    )}

                                    {!checkPayment ? (
                                        <Typography
                                            variant="h6"
                                            className="notice-alert"
                                        >
                                            Please pay before{" "}
                                            <span className="time">
                                                {" "}
                                                {getTime(bookingTime)}{" "}
                                            </span>
                                            today, after this time if you
                                            Customer has not paid the request
                                            booking will be canceled
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h6"
                                            className="notice-payment-success"
                                        >
                                            You have successfully paid
                                        </Typography>
                                    )}
                                </div>
                            </div>
                            {paymentMethod === 3 && !checkPayment ? (
                                <Payment
                                    data={bookingsInfo}
                                    onPaymentBooking={this.onPaymentBooking}
                                />
                            ) : paymentMethod === 2 && !checkPayment ? (
                                <PaymentNoticeBox data={bookingsInfo} />
                            ) : (
                                ""
                            )}

                            {bookingsInfo.map((item) => {
                                return (
                                    <FlightBookingDetail
                                        key={item.id}
                                        flight={item.flight}
                                        ticket={item.ticket}
                                        destination={item.flight.destination}
                                        departure={item.flight.departure}
                                    />
                                );
                            })}

                            {checkHasBookingInfo ? (
                                <PassengerInfo
                                    passengers={bookingsInfo[0].passenger}
                                    ticket={bookingsInfo[0].ticket}
                                    bookings={bookingsInfo}
                                />
                            ) : (
                                ""
                            )}
                            {checkHasBookingInfo ? (
                                <ContactInfoBooking booking={bookingsInfo[0]} />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <ChatBox />
            </div>
        );
    }
}
export default BookingConfirm;
