import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import "./CustomerInfo.scss";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import AuthService from "../../../../../../Shared/Service/AuthService";
import AlertDanger from "../../../../../../Shared/Components/Alert/AlertDanger";
import { REGEX_TEL } from "../../../../../../Constances/const";

class CustomerInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                email: "",
                phone: "",
            }),
            onEdit: false,
            message: "",
            errMessage: "",
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

    onEditInfo = () => {
        this.setState({
            onEdit: true,
        });
    };

    onCancelEdit = () => {
        this.setState({
            onEdit: false,
        });
        this.getCustomerInfo();
    };

    onSaveChangeEdit = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
            };
            AuthService.updateMyInfo(data)
                .then((res) => {
                    console.log(
                        "🚀 ~ file: CustomerInfo.js ~ line 64 ~ CustomerInfo ~ .then ~ res",
                        res
                    );
                    this.setState({
                        message: "Cập nhật thông tin khách hàng thành công",
                        onEdit: false,
                    });
                    this._fillForm({
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone,
                    });
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                })
                .catch((err) => {
                    this.setState({
                        errMessage: "Email đăng nhập đã tồn tại",
                    });
                });
        }
    };

    render() {
        const { name, email, phone, dirty } = this.state.form;
        const { onEdit } = this.state;
        return (
            <div>
                <div className="customer-info">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-right">
                                {!onEdit ? (
                                    <button
                                        onClick={this.onEditInfo}
                                        className="btn btn-primary"
                                    >
                                        Edit info
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <h4 className="card-title">Customer's Info</h4>
                        </div>
                        <div className="card-content">
                            {this.state.message.length > 0 ? (
                                ""
                            ) : (
                                <AlertDanger message={this.state.errMessage} />
                            )}
                            <AlertSuccess message={this.state.message} />

                            <div className="card-body">
                                <div className="form-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div
                                                className="form-group has-icon-left"
                                                style={{ marginLeft: "0" }}
                                            >
                                                <label htmlFor="first-name-icon">
                                                    Full name
                                                </label>
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="first-name-icon"
                                                        name="name"
                                                        required
                                                        disabled={!onEdit}
                                                        value={name.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "name"
                                                            )
                                                        }
                                                    />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-person" />
                                                    </div>
                                                </div>
                                                {name.err == "*" && dirty ? (
                                                    <FormError
                                                        err={
                                                            "Họ và tên không được để trống"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
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
                                                        required
                                                        disabled={!onEdit}
                                                        id="email-id-icon"
                                                        name="email"
                                                        value={email.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "email"
                                                            )
                                                        }
                                                    />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-envelope" />
                                                    </div>
                                                </div>
                                                {email.err == "*" && dirty ? (
                                                    <FormError
                                                        err={
                                                            "Email đăng nhập không được để trống"
                                                        }
                                                    />
                                                ) : dirty ? (
                                                    <FormError
                                                        err={email.err}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div
                                                className="form-group has-icon-left"
                                                style={{ marginLeft: "0" }}
                                            >
                                                <label htmlFor="mobile-id-icon">
                                                    Phone number
                                                </label>
                                                <div className="position-relative">
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Mobile"
                                                        required
                                                        pattern={REGEX_TEL}
                                                        disabled={!onEdit}
                                                        id="mobile-id-icon"
                                                        name="phone"
                                                        value={phone.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "phone"
                                                            )
                                                        }
                                                    />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-phone" />
                                                    </div>
                                                </div>
                                                {phone.err == "*" && dirty ? (
                                                    <FormError
                                                        err={
                                                            "Số điện thoại không được để trống"
                                                        }
                                                    />
                                                ) : dirty ? (
                                                    <FormError
                                                        err={phone.err}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12"></div>
                                        {onEdit ? (
                                            <div className="col-md-12 d-flex justify-content-end">
                                                <button
                                                    onClick={
                                                        this.onSaveChangeEdit
                                                    }
                                                    type="submit"
                                                    className="btn btn-primary me-1 mb-1"
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    onClick={this.onCancelEdit}
                                                    type="button"
                                                    className="btn btn-light-secondary me-1 mb-1"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
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

export default CustomerInfo;
