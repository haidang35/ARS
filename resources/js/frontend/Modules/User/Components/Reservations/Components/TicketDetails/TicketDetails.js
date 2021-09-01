import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./TicketDetails.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import { URL_IMAGE_AIRLINE } from "../../../../../../Constances/const";

class TicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data,
        });
    };

    getPassengerList = () => {
        const { data } = this.state;
        let passenger = [];
        for (const ps of data.passenger) {
            if (ps.quantity > 0) {
                passenger.push(ps);
            }
        }
        return passenger;
    };

    render() {
        // const { data } = this.state;
        const { seatReserveFee, data, seatReserveFeeReturn, intoMoney } =
            this.props;
        const tripType = JSON.parse(localStorage.getItem("tripType"));
        return (
            <div>
                <div className="ticket-details">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Chi tiết giá vé
                        </Typography>
                    </div>
                    <div className="content">
                        {data.length > 0
                            ? data.map((item) => {
                                  return (
                                      <div
                                          key={item.id}
                                          className="row"
                                          style={{ marginBottom: "2rem" }}
                                      >
                                          <div className="col-md-8">
                                              <div className="flight-time">
                                                  <Typography
                                                      variant="body1"
                                                      className="destination"
                                                  >
                                                      {
                                                          item.flight.departure
                                                              .city
                                                      }
                                                  </Typography>
                                                  <FaLongArrowAltRight className="icon-arrow" />
                                                  <Typography
                                                      variant="body1"
                                                      className="destination"
                                                  >
                                                      {
                                                          item.flight
                                                              .destination.city
                                                      }
                                                  </Typography>
                                              </div>
                                              <div className="flight-time">
                                                  <BiTime className="icon-clock" />
                                                  <Typography
                                                      variant="body1"
                                                      className="time"
                                                  >
                                                      {getTime(
                                                          item.flight
                                                              .departure_datetime
                                                      ) +
                                                          " " +
                                                          dateConvert(
                                                              item.flight
                                                                  .departure_datetime
                                                          )}
                                                  </Typography>
                                              </div>
                                          </div>
                                          <div className="col-md-4">
                                              <div className="logo-airline">
                                                  <img
                                                      src={`${URL_IMAGE_AIRLINE}${item.flight.airline.logo}`}
                                                      className="logo"
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-12">
                                              <div className="ticket-price">
                                                  <div className="row">
                                                      <div className="col-md-6">
                                                          <Typography
                                                              variant="h6"
                                                              className="title left-title"
                                                          >
                                                              Tóm tắt giá vé
                                                          </Typography>
                                                      </div>
                                                      <div className="col-md-6">
                                                          <Typography
                                                              variant="h6"
                                                              className="title total-title"
                                                          >
                                                              Tổng
                                                          </Typography>
                                                      </div>
                                                      <div className="passenger-list-price">
                                                          {item.passenger.map(
                                                              (psg) => {
                                                                  if (
                                                                      psg.quantity >
                                                                      0
                                                                  )
                                                                      return (
                                                                          <div
                                                                              key={
                                                                                  psg.passenger_type
                                                                              }
                                                                              className="row"
                                                                          >
                                                                              <div className="col-sm-4">
                                                                                  <Typography
                                                                                      variant="body1"
                                                                                      className="content-line"
                                                                                  >
                                                                                      {psg.passenger_type ==
                                                                                      1
                                                                                          ? "Người lớn"
                                                                                          : psg.passenger_type ==
                                                                                            2
                                                                                          ? "Trẻ em"
                                                                                          : psg.passenger_type ==
                                                                                            3
                                                                                          ? "Em bé"
                                                                                          : ""}
                                                                                  </Typography>
                                                                              </div>
                                                                              <div className="col-sm-4">
                                                                                  <Typography
                                                                                      variant="body1"
                                                                                      className="content-line"
                                                                                  >
                                                                                      {`${
                                                                                          psg.quantity
                                                                                      } x ${formatCurrency(
                                                                                          item.total_price
                                                                                      )}`}
                                                                                  </Typography>
                                                                              </div>
                                                                              <div className="col-sm-4">
                                                                                  <Typography
                                                                                      variant="body1"
                                                                                      className="content-line right"
                                                                                  >
                                                                                      {formatCurrency(
                                                                                          psg.quantity *
                                                                                              item.total_price
                                                                                      )}
                                                                                  </Typography>
                                                                              </div>
                                                                          </div>
                                                                      );
                                                              }
                                                          )}
                                                          {item.seatFee > 0 ? (
                                                              <div className="row">
                                                                  <div className="col-md-6">
                                                                      <Typography
                                                                          variant="h5"
                                                                          className="add-fee"
                                                                      >
                                                                          Ghế
                                                                          ngồi
                                                                      </Typography>
                                                                  </div>
                                                                  <div className="col-md-6">
                                                                      <Typography
                                                                          variant="h4"
                                                                          className="add-fee right"
                                                                      >
                                                                          {formatCurrency(
                                                                              item.seatFee
                                                                          )}
                                                                      </Typography>
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}

                        <div className="row">
                            <div className="col-md-6">
                                <Typography
                                    variant="h4"
                                    className="total-price"
                                >
                                    Tổng chi phí
                                </Typography>
                            </div>
                            <div className="col-md-6">
                                <Typography
                                    variant="h4"
                                    className="total-price right"
                                >
                                    {formatCurrency(intoMoney)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TicketDetails;
