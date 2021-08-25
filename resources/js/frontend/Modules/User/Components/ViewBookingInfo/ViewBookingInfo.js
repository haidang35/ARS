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
        };
    }

    componentDidMount() {
        this.getBookingInfo();
    }

    getBookingInfo = () => {
        const { code } = this.props.match.params;
        UserService.getBookingInfoWithCode(code).then((res) => {
            this.setState({
                data: res.data,
            });
        });
    };

    render() {
        const { data } = this.state;
        const flight = Object.assign({}, data.flight);
        const ticket = Object.assign({}, data.ticket);
        const departure = Object.assign({}, flight.departure);
        const destination = Object.assign({}, flight.destination);
        let bookingTime = new Date(data.booking_date);
        bookingTime.setHours(bookingTime.getHours() + 2);
        return (
            <div>
                <SubNavbar />
                <SearchFlightBar />
                <div className="view-booking-info">
                    <div className="wrap-container">
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
                                {data.payment_status == 0 ? (
                                    <Typography
                                        className="notice-title"
                                        variant="h6"
                                    >
                                        {`Quý khách đã đặt chỗ thành công, mã đặt vé của quý khách là: `}
                                        <span
                                            style={{ color: "#7b61f2" }}
                                        >{`#${data.booking_code}`}</span>
                                    </Typography>
                                ) : (
                                    ""
                                )}

                                {data.payment_status == 0 ? (
                                    <Typography
                                        variant="h6"
                                        className="notice-alert"
                                    >
                                        Vui lòng thanh toán trước{" "}
                                        <span className="time">
                                            {" "}
                                            {getTime(bookingTime)}{" "}
                                        </span>
                                        hôm nay, sau thời gian này nếu quý khách
                                        hàng chưa thanh toán yêu cầu đặt vé sẽ
                                        bị hủy
                                    </Typography>
                                ) : data.payment_status == 1 ? (
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
                        {data.payment_status == 0 &&
                        data.payment_method == 3 ? (
                            <Payment
                                data={data}
                                onPaymentBooking={this.onPaymentBooking}
                            />
                        ) : data.payment_status === 0 &&
                          data.payment_method === 2 ? (
                            <PaymentNoticeBox data={data} />
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
                            booking={data}
                        />
                        <ContactInfoBooking booking={data} />
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewBookingInfo;
