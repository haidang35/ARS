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
        const { passengers, ticket, booking } = this.props;
        let loop = 1;
        return (
            <div className="passenger-info">
                <div className="title-box">
                    <Typography variant="h6" className="title">
                        Thông tin hành khách và giá vé
                    </Typography>
                </div>
                <div className="content">
                    <div className="table-responsive">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th className="title-item">STT</th>
                                    <th className="title-item">Hành khách</th>
                                    <th className="title-item">Giới tính</th>
                                    <th className="title-item">Năm sinh</th>
                                    <th className="title-item">Giá vé</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passengers.map((item) => {
                                    return (
                                        <tr>
                                            <td className="content-item">
                                                {loop++}
                                            </td>
                                            <td className="content-item">
                                                {item.passenger_name}
                                            </td>
                                            <td className="content-item">
                                                {item.gender}
                                            </td>
                                            <td className="content-item">
                                                {dateConvert(item.birthday)}
                                            </td>
                                            <td className="content-item">
                                                {formatCurrency(
                                                    ticket.price + ticket.tax
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="content-item-total"
                                    >
                                        Tổng chi phí
                                    </td>
                                    <td className="content-item-total">
                                        {formatCurrency(booking.into_money)}
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
