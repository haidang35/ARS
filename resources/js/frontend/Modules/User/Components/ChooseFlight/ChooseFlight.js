import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SideBarFilter from "./Components/SideBarFilter/SideBarFilter";
import StepListBar from "./Components/StepList/StepList";
import "./ChooseFlight.scss";
import BookingTicketList from "./Components/BookingTicketList/BookingTicketList";
import HeaderBookingTicket from "./Components/HeaderBookingTicket/HeaderBookingTicket";
import UserService from "../../../User/Shared/UserService/UserService";
import SearchFlightBar from "../SearchFlightBar/SearchFlightBar";
import ChatBox from "../ChatBox/ChatBox";

class ChooseFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departureSearch: "",
            destinationSearch: "",
            departureDate: "",
            returnDate: "",
            flightsData: [],
            flightsDataReturn: [],
            flightsDataReturnOrg: [],
            flightsDataOrg: [],
            flightListDate: [],
            flightListDateOrg: [],
            flightListDateReturn: [],
            flightListDateReturnOrg: [],
            airlineList: [],
            tripType: "",
            filterTripType: 1,
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
        const returnDate = params.get("return");
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
        if (tripType == 2) {
            const data = {
                destination: departure,
                departure: destination,
                trip_type: tripType,
                passenger,
                departure_time: returnDate,
            };
            this.onSearchFlightReturn(data);
        }

        this.setState({
            departureDate,
            returnDate,
            tripType,
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

    onSearchFlightReturn = (data) => {
        UserService.searchFlight(data)
            .then((res) => {
                this.setState({
                    flightsDataReturn: res.data,
                    flightsDataReturnOrg: res.data,
                });
                console.log("returnnnnnn", res.data);
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
        if (tripType == 2) {
            let searchData = {
                departure: destination,
                destination: departure,
                trip_type: tripType,
                passenger,
            };
            UserService.getFlightListWithoutDate(searchData).then((res) => {
                this.setState({
                    flightListDateReturn: res.data,
                    flightListDateReturnOrg: res.data,
                });
            });
        }
    };

    handleChangeDepartureDate = (data, flightList, flightListOrg) => {
        let flightsData = [];
        let flightsDataOrg = [];
        let now = new Date();
        flightList.forEach((item) => {
            let newDate = new Date(item.flight.departure_datetime);
            if (
                newDate.getDate() == data.date.getDate() &&
                newDate.getMonth() == data.date.getMonth() &&
                newDate.getFullYear() == data.date.getFullYear() &&
                newDate.getDate() >= now.getDate() &&
                newDate.getMonth() == now.getMonth()
            ) {
                flightsData.push(item);
            }
        });

        flightListOrg.forEach((item) => {
            let newDate = new Date(item.flight.departure_datetime);
            if (
                newDate.getDate() == data.date.getDate() &&
                newDate.getMonth() == data.date.getMonth() &&
                newDate.getFullYear() == data.date.getFullYear() &&
                newDate.getDate() >= now.getDate() &&
                newDate.getMonth() == now.getMonth()
            ) {
                flightsDataOrg.push(item);
            }
        });

        this.setState({
            flightsData,
            departureDate: data.date,
            flightsDataOrg,
        });
    };

    handleChangeReturnDate = (data, flightList, flightListOrg) => {
        let flightsDataReturn = [];
        let flightsDataReturnOrg = [];
        flightList.forEach((item) => {
            let newDate = new Date(item.flight.departure_datetime);
            if (
                newDate.getDate() == data.date.getDate() &&
                newDate.getMonth() == data.date.getMonth() &&
                newDate.getFullYear() == data.date.getFullYear()
            ) {
                flightsDataReturn.push(item);
            }
        });

        flightListOrg.forEach((item) => {
            let newDate = new Date(item.flight.departure_datetime);
            if (
                newDate.getDate() == data.date.getDate() &&
                newDate.getMonth() == data.date.getMonth() &&
                newDate.getFullYear() == data.date.getFullYear()
            ) {
                flightsDataReturnOrg.push(item);
            }
        });
        this.setState({
            flightsDataReturn,
            flightsDataReturnOrg,
            returnDate: data.date,
        });
        console.log("FL", this.state.flightsDataReturn);
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
        let {
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightListDateReturn = flightListDateReturn.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });

        this.setState({
            flightsData,
            flightListDate,
            flightListDateReturn,
            flightsDataReturn,
        });
    };

    sortFLightPriceFromLowToHigh = () => {
        let {
            flightsData,
            flightListDate,
            flightListDateReturn,
            flightsDataReturn,
        } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        flightListDateReturn = flightListDateReturn.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
    };

    sortFLightPriceFromLowToHighDidmount = () => {
        let { flightsData, flightsDataReturn } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        this.setState({ flightsData, flightsDataReturn });
    };

    sortDepartureTime = () => {
        let {
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        } = this.state;
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
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
            const departureTime1 = new Date(item1.flight.departure_datetime);
            const departureTime2 = new Date(item2.flight.departure_datetime);
            return departureTime1.getTime() - departureTime2.getTime();
        });
        flightListDateReturn = flightListDateReturn.sort((item1, item2) => {
            const departureTime1 = new Date(item1.flight.departure_datetime);
            const departureTime2 = new Date(item2.flight.departure_datetime);
            return departureTime1.getTime() - departureTime2.getTime();
        });
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
    };

    sortFlightTime = () => {
        let { flightsData, flightsDataReturn } = this.state;
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
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
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
        this.setState({ flightsData, flightsDataReturn });
    };

    handleViewModePrice = (value) => {
        let {
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        } = this.state;
        if (value == 1) {
            flightsData.forEach((item) => {
                item.total_price = item.price;
            });
            flightListDate.forEach((item) => {
                item.total_price = item.price;
            });
            flightsDataReturn.forEach((item) => {
                item.total_price = item.price;
            });
            flightListDateReturn.forEach((item) => {
                item.total_price = item.price;
            });
        } else if (value == 2) {
            flightsData.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
            flightListDate.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
            flightsDataReturn.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
            flightListDateReturn.forEach((item) => {
                item.total_price = item.price + item.tax;
            });
        }
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
    };

    filterDepartureTime = (data, scopeAirline) => {
        let {
            flightsData,
            flightsDataOrg,
            flightListDateOrg,
            flightListDate,
            flightsDataReturn,
            flightsDataReturnOrg,
            flightListDateReturn,
            flightListDateReturnOrg,
        } = this.state;
        flightsDataOrg = this.scopeAirlineWithOthers(scopeAirline);
        flightsDataReturnOrg = this.scopeAirlineWithOthersReturn(scopeAirline);
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

        flightsDataReturn = flightsDataReturnOrg.filter((item) => {
            const departureTime = new Date(item.flight.departure_datetime);
            let filterTimeFrom = new Date(departureTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(departureTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (departureTime > filterTimeFrom && departureTime < filterTimeTo)
                return item;
        });
        flightListDateReturn = flightListDateReturnOrg.filter((item) => {
            const departureTime = new Date(item.flight.departure_datetime);
            let filterTimeFrom = new Date(departureTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(departureTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (departureTime > filterTimeFrom && departureTime < filterTimeTo)
                return item;
        });
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
    };

    filterArrivalTime = (data, scopeAirline) => {
        let {
            flightsData,
            flightsDataOrg,
            flightListDate,
            flightListDateOrg,
            flightsDataReturn,
            flightsDataReturnOrg,
            flightListDateReturn,
            flightListDateReturnOrg,
        } = this.state;
        flightsDataOrg = this.scopeAirlineWithOthers(scopeAirline);
        flightsDataReturnOrg = this.scopeAirlineWithOthersReturn(scopeAirline);
        flightsData = flightsDataOrg.filter((item) => {
            const arrivalTime = new Date(item.flight.arrival_datetime);
            let filterTimeFrom = new Date(arrivalTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(arrivalTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (arrivalTime > filterTimeFrom && arrivalTime < filterTimeTo)
                return item;
        });
        flightsDataReturn = flightsDataReturnOrg.filter((item) => {
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
        flightListDateReturn = flightListDateReturnOrg.filter((item) => {
            const arrivalTime = new Date(item.flight.arrival_datetime);
            let filterTimeFrom = new Date(arrivalTime);
            filterTimeFrom.setHours(data.from, 0, 0);
            let filterTimeTo = new Date(arrivalTime);
            filterTimeTo.setHours(data.to, 0, 0);
            if (arrivalTime > filterTimeFrom && arrivalTime < filterTimeTo)
                return item;
        });
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
    };

    scopeAirline = (value) => {
        let { flightsData, flightsDataOrg, flightListDate, flightListDateOrg } =
            this.state;
        let {
            flightsDataReturn,
            flightsDataReturnOrg,
            flightListDateReturn,
            flightListDateReturnOrg,
        } = this.state;

        if (value == 0) {
            flightsData = flightsDataOrg;
            flightListDate = flightListDateOrg;
            flightsDataReturn = flightsDataReturnOrg;
            flightListDateReturn = flightListDateReturnOrg;
        } else {
            flightsData = flightsDataOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightListDate = flightListDateOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightsDataReturn = flightsDataReturnOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightListDateReturn = flightListDateReturnOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
        }
        this.setState({
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        });
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

    scopeAirlineWithOthersReturn = (value) => {
        let {
            flightsDataReturn,
            flightsDataReturnOrg,
            flightListDateReturn,
            flightListDateReturnOrg,
        } = this.state;
        if (value == 0) {
            flightsDataReturn = flightsDataReturnOrg;
            flightListDateReturn = flightListDateReturnOrg;
        } else {
            flightsDataReturn = flightsDataOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
            flightListDateReturn = flightListDateReturnOrg.filter((item) => {
                return item.flight.airline.id == value;
            });
        }
        return flightsDataReturn;
    };

    handleChangeFilterTripType = (value) => {
        const { flightsDataReturn } = this.state;
        this.setState({
            filterTripType: value,
        });
    };

    render() {
        const {
            departureDate,
            returnDate,
            flightsData,
            departureSearch,
            destinationSearch,
            flightListDate,
            flightsDataOrg,
            flightListDateOrg,
            filterTripType,
            flightsDataReturn,
            flightsDataReturnOrg,
            flightListDateReturn,
            flightListDateReturnOrg,
            tripType,
        } = this.state;
        return (
            <div>
                <SubNavbar />
                <div className="choose-flight-page">
                    <div className="wrap-container">
                        <SearchFlightBar />
                        <StepListBar step={1} />
                        <div className="main-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <SideBarFilter
                                        tripType={this.state.tripType}
                                        data={flightsData}
                                        dataOrg={
                                            filterTripType == 2
                                                ? flightsDataReturnOrg
                                                : flightsDataOrg
                                        }
                                        dataReturnOrg={flightsDataReturnOrg}
                                        onSortFlight={this.sortFlight}
                                        viewModePrice={this.handleViewModePrice}
                                        filterDepartureTime={
                                            this.filterDepartureTime
                                        }
                                        filterArrivalTime={
                                            this.filterArrivalTime
                                        }
                                        scopeAirline={this.scopeAirline}
                                        filterTripType={
                                            this.handleChangeFilterTripType
                                        }
                                    />
                                </div>
                                <div className="col-sm-9">
                                    <div className="booking-ticket-main">
                                        <HeaderBookingTicket
                                            departureDate={departureDate}
                                            flightList={flightListDate}
                                            flightListOrg={flightListDateOrg}
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
                                    {this.state.tripType == 2 ? (
                                        <div className="booking-ticket-return">
                                            <HeaderBookingTicket
                                                departureDate={
                                                    this.state.returnDate
                                                }
                                                flightList={
                                                    this.state
                                                        .flightListDateReturn
                                                }
                                                flightListOrg={
                                                    this.state
                                                        .flightListDateReturnOrg
                                                }
                                                departure={destinationSearch}
                                                destination={departureSearch}
                                                onChangeDepartureDate={
                                                    this.handleChangeReturnDate
                                                }
                                            />
                                            <BookingTicketList
                                                flightList={
                                                    this.state.flightsDataReturn
                                                }
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ChatBox />
            </div>
        );
    }
}

export default ChooseFlight;
