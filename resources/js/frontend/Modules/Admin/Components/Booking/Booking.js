import React from "react";
import { Component } from "react";
import BookingService from "./Shared/BookingService";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
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

    render() {
        const { bookingList } = this.state;
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
                                                <th>Trạng thái</th>
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
                                                            {item.departure.city + " - " + item.destination.city} 
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.booking_date}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.passenger_count}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight.flight_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airline.airline_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.into_money}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.status == 0 ? "Chờ xác nhận" : "Đã xác nhận"}
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
