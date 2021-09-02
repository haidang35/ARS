import React from "react";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import "./PassengerInfo.scss";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";

class PassengerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { passengers, ticket, bookings } = this.props;
        let passengerList = [];
        let flightStart = {};
        let flightReturn = {};
        let ticketStart = {};
        let ticketReturn = {};
        if (Array.isArray(passengers)) {
            passengerList = passengers;
        }
        let checkHasData = false;
        const tripType = JSON.parse(window.localStorage.getItem("tripType"));
        if (bookings.length > 0) {
            checkHasData = true;
            flightStart = Object.assign({}, bookings[0].flight);
            ticketStart = Object.assign({}, bookings[0].ticket);
            if (tripType == 2 && bookings.length == 2) {
                flightReturn = Object.assign({}, bookings[1].flight);
                ticketReturn = Object.assign({}, bookings[1].ticket);
            }
        }

        let loop = 1;

        return (
            <div className="passenger-info">
                <div className="title-box">
                    <Typography variant="h6" className="title">
                        Passenger information and fares
                    </Typography>
                </div>
                <div className="content">
                    <div className="table-responsive">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th className="title-item">STT</th>
                                    <th className="title-item">Flight</th>
                                    <th className="title-item">Passenger</th>
                                    <th className="title-item">Gender</th>
                                    <th className="title-item">Birthday</th>
                                    <th className="title-item">Ticket price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkHasData
                                    ? bookings[0].passenger.map((item) => {
                                          return (
                                              <tr key={item.id}>
                                                  <td className="content-item">
                                                      {loop++}
                                                  </td>
                                                  <td className="content-item">
                                                      {`${flightStart.departure.city} - ${flightStart.destination.city}`}
                                                  </td>
                                                  <td className="content-item">
                                                      {item.passenger_name}
                                                  </td>
                                                  <td className="content-item">
                                                      {item.gender}
                                                  </td>
                                                  <td className="content-item">
                                                      {dateConvert(
                                                          item.birthday
                                                      )}
                                                  </td>
                                                  <td className="content-item">
                                                      {formatCurrency(
                                                          ticketStart.price +
                                                              ticketStart.tax
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : ""}

                                {checkHasData &&
                                tripType == 2 &&
                                bookings.length == 2
                                    ? bookings[1].passenger.map((item) => {
                                          return (
                                              <tr key={item.id}>
                                                  <td className="content-item">
                                                      {loop++}
                                                  </td>
                                                  <td className="content-item">
                                                      {`${flightReturn.departure.city} - ${flightReturn.destination.city}`}
                                                  </td>
                                                  <td className="content-item">
                                                      {item.passenger_name}
                                                  </td>
                                                  <td className="content-item">
                                                      {item.gender}
                                                  </td>
                                                  <td className="content-item">
                                                      {dateConvert(
                                                          item.birthday
                                                      )}
                                                  </td>
                                                  <td className="content-item">
                                                      {formatCurrency(
                                                          ticketReturn.price +
                                                              ticketReturn.tax
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : ""}

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="content-item-total"
                                    >
                                        Total cost
                                    </td>
                                    <td className="content-item-total">
                                        {formatCurrency(bookings[0].into_money)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassengerInfo;
