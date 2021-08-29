import React from "react";
import { Component } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BiRectangle } from "react-icons/bi";
import { Typography } from "@material-ui/core";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import TicketDetails from "../../../Reservations/Components/TicketDetails/TicketDetails";

class BookingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { bookingInfo, passengerChoosedSeat } = this.props;
        let passengers = [];
        if (Object.keys(bookingInfo).length > 0) {
            passengers = bookingInfo.passengers;
        }

        return (
            <div>
                <div className="booking-info-service">
                    <div className="passenger-list">
                        {/* <div className="title-box">
                            <Typography variant="h6">Hà Nội </Typography>
                            <span> - </span>
                            <Typography variant="h6"> Đà Nẵng</Typography>
                        </div> */}
                        <div className="passengers-box">
                            {passengers.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`passenger-item ${
                                            passengerChoosedSeat.id === item.id
                                                ? `passenger-item-active`
                                                : ``
                                        }`}
                                        onClick={() =>
                                            this.props.setPassengerSeat(item)
                                        }
                                    >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography
                                                    className="passenger-name"
                                                    variant="body1"
                                                >
                                                    {item.passenger_name}
                                                </Typography>
                                                {item.seat_code !== "" ? (
                                                    <Typography
                                                        className="seat-status seat-status-active"
                                                        variant="body1"
                                                    >
                                                        <ImCheckmark className="checked-icon" />
                                                        Đã thêm chỗ ngồi
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        className="seat-status"
                                                        variant="body1"
                                                    >
                                                        Chọn chỗ ngồi của bạn
                                                        <IoIosArrowForward className="icon-arrow" />
                                                    </Typography>
                                                )}
                                            </div>
                                            {item.seat_code !== "" ? (
                                                <div className="col-md-6">
                                                    <div className="seat-selected-info">
                                                        <MdAirlineSeatReclineNormal className="seat-icon" />
                                                        <div>
                                                            <Typography
                                                                variant="body1"
                                                                className="seat-name"
                                                            >
                                                                {item.seat_code}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                className="seat-price"
                                                            >
                                                                {`+${formatCurrency(
                                                                    item.price
                                                                )}`}
                                                            </Typography>
                                                        </div>

                                                        <IoCloseSharp
                                                            className="close-icon"
                                                            onClick={
                                                                passengerChoosedSeat.id ===
                                                                item.id
                                                                    ? () =>
                                                                          this.props.setSeatCodePassenger(
                                                                              "",
                                                                              item.price
                                                                          )
                                                                    : {}
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
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
export default BookingInfo;
