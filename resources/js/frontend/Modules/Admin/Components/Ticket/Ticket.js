import React from "react";
import { Component } from "react";
import TicketService from "./Shared/TicketService";

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
        };
    }

    componentDidMount() {
        this.getTicketList();
    }

    getTicketList = () => {
        TicketService.getTicketList().then((res) => {
            this.setState({
                ticketList: res.data,
            });
        });
    };

    render() {
        const { ticketList } = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Danh sách vé máy bay</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Chuyến bay</th>
                                                <th>Điểm khởi hành</th>
                                                <th>Điểm đến</th>
                                                <th>Loại máy bay</th>
                                                <th>Thời gian khởi hành</th>
                                                <th>Thời gian đến</th>
                                                <th>Hạng ghế có sẵn</th>
                                                <th>Số chỗi ngồi</th>
                                                <th>Trạng thái</th>
                                                <th>Hành lý xách tay tối đa</th>
                                                <th>Hành lý ký gửi tối đa</th>
                                                <th>Giá vé</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketList.map((item) => {
                                                return (
                                                    <tr>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .flight_code
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.departure.city
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.destination
                                                                    .city
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .aircraft
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .departure_datetime
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .arrival_datetime
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.available_class
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight.seats_available
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.status == 1 ? "Khởi hành đúng giờ" : "Bị hoãn"
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.carbin_bag
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.checkin_bag
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.price
                                                            }
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

export default Ticket;
