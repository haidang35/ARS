import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import "./BookingConfirm.scss";
import { GiCommercialAirplane } from "react-icons/gi";
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

class BookingConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingInfo: {},
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        const data = this.props.location.state;
        UserService.getBookingInfo(data.id).then((res) => {
            this.setState({
                bookingInfo: res.data,
            });
        });
    };

    onPaymentBooking = () => {
        const data = this.props.location.state;
        const bookingId = data.id;
        UserService.paymentBooking(bookingId, { payment_status: 1 }).then(
            (res) => {
                this.getBookingInfo();
            }
        );
    };

    render() {
        const { bookingInfo } = this.state;
        const flight = Object.assign({}, bookingInfo.flight);
        const departure = Object.assign({}, flight.departure);
        const destination = Object.assign({}, flight.destination);
        const ticket = Object.assign({}, bookingInfo.ticket);
        let bookingTime = new Date(bookingInfo.booking_date);
        bookingTime.setHours(bookingTime.getHours() + 2);
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
                                        Thông báo tình trạng đặt vé
                                    </Typography>
                                </div>
                                <div className="content">
                                    <div className="animation-flight">
                                        <FaCloud className="cloud-icon" />
                                        <IoAirplane className="flight-icon" />

                                        <FaCloud className="cloud-icon cloud-1" />
                                        <FaCloud className="cloud-icon cloud-2" />
                                    </div>
                                    {bookingInfo.payment_status == 0 ? (
                                        <Typography
                                            className="notice-title"
                                            variant="h6"
                                        >
                                            Quý khách đã đặt chỗ thành công
                                        </Typography>
                                    ) : (
                                        ""
                                    )}

                                    {bookingInfo.payment_status == 0 ? (
                                        <Typography
                                            variant="h6"
                                            className="notice-alert"
                                        >
                                            Vui lòng thanh toán trước{" "}
                                            <span className="time">
                                                {" "}
                                                {getTime(bookingTime)}{" "}
                                            </span>
                                            hôm nay, sau thời gian này nếu quý
                                            khách hàng chưa thanh toán yêu cầu
                                            đặt vé sẽ bị hủy
                                        </Typography>
                                    ) : bookingInfo.payment_status == 1 ? (
                                        <Typography
                                            variant="h6"
                                            className="notice-payment-success"
                                        >
                                            Quý khách đã thanh toán thành công
                                        </Typography>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            {bookingInfo.payment_status == 0 &&
                            bookingInfo.payment_method == 3 ? (
                                <Payment
                                    data={bookingInfo}
                                    onPaymentBooking={this.onPaymentBooking}
                                />
                            ) : (
                                ""
                            )}

                            <FlightBookingDetail
                                flight={flight}
                                ticket={ticket}
                                destination={destination}
                                departure={departure}
                            />
                            <PassengerInfo
                                passengers={bookingInfo.passenger}
                                ticket={ticket}
                                booking={bookingInfo}
                            />
                            <ContactInfoBooking booking={bookingInfo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BookingConfirm;
