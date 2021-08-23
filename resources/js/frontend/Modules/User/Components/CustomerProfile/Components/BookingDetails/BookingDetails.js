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

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            bookingData: {},
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        let data = this.props.location.state;
        UserService.getBookingInfo(data.id).then((res) => {
            this.setState({
                bookingData: res.data,
            });
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
        const { bookingData } = this.state;
        const flight = Object.assign({}, bookingData.flight);
        const ticket = Object.assign({}, bookingData.ticket);
        const departure = Object.assign({}, flight.departure);
        const destination = Object.assign({}, flight.destination);
        return (
            <div>
                <div className="booking-details">
                    {bookingData.status == 1 ? (
                        <AlertWarning message="Yêu cầu đặt vé đang chờ xác nhận" />
                    ) : bookingData.status == 2 ? (
                        <AlertSuccess message="Bạn đã đặt vé máy bay thành công" />
                    ) : (
                        ""
                    )}
                    <AlertSuccess message={this.state.message} />

                    {bookingData.payment_status === 0 &&
                    bookingData.payment_method == 2 ? (
                        <PaymentNoticeBox data={bookingData} />
                    ) : bookingData.payment_status === 0 &&
                      bookingData.payment_method == 3 &&
                      !this.state.paymentStatus ? (
                        <Payment
                            data={bookingData}
                            onPaymentBooking={this.onPaymentBooking}
                        />
                    ) : (
                        ""
                    )}

                    <FlightBookingDetail
                        flight={flight}
                        departure={departure}
                        destination={destination}
                        ticket={ticket}
                    />
                    <PassengerInfo
                        passengers={data.passenger}
                        ticket={ticket}
                        booking={bookingData}
                    />
                    <ContactInfoBooking booking={bookingData} />
                </div>
            </div>
        );
    }
}
export default BookingDetails;
