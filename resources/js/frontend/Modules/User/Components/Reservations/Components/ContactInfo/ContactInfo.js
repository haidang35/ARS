import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { REGEX_TEL } from "../../../../../../Constances/const";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import "./ContactInfo.scss";

class ContactInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                vocative: "Anh",
                phone: "",
                email: "",
                address: "",
                note: "",
            }),
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.onReservation) {
            this.onReservation();
        }
    };

    onReservation = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                contact_name: form.name.value,
                phone: form.phone.value,
                email: form.email.value,
                vocative: form.vocative.value,
                address: form.address.value,
                note: form.note.value,
            };
            this.props.getContactInfo(data);
        }
    };

    render() {
        const { name, vocative, phone, email, address, note, dirty } =
            this.state.form;

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
                                        name="vocative"
                                        required
                                        value={vocative.value}
                                        className="form-control form-select"
                                        onChange={(ev) =>
                                            this._setValue(ev, "vocative")
                                        }
                                    >
                                        <option value={"Anh"}>Anh</option>
                                        <option value={"Chị"}>Chị</option>
                                        <option value={"Quý ông"}>
                                            Quý ông
                                        </option>
                                        <option value={"Quý bà"}>Quý bà</option>
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
                                        name="name"
                                        className="form-control"
                                        placeholder="Họ và tên"
                                        value={name.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "name")
                                        }
                                    />
                                    {name.err == "*" && dirty ? (
                                        <FormError err="Vui lòng nhập tên liên hệ" />
                                    ) : (
                                        ""
                                    )}
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
                                        pattern={REGEX_TEL}
                                        name="phone"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                        value={phone.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "phone")
                                        }
                                    />
                                    {phone.err == "*" && dirty ? (
                                        <FormError err="Vui lòng nhập số điện thoại" />
                                    ) : phone.err.length > 0 && dirty ? (
                                        <FormError err="Số điện thoại không đúng" />
                                    ) : (
                                        ""
                                    )}
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
                                        name="email"
                                        required
                                        className="form-control"
                                        placeholder="Email"
                                        value={email.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "email")
                                        }
                                    />
                                    {email.err == "*" && dirty ? (
                                        <FormError err="Vui lòng nhập email" />
                                    ) : email.err.length > 0 && dirty ? (
                                        <FormError err="Sai định dạng email" />
                                    ) : (
                                        ""
                                    )}
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
                                        name="address"
                                        value={address.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "address")
                                        }
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
                                        name="note"
                                        className="form-control"
                                        placeholder="Ghi chú đặc biệt"
                                        value={note.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "note")
                                        }
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
