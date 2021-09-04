import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import FlightBookingDetail from "../BookingConfirm/Components/FlightBookingDetail/FlightBookingDetail";
import PassengerInfo from "../BookingConfirm/Components/PassengerInfo/PassengerInfo";
import ContactInfo from "../Reservations/Components/ContactInfo/ContactInfo";
import SearchFlightBar from "../SearchFlightBar/SearchFlightBar";
import UserService from "../../../User/Shared/UserService/UserService";
import ContactInfoBooking from "../BookingConfirm/Components/ContactInfo/ContactInfoBooking";
import "./ViewBookingInfo.scss";
import { Typography } from "@material-ui/core";
import { IoAirplane, IoCloudyNight } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { getTime } from "../../../../Helpers/DateTime/ConvertDateTime";
import Payment from "../BookingConfirm/Components/Payment/Payment";
import PaymentNoticeBox from "../BookingConfirm/Components/PaymentNoticeBox/PaymentNoticeBox";

class ViewBookingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            onCanceled: false,
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        const { code } = this.props.match.params;
        UserService.getBookingInfoWithCode(code)
            .then((res) => {
                this.setState({
                    data: res.data,
                });
            })
            .catch((err) => {
                this.setState({
                    onCanceled: true,
                });
            });
    };

    render() {
        const { data, onCanceled } = this.state;
        let bookingData = [];
        bookingData.push(data);
        let flight = "";
        let ticket = "";
        let departure = "";
        let destination = "";
        let bookingTime = "";
        if (Object.keys(data).length > 0 && !onCanceled) {
            flight = Object.assign({}, data.flight);
            ticket = Object.assign({}, data.ticket);
            departure = Object.assign({}, flight.departure);
            destination = Object.assign({}, flight.destination);
            bookingTime = new Date(data.booking_date);
            bookingTime.setHours(bookingTime.getHours() + 2);
        }

        return (
            <div>
                <SubNavbar />
                <SearchFlightBar />
                <div className="view-booking-info">
                    <div className="wrap-container">
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
                                {data.payment_status == 0 && !onCanceled ? (
                                    <Typography
                                        className="notice-title"
                                        variant="h6"
                                    >
                                        {`You have successfully booked, your booking code is: `}
                                        <span
                                            style={{ color: "#7b61f2" }}
                                        >{`#${data.booking_code}`}</span>
                                    </Typography>
                                ) : (
                                    <Typography
                                        className="notice-title"
                                        variant="h6"
                                        style={{ color: "red" }}
                                    >
                                        {`The booking was not found or has been canceled  `}
                                    </Typography>
                                )}

                                {data.payment_status == 0 && !onCanceled ? (
                                    <Typography
                                        variant="h6"
                                        className="notice-alert"
                                    >
                                        Please pay before{" "}
                                        <span className="time">
                                            {" "}
                                            {getTime(bookingTime)}{" "}
                                        </span>
                                        today, after this time if you Customer
                                        has not paid the request booking will be
                                        canceled
                                    </Typography>
                                ) : data.payment_status == 1 && !onCanceled ? (
                                    <Typography
                                        variant="h6"
                                        className="notice-payment-success"
                                    >
                                        You have successfully paid
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        {data.payment_status == 0 &&
                        data.payment_method == 3 &&
                        !onCanceled ? (
                            <Payment
                                data={bookingData}
                                onPaymentBooking={this.onPaymentBooking}
                            />
                        ) : data.payment_status === 0 &&
                          data.payment_method === 2 &&
                          !onCanceled ? (
                            <PaymentNoticeBox data={bookingData} />
                        ) : (
                            ""
                        )}
                        {!onCanceled && Object.keys(data).length > 0 ? (
                            <FlightBookingDetail
                                flight={flight}
                                departure={departure}
                                destination={destination}
                                ticket={ticket}
                            />
                        ) : (
                            ""
                        )}

                        {/* <PassengerInfo
                            passengers={bookingData[0].passenger}
                            bookings={bookingData}
                        /> */}
                        {!onCanceled && Object.keys(data).length > 0 ? (
                            <ContactInfoBooking booking={data} />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewBookingInfo;
