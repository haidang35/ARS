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
            flightTickets: [],
            onReservation: false,
            bookingInfo: {},
            redirect: false,
            message: "",
            bookingConfirmLoading: false,
            flightTicketRoundTrip: [],
        };
    }

    customerInfo = "";
    contactInfo = "";
    paymentMethod = "";

    componentDidMount() {
        this.getFlightTicketInfo();
    }

    getFlightTicketInfo = () => {
        const data = this.props.location.state;
        if (data.tripType == 1) {
            this.getTicketInfoOneWay();
        } else if (data.tripType == 2) {
            this.getTicketInfoRoundTrip();
        }
    };

    getTicketInfoOneWay = () => {
        const ticketData = this.props.location.state;
        let { flightTickets } = this.state;
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
        UserService.getFlightTicketInfo(
            ticketData.ticketsChoosed[0].id,
            data
        ).then((res) => {
            flightTickets.push(res.data);
            this.setState({ flightTickets });
        });
    };

    getTicketInfoRoundTrip = () => {
        const ticketData = this.props.location.state;
        const ticketIdFirst = ticketData.ticketsChoosed[0].id;
        const ticketIdSecond = ticketData.ticketsChoosed[1].id;
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
        this.getFirstTicket(ticketIdFirst, data);
        this.getSecondTicket(ticketIdSecond, data);
    };

    getFirstTicket = (id, data) => {
        let { flightTickets } = this.state;
        UserService.getFlightTicketInfo(id, data).then((res) => {
            flightTickets.push(res.data);
            this.setState({ flightTickets });
        });
    };

    getSecondTicket = (id, data) => {
        let { flightTickets } = this.state;
        UserService.getFlightTicketInfo(id, data).then((res) => {
            flightTickets.push(res.data);
            this.setState({ flightTickets });
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
        const ticketData = this.props.location.state;
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
            const { flightTickets } = this.state;
            let intoMoney = 0;
            flightTickets.forEach((item) => {
                intoMoney += item.into_money;
            });

            const data = {
                booking_date: getDateTimeNow(),
                trip_type,
                ticket_id: ticketData.ticketsChoosed[0].id,
                vocative: this.contactInfo.vocative,
                contact_name: this.contactInfo.contact_name,
                contact_phone: this.contactInfo.phone,
                contact_email: this.contactInfo.email,
                address: this.contactInfo.address,
                note: this.contactInfo.note,
                payment_method: this.paymentMethod,
                into_money: intoMoney,
                payment_status: 0,
                passengers: this.customerInfo,
                user_id: userId,
                ticket: flightTickets,
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
        const {
            flightTickets,
            onReservation,
            bookingInfo,
            redirect,
            flightTicketRoundTrip,
        } = this.state;
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
        let intoMoney = 0;
        flightTickets.forEach((item) => {
            intoMoney += item.into_money;
        });
        return (
            <div>
                <SubNavbar />
                <div className="reservations">
                    <div className="wrap-container">
                        <StepListBar step={2} />
                        <div className="main-content">
                            <div className="row">
                                <div className="col-md-3">
                                    <TicketDetails
                                        data={flightTickets}
                                        intoMoney={intoMoney}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <FlightChoosed data={flightTickets} />
                                    <CustomerInfo
                                        data={flightTickets}
                                        onReservation={onReservation}
                                        getCustomerInfo={this.getCustomerInfo}
                                    />
                                    <ContactInfo
                                        onReservation={onReservation}
                                        getContactInfo={this.getContactInfo}
                                    />
                                    <PaymentMethod
                                        data={flightTickets}
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
