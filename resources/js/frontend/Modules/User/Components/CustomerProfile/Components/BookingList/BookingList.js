import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { dateConvert } from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import AuthService from "../../../../../../Shared/Service/AuthService";
import AlertModal from "../../../../../../Shared/Components/Modal/AlertModal";
import UserService from "../../../../Shared/UserService/UserService";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../../../Shared/Components/Alert/AlertDanger";
import "./BookingList.scss";

class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookingFlight: [],
            message: "",
            errMessage: "",
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

    cancelBooking = (id) => {
        UserService.cancelBooking(id)
            .then((res) => {
                this.setState({
                    message: `Hủy đặt vé chuyến bay ${res.data.flight.departure.city} - ${res.data.flight.destination.city} thành công`,
                });
                this.getMyBookingFlight();
            })
            .catch((err) => {
                this.setState({
                    errMessage: `Hủy đặt vé thất bại, vui lòng thử lại sau`,
                });
            });
    };

    render() {
        const { myBookingFlight, message, errMessage } = this.state;
        if (message.length > 0 || errMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    message: "",
                    errMessage: "",
                });
            }, 10000);
        }
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
                                <AlertSuccess message={message} />
                                <AlertDanger message={errMessage} />
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ngày đặt</th>
                                                <th>Điểm đến - điểm đi</th>
                                                <th>Mã chuyến bay</th>
                                                <th>Tổng cộng</th>
                                                <th>Trạng thái thanh toán</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myBookingFlight.map((item) => {
                                                return (
                                                    <tr key={item.id}>
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
                                                        <td>
                                                            {item.payment_status ===
                                                            0
                                                                ? "Chưa thanh toán"
                                                                : "Đã thanh toán"}
                                                        </td>

                                                        <td>
                                                            <div className="btn-box-control">
                                                                <Link
                                                                    to={{
                                                                        pathname:
                                                                            "/customer-info/booking-details",
                                                                        state: item,
                                                                    }}
                                                                >
                                                                    <button className="btn btn-primary">
                                                                        Xem chi
                                                                        tiết
                                                                    </button>
                                                                </Link>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    style={{
                                                                        marginTop:
                                                                            "1rem",
                                                                    }}
                                                                    data-toggle="modal"
                                                                    data-target={`#alertModal${item.id}`}
                                                                >
                                                                    Hủy đặt vé
                                                                </button>
                                                            </div>

                                                            <AlertModal
                                                                id={item.id}
                                                                title={
                                                                    "Thông báo"
                                                                }
                                                                message={`Bạn có chắc chắn muốn hủy đặt vé ${item.flight.departure.city} - ${item.flight.destination.city}`}
                                                                onConfirm={
                                                                    this
                                                                        .cancelBooking
                                                                }
                                                            />
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
