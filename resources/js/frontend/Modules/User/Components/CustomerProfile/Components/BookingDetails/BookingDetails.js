import React from "react";
import { Component } from "react";
import ContactInfoBooking from "../../../BookingConfirm/Components/ContactInfo/ContactInfoBooking";
import FlightBookingDetail from "../../../BookingConfirm/Components/FlightBookingDetail/FlightBookingDetail";
import PassengerInfo from "../../../BookingConfirm/Components/PassengerInfo/PassengerInfo";
import "./BookingDetails.scss";
import AlertWarning from "../../../../../../Shared/Components/Alert/AlertWarning";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const data = this.props.location.state;

        return (
            <div>
                <div className="booking-details">
                    {data.status == 1 ? (
                        <AlertWarning message="Yêu cầu đặt vé đang chờ xác nhận" />
                    ) : data.status == 2 ? (
                        <AlertSuccess message="Bạn đã đặt vé máy bay thành công" />
                    ) : (
                        ""
                    )}

                    <FlightBookingDetail
                        flight={data.flight}
                        departure={data.flight.departure}
                        destination={data.flight.destination}
                        ticket={data.ticket}
                    />
                    <PassengerInfo
                        passengers={data.passenger}
                        ticket={data.ticket}
                        booking={data}
                    />
                    <ContactInfoBooking booking={data} />
                </div>
            </div>
        );
    }
}
export default BookingDetails;
