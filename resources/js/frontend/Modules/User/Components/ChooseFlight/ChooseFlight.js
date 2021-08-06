import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SideBarFilter from "./Components/SideBarFilter/SideBarFilter";
import StepListBar from "./Components/StepList/StepList";
import "./ChooseFlight.scss";
import BookingTicketList from "./Components/BookingTicketList/BookingTicketList";
import HeaderBookingTicket from "./Components/HeaderBookingTicket/HeaderBookingTicket";
import UserService from "../../../User/Shared/UserService/UserService";

class ChooseFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departureSearch: "",
            destinationSearch: "",
            departureDate: "",
            flightsData: [],
        };
    }

    componentDidMount = () => {
        this.getSearchFlightInfo();
    };

    getSearchFlightInfo = () => {
        const params = new URLSearchParams(window.location.search);
        const departure = params.get("departure");
        const destination = params.get("destination");
        const departureDate = params.get("time");
        this.getDepartureInfo(departure);
        this.getDestinationInfo(destination);
        const tripType = JSON.parse(localStorage.getItem("tripType"));
        const passengers = JSON.parse(localStorage.getItem("passengers"));
        let passenger = [
            {
                passenger_type: 1,
                quantity: passengers.adults,
            },
            {
                passenger_type: 2,
                quantity: passengers.children,
            },
            {
                passenger_type: 3,
                quantity: passengers.infants,
            },
        ];
        const data = {
            destination,
            departure,
            trip_type: tripType,
            passenger,
            departure_time: departureDate,
        };
        this.setState({
            departureDate,
        });
        this.onSearchFlight(data);
    };

    getDestinationInfo = (id) => {
        UserService.getDestinationInfo(id).then((res) => {
            this.setState({
                destinationSearch: res.data,
            });
        });
    };

    getDepartureInfo = (id) => {
        UserService.getDestinationInfo(id).then((res) => {
            this.setState({
                departureSearch: res.data,
            });
        });
    };

    onSearchFlight = (data) => {
        UserService.searchFlight(data)
            .then((res) => {
                console.log(data);
                this.setState({
                    flightsData: res.data,
                });
            })
            .catch((err) => {});
    };

    handleChangeDepartureDate = (data) => {
        this.setState({
            departureDate: data.date,
        });
        const { departureSearch, destinationSearch } = this.state;
        const tripType = JSON.parse(localStorage.getItem("tripType"));
        const passengers = JSON.parse(localStorage.getItem("passengers"));
        let passenger = [
            {
                passenger_type: 1,
                quantity: passengers.adults,
            },
            {
                passenger_type: 2,
                quantity: passengers.children,
            },
            {
                passenger_type: 3,
                quantity: passengers.infants,
            },
        ];
        let searchData = {
            departure: departureSearch.id,
            destination: destinationSearch.id,
            trip_type: tripType,
            passenger,
            departure_time: data.date,
        };
        this.onSearchFlight(searchData);
    };

    render() {
        const {
            departureDate,
            flightsData,
            departureSearch,
            destinationSearch,
        } = this.state;
        return (
            <div>
                <SubNavbar />
                <div className="choose-flight-page">
                    <div className="wrap-container">
                        <StepListBar />
                        <div className="main-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <SideBarFilter />
                                </div>
                                <div className="col-sm-9">
                                    <div className="booking-ticket-main">
                                        <HeaderBookingTicket
                                            departureDate={departureDate}
                                            flightList={flightsData}
                                            departure={departureSearch}
                                            destination={destinationSearch}
                                            onChangeDepartureDate={
                                                this.handleChangeDepartureDate
                                            }
                                        />
                                        <BookingTicketList
                                            flightList={flightsData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseFlight;
