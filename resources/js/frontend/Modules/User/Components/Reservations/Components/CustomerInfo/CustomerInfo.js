import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./CustomerInfo.scss";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";

class CustomerInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                vocative: "Anh",
                birthday: "",
            }),
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.onReservation == true) {
            this.onReservation();
        }
    };

    onReservation = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;

            const data = {
                name: form.name.value,
                vocative: form.vocative.value,
                birthday: form.birthday.value,
            };
            this.props.getCustomerInfo(data);
        }
    };

    render() {
        const { data, onReservation } = this.props;
        const { name, vocative, birthday, dirty } = this.state.form;
        const passenger = [];
        if (Array.isArray(data.passenger)) {
            data.passenger.forEach((item) => {
                if (item.quantity > 0) {
                    passenger.push(item);
                }
            });
        }

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
                                    {passenger.map((item) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {item.passenger_type == 1
                                                        ? "Người lớn"
                                                        : item.passenger_type ==
                                                          2
                                                        ? "Trẻ em"
                                                        : "Em bé"}
                                                </td>
                                                <td>
                                                    <select
                                                        name="vocative"
                                                        required
                                                        className="form-control form-select"
                                                        value={vocative.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "vocative"
                                                            )
                                                        }
                                                    >
                                                        <option value={"Anh"}>
                                                            Anh
                                                        </option>
                                                        <option value={"Chị"}>
                                                            Chị
                                                        </option>
                                                    </select>
                                                    <FormError
                                                        err={vocative.err}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        className="form-control "
                                                        value={name.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "name"
                                                            )
                                                        }
                                                    />
                                                    {name.err == "*" &&
                                                    dirty ? (
                                                        <FormError err="Vui lòng điền tên hành khách" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="birthday"
                                                        required
                                                        className="form-control"
                                                        value={birthday.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "birthday"
                                                            )
                                                        }
                                                    />
                                                    {birthday.err == "*" &&
                                                    dirty ? (
                                                        <FormError err="Vui lòng điền ngày sinh" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    <tr>
                                        <td>Hành lý xách tay</td>
                                        <td colSpan="3">{`${data.carbin_bag}kg`}</td>
                                    </tr>
                                    <tr>
                                        <td>Hành lý ký gửi</td>
                                        <td colSpan="3">
                                            <select
                                                name="checking-bag"
                                                className="form-control form-select"
                                            >
                                                <option>
                                                    {`Tổng cộng ${data.checkin_bag}kg hành lý ký
                                                    gửi`}
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
