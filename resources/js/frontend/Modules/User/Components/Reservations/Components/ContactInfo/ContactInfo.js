import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./ContactInfo.scss";

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="contact-info">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Thông tin liên hệ
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Quý danh{" "}
                                        <span className="required-label">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        type="text"
                                        className="form-control form-select"
                                    >
                                        <option>Quý ông</option>
                                        <option>Quý bà</option>
                                        <option>Anh</option>
                                        <option>Chị</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Họ và tên{" "}
                                        <span className="required-label">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        placeholder="Họ và tên"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Điện thoại{" "}
                                        <span className="required-label">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="tel"
                                        required
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Email{" "}
                                        <span className="required-label">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Địa chỉ{" "}
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Địa chỉ"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="label-info">
                                        Ghi chú{" "}
                                    </label>

                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Ghi chú đặc biệt"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactInfo;
