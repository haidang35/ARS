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
            flightsDataOrg: [],
            flightListDate: [],
            flightListDateOrg: [],
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
        this.getFlightListDate(departure, destination);
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
                this.setState({
                    flightsData: res.data,
                    flightsDataOrg: res.data,
                });
            })
            .catch((err) => {});
    };

    getFlightListDate = (departure, destination) => {
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
            departure: departure,
            destination: destination,
            trip_type: tripType,
            passenger,
        };
        UserService.getFlightListWithoutDate(searchData).then((res) => {
            this.setState({
                flightListDate: res.data,
                flightListDateOrg: res.data,
            });
        });
    };

    handleChangeDepartureDate = (data, flightList) => {
        this.setState({
            departureDate: data.date,
        });
        let flightsData = [];
        flightList.forEach((item) => {
            let newDate = new Date(item.flight.departure_datetime);
            if (
                newDate.getDate() == data.date.getDate() &&
                newDate.getMonth() == data.date.getMonth() &&
                newDate.getFullYear() == data.date.getFullYear()
            ) {
                flightsData.push(item);
            }
        });
        this.setState({ flightsData });
    };

    sortFlight = (value) => {
        if (value == 0) {
            this.sortFLightPriceFromLowToHigh();
        } else if (value == 1) {
            this.sortFLightPriceFromHighToLow();
        } else if (value == 2) {
            this.sortDepartureTime();
        } else if (value == 3) {
            this.sortFlightTime();
        }
    };

    sortFLightPriceFromHighToLow = () => {
        let { flightsData, flightListDate } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });

        this.setState({ flightsData, flightListDate });
    };

    sortFLightPriceFromLowToHigh = () => {
        let { flightsData, flightListDate } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        this.setState({ flightsData, flightListDate });
    };

    sortFLightPriceFromLowToHighDidmount = () => {
        let { flightsData } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        this.setState({ flightsData });
    };

    sortDepartureTime = () => {
        let { flightsData, flightListDate } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            const departureTime1 = new Date(item1.flight.departure_datetime);
            const departureTime2 = new Date(item2.flight.departure_datetime);
            return departureTime1.getTime() - departureTime2.getTime();
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            const departureTime1 = new Date(item1.flight.departure_datetime);
            const departureTime2 = new Date(item2.flight.departure_datetime);
            return departureTime1.getTime() - departureTime2.getTime();
        });
        this.setState({ flightsData, flightListDate });
    };

    sortFlightTime = () => {
        let { flightsData } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            const departureTime1 = new Date(item1.flight.departure_datetime);
            const arrivalTime1 = new Date(item1.flight.arrival_datetime);
            const departureTime2 = new Date(item2.flight.departure_datetime);
            const arrivalTime2 = new Date(item2.flight.arrival_datetime);
            return (
                arrivalTime1.getTime() -
                departureTime1.getTime() -
                (arrivalTime2.getTime() - departureTime2.getTime())
            );
        });
        this.setState({ flightsData });
    };

    handleViewModePrice = (value) => {
        let { flightsData, flightListDate } = this.state;
        if (value == 1) {
            flightsData.forEach((item) => {
                item.total_price = item.price;
            });
            flightListDate.forEach((item) => {
                item.total_price = item.price;
            });
        } else if (value == 2) {
            flightsData.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
            flightListDate.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
        }
        this.setState({ flightsData, flightListDate });
    };

    filterDepartureTime = (data, scopeAirline) => {
        let { flightsData, flightsDataOrg, flightListDateOrg, flightListDate } =
            this.state;
        flightsDataOrg = this.scopeAirlineWithOthers(scopeAirline);
        flightsData = flightsDataOrg.filter((item) => {
            const departureTime = new Date(item.flight.departure_datetime);
            let filterTimeFrom = new Date(departureTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(departureTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (departureTime > filterTimeFrom && departureTime < filterTimeTo)
                return item;
        });
        flightListDate = flightListDateOrg.filter((item) => {
            const departureTime = new Date(item.flight.departure_datetime);
            let filterTimeFrom = new Date(departureTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(departureTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (departureTime > filterTimeFrom && departureTime < filterTimeTo)
                return item;
        });
        this.setState({ flightsData, flightListDate });
    };

    filterArrivalTime = (data, scopeAirline) => {
        let { flightsData, flightsDataOrg, flightListDate, flightListDateOrg } =
            this.state;
        flightsDataOrg = this.scopeAirlineWithOthers(scopeAirline);
        flightsData = flightsDataOrg.filter((item) => {
            const arrivalTime = new Date(item.flight.arrival_datetime);
            let filterTimeFrom = new Date(arrivalTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(arrivalTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (arrivalTime > filterTimeFrom && arrivalTime < filterTimeTo)
                return item;
        });
        flightListDate = flightListDateOrg.filter((item) => {
            const arrivalTime = new Date(item.flight.arrival_datetime);
            let filterTimeFrom = new Date(arrivalTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(arrivalTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (arrivalTime > filterTimeFrom && arrivalTime < filterTimeTo)
                return item;
        });
        this.setState({ flightsData, flightListDate });
    };

    scopeAirline = (value) => {
        let { flightsData, flightsDataOrg, flightListDate, flightListDateOrg } =
            this.state;
        if (value == 0) {
            flightsData = flightsDataOrg;
            flightListDate = flightListDateOrg;
        } else {
            flightsData = flightsDataOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightListDate = flightListDateOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
        }
        this.setState({ flightsData, flightListDate });
    };

    scopeAirlineWithOthers = (value) => {
        let { flightsData, flightsDataOrg, flightListDate, flightListDateOrg } =
            this.state;
        if (value == 0) {
            flightsData = flightsDataOrg;
            flightListDate = flightListDateOrg;
        } else {
            flightsData = flightsDataOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightListDate = flightListDateOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
        }
        return flightsData;
    };

    render() {
        const {
            departureDate,
            flightsData,
            departureSearch,
            destinationSearch,
            flightListDate,
            flightsDataOrg,
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
                                    <SideBarFilter
                                        data={flightsData}
                                        dataOrg={flightsDataOrg}
                                        onSortFlight={this.sortFlight}
                                        viewModePrice={this.handleViewModePrice}
                                        filterDepartureTime={
                                            this.filterDepartureTime
                                        }
                                        filterArrivalTime={
                                            this.filterArrivalTime
                                        }
                                        scopeAirline={this.scopeAirline}
                                    />
                                </div>
                                <div className="col-sm-9">
                                    <div className="booking-ticket-main">
                                        <HeaderBookingTicket
                                            departureDate={departureDate}
                                            flightList={flightListDate}
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
