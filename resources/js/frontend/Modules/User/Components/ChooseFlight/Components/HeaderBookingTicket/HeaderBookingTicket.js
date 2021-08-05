import React from "react";
import { Component } from "react";
import "./HeaderBookingTicket.scss";
import { IoAirplane } from "react-icons/io5";
import { Typography } from "@material-ui/core";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
    dateConvert,
    getDayOfWeek,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import UserService from "../../../../Shared/UserService/UserService";

class HeaderBookingTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDate: [],
            flightList: [],
            departureDate: "",
        };
    }

    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            departureDate: nextProps.departureDate,
            flightList: nextProps.flightList,
        });
        let flightList = nextProps.flightList;
        this.getDaysOfWeek(nextProps.departureDate, flightList);
    };

    sortFLightPriceFromLowToHigh = (flightList) => {
        flightList = flightList.sort((item1, item2) => {
            return item1.total_price - item2.total_price;
        });
        return flightList;
    };

    getDaysOfWeek = (departureDate, flightList) => {
        let current = new Date(departureDate);
        let flightOnWeek = new Array();
        current.setDate(current.getDate() - 3);
        for (let i = 0; i < 7; i++) {
            let data = {
                id: i,
                date: new Date(current),
                priceTicket: this.getPriceFlightTicket(
                    flightList,
                    new Date(current)
                ),
            };
            flightOnWeek.push(data);
            current.setDate(current.getDate() + 1);
        }
        this.setState({
            listDate: flightOnWeek,
        });
    };

    getPriceFlightTicket(flightList, date) {
        for (let i = 0; i < flightList.length; i++) {
            if (
                this.compareDate(flightList[i].flight.departure_datetime, date)
            ) {
                let ticketPrice = flightList[i].total_price;
                return ticketPrice;
            }
        }
        return "-";
    }

    compareDate = (departureDate, date) => {
        let depaDate = new Date(departureDate);
        let newDate = new Date(date);
        if (
            depaDate.getDate() == newDate.getDate() &&
            newDate.getMonth() == depaDate.getMonth() &&
            depaDate.getFullYear() == newDate.getFullYear()
        )
            return true;
        return false;
    };

    handleChangeDepartureDate = (data) => {
        this.props.onChangeDepartureDate(data, this.state.flightList);
    };

    render() {
        const { listDate, departureDate, flightList } = this.state;
        const { departure, destination } = this.props;
        return (
            <div>
                <div className="header-booking-ticket">
                    <div className="top-content-bar">
                        <IoAirplane className="icon-plane" />
                        <div className="content">
                            <div className="top-content">
                                <Typography className="location-title">
                                    {departure.city +
                                        ", " +
                                        departure.country +
                                        ` (${departure.airport_code})`}
                                </Typography>
                                <HiArrowNarrowRight className="icon-arrow" />
                                <Typography className="location-title">
                                    {destination.city +
                                        ", " +
                                        destination.country +
                                        ` (${destination.airport_code})`}
                                </Typography>
                            </div>

                            <Typography className="departure-time">
                                {`${getDayOfWeek(
                                    departureDate
                                )} , ${dateConvert(departureDate)}`}
                            </Typography>
                        </div>
                    </div>
                    <div className="bottom-content-bar">
                        <div className="row">
                            {listDate.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() =>
                                            this.handleChangeDepartureDate(item)
                                        }
                                        className={
                                            this.compareDate(
                                                departureDate,
                                                item.date
                                            )
                                                ? "item-box item-selected"
                                                : "item-box"
                                        }
                                    >
                                        <span className="item-date">
                                            {dateConvert(item.date)}
                                        </span>
                                        <span className="item-day">
                                            {getDayOfWeek(item.date)}
                                        </span>
                                        <span className="item-price">
                                            {item.priceTicket !== "-"
                                                ? formatCurrency(
                                                      item.priceTicket
                                                  )
                                                : "-"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBookingTicket;
