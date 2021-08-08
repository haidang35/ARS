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

class BookingConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("456", this.props.location.state);
        const data = this.props.location.state;
        const flight = Object.assign({}, data.flight);
        const departure = Object.assign({}, flight.departure);
        const destination = Object.assign({}, flight.destination);
        const ticket = Object.assign({}, data.ticket);

        return (
            <div>
                <SubNavbar />
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
                                    <Typography
                                        className="notice-title"
                                        variant="h6"
                                    >
                                        Quý khách đã đặt chỗ thành công
                                    </Typography>
                                </div>
                            </div>
                            <FlightBookingDetail
                                flight={flight}
                                ticket={ticket}
                                destination={destination}
                                departure={departure}
                            />
                            <PassengerInfo
                                passengers={data.passengers}
                                ticket={ticket}
                                booking={data}
                            />
                            <ContactInfoBooking booking={data} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BookingConfirm;
