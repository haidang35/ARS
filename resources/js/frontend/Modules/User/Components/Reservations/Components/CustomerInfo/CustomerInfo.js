import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./CustomerInfo.scss";

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="customer-info">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Thông tin khách hàng
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="table-responsive">
                            <table className="table table-lg">
                                <thead>
                                    <tr>
                                        <th>Khách hàng</th>
                                        <th>Quý danh</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Người lớn</td>
                                        <td>
                                            <select
                                                name="vocative"
                                                className="form-control form-select"
                                            >
                                                <option>Anh</option>
                                                <option>Chị</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                name="name"
                                                className="form-control "
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name="birthday"
                                                className="form-control"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hành lý xách tay</td>
                                        <td colSpan="3">7kg</td>
                                    </tr>
                                    <tr>
                                        <td>Hành lý ký gửi</td>
                                        <td colSpan="3">
                                            <select
                                                name="checking-bag"
                                                className="form-control form-select"
                                            >
                                                <option>
                                                    Tổng cộng 25kg hành lý ký
                                                    gửi
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerInfo;
