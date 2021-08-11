import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { dateConvert } from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import AuthService from "../../../../../../Shared/Service/AuthService";

class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookingFlight: [],
        };
    }

    componentDidMount() {
        this.getMyBookingFlight();
    }

    getMyBookingFlight = () => {
        AuthService.getMyBookingFlight().then((res) => {
            this.setState({
                myBookingFlight: res.data,
            });
        });
    };

    render() {
        const { myBookingFlight } = this.state;
        let loop = 1;
        return (
            <div>
                <div className="user-booking-list">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Lịch sử đặt vé</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ngày đặt</th>
                                                <th>Điểm đến - điểm đi</th>
                                                <th>Mã chuyến bay</th>
                                                <th>Tổng cộng</th>
                                                <th>Trạng thái</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myBookingFlight.map((item) => {
                                                return (
                                                    <tr>
                                                        <td className="text-bold-500">
                                                            {loop++}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {dateConvert(
                                                                item.booking_date
                                                            )}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {`${item.flight.departure.city} - ${item.flight.destination.city}`}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .flight_code
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {formatCurrency(
                                                                item.into_money
                                                            )}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.status ==
                                                            1 ? (
                                                                <button className="btn btn-warning rounded-pill">
                                                                    Đang chờ xác
                                                                    nhận
                                                                </button>
                                                            ) : item.status ==
                                                              2 ? (
                                                                <button className="btn btn-success rounded-pill">
                                                                    Đã xác nhận
                                                                </button>
                                                            ) : (
                                                                <button className="btn btn-danger rounded-pill">
                                                                    Đã bị hủy
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={{
                                                                    pathname:
                                                                        "/customer-info/booking-details",
                                                                    state: item,
                                                                }}
                                                            >
                                                                <button className="btn btn-primary">
                                                                    Xem chi tiết
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BookingList;
