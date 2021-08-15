import React from "react";
import { Component } from "react";
import BookingService from "./Shared/BookingService";
import { formatCurrency } from "../../../../Helpers/FormatCurrency";
import { Link } from "react-router-dom";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
            message: "",
            itemLoadingConfirm: "",
        };
    }

    componentDidMount() {
        this.getBookingList();
    }

    getBookingList = () => {
        BookingService.getAllBooking().then((res) => {
            this.setState({
                bookingList: res.data,
            });
        });
    };

    confirmBooking = (id) => {
        this.setState({ itemLoadingConfirm: id });
        BookingService.updateStatus(id, { status: 2 }).then((res) => {
            this.setState({
                message: `Xác nhận đặt vé cho khách hàng ${res.data.contact_name} thành công`,
                itemLoadingConfirm: "",
            });
            this.getBookingList();
        });
    };

    cancelBooking = (id) => {
        this.setState({ itemLoadingConfirm: id });
        BookingService.updateStatus(id, { status: 3 }).then((res) => {
            this.setState({
                message: `Hủy đặt vé cho khách hàng ${res.data.contact_name} thành công`,
                itemLoadingConfirm: "",
            });
            this.getBookingList();
        });
    };

    render() {
        const { bookingList, itemLoadingConfirm } = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Danh sách khách hàng đặt vé máy bay
                            </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <AlertSuccess message={this.state.message} />
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th>Hành trình</th>
                                                <th>Ngày đặt vé </th>
                                                <th>Số lượng hành khách </th>
                                                <th>Chuyến bay </th>
                                                <th>Hãng hàng không </th>
                                                <th>Tổng tiền</th>
                                                <th>Trạng thái thanh toán</th>
                                                <th>Trạng thái</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.contact_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.contact_phone}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight
                                                                .departure
                                                                .city +
                                                                " - " +
                                                                item.flight
                                                                    .destination
                                                                    .city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.booking_date}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.passenger
                                                                    .length
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .flight_code
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .airline
                                                                    .airline_name
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {formatCurrency(
                                                                item.into_money
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.payment_status ==
                                                            0
                                                                ? "Chưa thanh toán"
                                                                : "Đã thanh toán"}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.status ==
                                                            1 ? (
                                                                <button className="btn btn-sm btn-warning">
                                                                    Chờ xác nhận
                                                                </button>
                                                            ) : item.status ==
                                                              2 ? (
                                                                <button className="btn btn-sm btn-success">
                                                                    Đã xác nhận
                                                                </button>
                                                            ) : item.status ==
                                                              3 ? (
                                                                <button className="btn btn-sm btn-danger">
                                                                    Đã hủy
                                                                </button>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group-table">
                                                                {item.status ==
                                                                    1 ||
                                                                item.status ==
                                                                    3 ? (
                                                                    <button
                                                                        onClick={() =>
                                                                            this.confirmBooking(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="btn btn-success rounded-pill"
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            justifyContent:
                                                                                "center",
                                                                            alignItems:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {itemLoadingConfirm ==
                                                                        item.id ? (
                                                                            <div
                                                                                className="spinner-border text-warning"
                                                                                role="status"
                                                                                style={{
                                                                                    marginRight:
                                                                                        "7px",
                                                                                }}
                                                                            >
                                                                                <span className="visually-hidden">
                                                                                    Loading...
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                        {itemLoadingConfirm ==
                                                                        item.id
                                                                            ? "Confirming"
                                                                            : "Confirm"}
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() =>
                                                                            this.cancelBooking(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="btn btn-danger rounded-pill"
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            justifyContent:
                                                                                "center",
                                                                            alignItems:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {itemLoadingConfirm ==
                                                                        item.id ? (
                                                                            <div
                                                                                className="spinner-border text-warning"
                                                                                role="status"
                                                                                style={{
                                                                                    marginRight:
                                                                                        "7px",
                                                                                }}
                                                                            >
                                                                                <span className="visually-hidden">
                                                                                    Loading...
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                        {itemLoadingConfirm ==
                                                                        item.id
                                                                            ? "Đang hủy"
                                                                            : "Hủy bỏ"}
                                                                    </button>
                                                                )}

                                                                <Link
                                                                    to={`/admin/bookings/${item.id}`}
                                                                >
                                                                    <button className="btn btn-primary rounded-pill">
                                                                        View
                                                                    </button>
                                                                </Link>
                                                            </div>
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

export default Booking;
