import React from "react";
import { Component } from "react";

class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                                            <tr>
                                                <td className="text-bold-500"></td>
                                                <td className="text-bold-500"></td>
                                            </tr>
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
