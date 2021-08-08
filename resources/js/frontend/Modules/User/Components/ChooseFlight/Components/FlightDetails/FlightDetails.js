import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./FlightDetails.scss";
import { BsInfoCircleFill } from "react-icons/bs";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";

class FlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { data } = this.props;

        return (
            <div>
                <div className="flight-details">
                    <div className="flight-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Chi tiết chuyến bay
                            </Typography>
                        </div>

                        <div className="content">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="logo-box">
                                        <img
                                            className="logo"
                                            src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.flight.departure.city +
                                                ` (${data.flight.departure.airport_code})`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Sân bay ${data.flight.departure.airport_name}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Cất cánh ${getTime(
                                                data.flight.departure_datetime
                                            )}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Ngày ${dateConvert(
                                                data.flight.departure_datetime
                                            )}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.flight.destination.city +
                                                ` (${data.flight.destination.airport_code})`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Sân bay ${data.flight.destination.airport_name}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Hạ cánh ${getTime(
                                                data.flight.arrival_datetime
                                            )}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Ngày ${dateConvert(
                                                data.flight.arrival_datetime
                                            )}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {`Chuyến bay ${data.flight.flight_code}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Hạng ghế ngồi ${data.available_class}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Loại vé: ${data.ticket_type}`}
                                        </Typography>
                                        <Typography className="info-item">
                                            {`Máy bay ${data.flight.aircraft}`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Chi tiết giá vé
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead>
                                        <tr>
                                            <th>Hành khách</th>
                                            <th>Số lượng</th>
                                            <th>Giá vé</th>
                                            <th>Thuế và phí</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.passenger.map((item) => {
                                            if (item.quantity > 0)
                                                return (
                                                    <tr
                                                        key={
                                                            item.passenger_type
                                                        }
                                                    >
                                                        <td>
                                                            {item.passenger_type ==
                                                            1
                                                                ? "Người lớn"
                                                                : item.passenger_type ==
                                                                  2
                                                                ? "Trẻ em"
                                                                : "Em bé"}
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            {formatCurrency(
                                                                data.price
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                data.tax
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                item.quantity *
                                                                    (data.price +
                                                                        data.tax)
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                        })}

                                        <tr>
                                            <td colSpan="4">
                                                Tổng giá vé (VND)
                                            </td>
                                            <td>
                                                {" "}
                                                {formatCurrency(
                                                    data.into_money
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="baggage-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Điều kiện hành lý
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Hành lý xách tay
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            {`${data.carbin_bag}kg`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Hành lý ký gửi
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            {`${data.checkin_bag}kg`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <BsInfoCircleFill className="icon-info" />
                                Điều kiện về vé
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="note">
                                <Typography>
                                    *Lưu ý quan trọng: Quý khách vui lòng check
                                    lại thông tin chuyến bay trước ngày bay 24
                                    tiếng và thực hiện đúng thứ tự hành trình
                                    bay trên vé, nếu chặng nào không bay vui
                                    lòng báo lại Vemaybay.vn để được hỗ trợ
                                    tránh trường hợp booking bị hủy chỗ .
                                </Typography>
                            </div>
                            <div className="note-change">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography>
                                            Thay đổi chuyến bay
                                        </Typography>
                                    </div>
                                    <div className="col-sm-9">
                                        <Typography>
                                            - Trước giờ khởi hành 12 tiếng: Thu
                                            phí 297.000VNĐ/chiều/khách + Chênh
                                            lệch giá vé (nếu có)
                                        </Typography>
                                        <Typography>
                                            - Trong vòng 12 tiếng và sau giờ
                                            khởi hành: Không áp dụng
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlightDetails;
