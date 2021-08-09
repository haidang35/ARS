import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import "./CustomerInfo.scss";

class CustomerInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                email: "",
                phone: "",
            }),
        };
    }

    componentDidMount() {
        this.getCustomerInfo();
    }

    getCustomerInfo = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this._fillForm({
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
        });
    };

    render() {
        const { name, email, phone } = this.state.form;
        return (
            <div>
                <div className="customer-info">
                    ;
                    <div className="card">
                        <div className="card-header">
                            <div className="float-right">
                                <button className="btn btn-primary">
                                    Sửa thông tin
                                </button>
                            </div>
                            <h4 className="card-title">Thông tin khách hàng</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <form className="form form-vertical">
                                    <div className="form-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div
                                                    className="form-group has-icon-left"
                                                    style={{ marginLeft: "0" }}
                                                >
                                                    <label htmlFor="first-name-icon">
                                                        Họ và tên
                                                    </label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="first-name-icon"
                                                            name="name"
                                                            value={name.value}
                                                        />
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-person" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div
                                                    className="form-group has-icon-left"
                                                    style={{ marginLeft: "0" }}
                                                >
                                                    <label htmlFor="email-id-icon">
                                                        Email
                                                    </label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            id="email-id-icon"
                                                            name="email"
                                                            value={email.value}
                                                        />
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-envelope" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div
                                                    className="form-group has-icon-left"
                                                    style={{ marginLeft: "0" }}
                                                >
                                                    <label htmlFor="mobile-id-icon">
                                                        Số điện thoại
                                                    </label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Mobile"
                                                            id="mobile-id-icon"
                                                            name="phone"
                                                            value={phone.value}
                                                        />
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-phone" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12"></div>
                                            <div className="col-md-12 d-flex justify-content-end">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-1 mb-1"
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="btn btn-light-secondary me-1 mb-1"
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerInfo;
