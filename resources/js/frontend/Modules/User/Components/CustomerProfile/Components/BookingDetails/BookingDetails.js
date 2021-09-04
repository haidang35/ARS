import React from "react";
import { Component } from "react";
import ContactInfoBooking from "../../../BookingConfirm/Components/ContactInfo/ContactInfoBooking";
import FlightBookingDetail from "../../../BookingConfirm/Components/FlightBookingDetail/FlightBookingDetail";
import PassengerInfo from "../../../BookingConfirm/Components/PassengerInfo/PassengerInfo";
import "./BookingDetails.scss";
import AlertWarning from "../../../../../../Shared/Components/Alert/AlertWarning";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import PaymentNoticeBox from "../../../BookingConfirm/Components/PaymentNoticeBox/PaymentNoticeBox";
import Payment from "../../../BookingConfirm/Components/Payment/Payment";
import UserService from "../../../../Shared/UserService/UserService";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            bookingData: [],
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        let data = this.props.location.state;
        let { bookingData } = this.state;
        UserService.getBookingInfo(data.id).then((res) => {
            bookingData.push(res.data);
            this.setState({ bookingData });
        });
    };

    onPaymentBooking = () => {
        let data = this.props.location.state;
        UserService.paymentBooking(data.id, { payment_status: 1 }).then(
            (res) => {
                this.setState({
                    message: "Bạn đã thanh toán thành công",
                });
                this.getBookingInfo();
            }
        );
    };

    render() {
        let data = this.props.location.state;
        let { bookingData } = this.state;
        let flight = "";
        let ticket = "";
        let departure = "";
        let destination = "";
        let hasData = false;
        let bookingTime = "";
        let checkPayment = false;
        let paymentMethod = 0;
        if (bookingData.length > 0) {
            hasData = true;
            flight = Object.assign({}, bookingData[0].flight);
            ticket = Object.assign({}, bookingData[0].ticket);
            departure = Object.assign({}, flight.departure);
            destination = Object.assign({}, flight.destination);
            bookingTime = new Date(bookingData[0].booking_date);
            bookingTime.setHours(bookingTime.getHours() + 5);
            paymentMethod = bookingData[0].payment_method;
        }

        bookingData.forEach((item) => {
            if (item.payment_status == 1) {
                checkPayment = true;
            }
        });

        return (
            <div>
                {hasData ? (
                    <div className="booking-details">
                        {bookingData[0].payment_status == 0 ? (
                            <AlertWarning
                                message={`Please make your payment by ${getTime(
                                    bookingTime
                                )}`}
                            />
                        ) : bookingData[0].payment_status == 1 ? (
                            <AlertSuccess message="Thanks for your payment." />
                        ) : (
                            ""
                        )}
                        <AlertSuccess message={this.state.message} />

                        {paymentMethod === 3 && !checkPayment ? (
                            <Payment
                                data={bookingData}
                                onPaymentBooking={this.onPaymentBooking}
                            />
                        ) : paymentMethod === 2 && !checkPayment ? (
                            <PaymentNoticeBox data={bookingData} />
                        ) : (
                            ""
                        )}

                        {bookingData.map((item) => {
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

                        <PassengerInfo
                            passengers={bookingData[0].passenger}
                            ticket={bookingData[0].ticket}
                            bookings={bookingData}
                        />

                        <ContactInfoBooking booking={bookingData[0]} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default BookingDetails;
