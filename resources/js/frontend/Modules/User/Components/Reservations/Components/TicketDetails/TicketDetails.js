import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./TicketDetails.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

class TicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="ticket-details">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Phương thức thanh toán
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="flight-time">
                                    <Typography
                                        variant="span"
                                        className="destination"
                                    >
                                        Hà Nội
                                    </Typography>
                                    <FaLongArrowAltRight className="icon-arrow" />
                                    <Typography
                                        variant="span"
                                        className="destination"
                                    >
                                        Đà Nẵng
                                    </Typography>
                                </div>
                                <div className="flight-time">
                                    <BiTime className="icon-clock" />
                                    <Typography variant="span" className="time">
                                        10:45 15-08-2021
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="logo-airline">
                                    <img
                                        src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
                                        className="logo"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="ticket-price">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th className="title left-title">
                                                        Tóm tắt giá vé
                                                    </th>
                                                    <th></th>
                                                    <th className="title total-title">
                                                        Tổng
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="content-line">
                                                        Người lớn
                                                    </td>
                                                    <td className="content-line">
                                                        2 x 1.500.000
                                                    </td>
                                                    <td className="content-line">
                                                        3.000.000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="2"
                                                        className="total-price"
                                                    >
                                                        Tổng chi phí
                                                    </td>
                                                    <td className="total-price">
                                                        3.000.000
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
export default TicketDetails;
