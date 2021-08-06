import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import FlightChoosed from "./Components/FlightChoosed/FlightChoosed";
import UserService from "../../Shared/UserService/UserService";
import "./Reservation.scss";
import CustomerInfo from "./Components/CustomerInfo/CustomerInfo";
import ContactInfo from "./Components/ContactInfo/ContactInfo";
import PaymentMethod from "./Components/PaymentMethod/PaymentMethod";
import TicketDetails from "./Components/TicketDetails/TicketDetails";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTicket: {},
        };
    }

    componentDidMount() {
        this.getFlightTicketInfo();
    }

    getFlightTicketInfo = () => {
        const { id } = this.props.match.params;
        let trip_type = JSON.parse(localStorage.getItem("tripType"));
        let passengerOrg = JSON.parse(localStorage.getItem("passengers"));
        let passenger = [
            {
                passenger_type: 1,
                quantity: passengerOrg.adults,
            },
            {
                passenger_type: 2,
                quantity: passengerOrg.children,
            },
            {
                passenger_type: 3,
                quantity: passengerOrg.infants,
            },
        ];
        let data = { trip_type, passenger };
        UserService.getFlightTicketInfo(id, data).then((res) => {
            this.setState({
                flightTicket: res.data,
            });
        });
    };

    render() {
        const { flightTicket } = this.state;
        return (
            <div>
                <SubNavbar />
                <div className="reservations">
                    <div className="wrap-container">
                        <StepListBar step={2} />
                        <div className="main-content">
                            <div className="row">
                                <div className="col-md-3">
                                    <TicketDetails />
                                </div>
                                <div className="col-md-9">
                                    <FlightChoosed data={flightTicket} />
                                    <CustomerInfo />
                                    <ContactInfo />
                                    <PaymentMethod />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Reservations;
