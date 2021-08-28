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
import { getDateTimeNow } from "../../../../Helpers/DateTime/ConvertDateTime";
import { Redirect } from "react-router-dom";
import ModalNotice from "../../../../Shared/Components/Modal/ModalNotice";
import ChatBox from "../ChatBox/ChatBox";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { FaSlash } from "react-icons/fa";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTicket: {},
            onReservation: false,
            bookingInfo: {},
            redirect: false,
            message: "",
            bookingConfirmLoading: false,
        };
    }

    customerInfo = "";
    contactInfo = "";
    paymentMethod = "";

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

    getCustomerInfo = (data) => {
        this.customerInfo = data;
    };

    getContactInfo = (data) => {
        this.contactInfo = data;
    };

    getPaymentMethod = (data) => {
        this.paymentMethod = data;
    };

    onReservationTicket = async () => {
        const { id } = this.props.match.params;
        this.setState({
            onReservation: true,
        });
        (await this.customerInfo) !== "";
        (await this.contactInfo) !== "";
        (await this.paymentMethod) !== "";
        if (
            this.customerInfo !== "" &&
            this.contactInfo !== "" &&
            this.paymentMethod !== ""
        ) {
            const trip_type = JSON.parse(localStorage.getItem("tripType"));
            const userId = JSON.parse(localStorage.getItem("userId" || ""));
            this.setState({
                bookingConfirmLoading: true,
            });
            const { flightTicket } = this.state;

            const data = {
                booking_date: getDateTimeNow(),
                trip_type,
                ticket_id: id,
                vocative: this.contactInfo.vocative,
                contact_name: this.contactInfo.contact_name,
                contact_phone: this.contactInfo.phone,
                contact_email: this.contactInfo.email,
                address: this.contactInfo.address,
                note: this.contactInfo.note,
                payment_method: this.paymentMethod,
                into_money: this.state.flightTicket.into_money,
                payment_status: 0,
                passengers: this.customerInfo,
                user_id: userId,
                ticket: flightTicket,
            };
            this.setState({
                bookingInfo: data,
                bookingConfirmLoading: false,
                redirect: true,
            });

            window.scrollTo(0, 0);
        } else if (
            this.paymentMethod == "" &&
            this.contactInfo !== "" &&
            this.customerInfo !== ""
        ) {
            this.setState({
                message: "Vui lòng chọn phương thức thanh toán",
            });
        }
    };

    goToConfirmPage = (data) => {
        if (this.state.redirect)
            return (
                <Redirect
                    to={{ pathname: "/reservation/confirm", state: data }}
                />
            );
    };

    render() {
        const { flightTicket, onReservation, bookingInfo, redirect } =
            this.state;
        if (redirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/reservation/bonus-services",
                        state: bookingInfo,
                    }}
                />
            );
        }
        return (
            <div>
                <SubNavbar />
                <div className="reservations">
                    <div className="wrap-container">
                        <StepListBar step={2} />
                        <div className="main-content">
                            <div className="row">
                                <div className="col-md-3">
                                    <TicketDetails data={flightTicket} />
                                </div>
                                <div className="col-md-9">
                                    <FlightChoosed data={flightTicket} />
                                    <CustomerInfo
                                        data={flightTicket}
                                        onReservation={onReservation}
                                        getCustomerInfo={this.getCustomerInfo}
                                    />
                                    <ContactInfo
                                        onReservation={onReservation}
                                        getContactInfo={this.getContactInfo}
                                    />
                                    <PaymentMethod
                                        data={flightTicket}
                                        onReservation={this.onReservationTicket}
                                        getPaymentMethod={this.getPaymentMethod}
                                    />
                                </div>
                            </div>
                        </div>
                        <ModalNotice
                            message={this.state.message}
                            onClose={() => this.setState({ message: "" })}
                        />
                    </div>
                </div>
                <Backdrop
                    open={this.state.bookingConfirmLoading}
                    style={{ zIndex: "1000" }}
                >
                    <CircularProgress
                        color="inherit"
                        style={{ color: "#ffff" }}
                    />
                </Backdrop>
                <ChatBox />
            </div>
        );
    }
}
export default Reservations;
