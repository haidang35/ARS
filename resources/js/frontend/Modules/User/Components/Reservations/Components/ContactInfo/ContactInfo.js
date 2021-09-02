import { FormGroup, Typography } from "@material-ui/core";
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
                nameContact: "",
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
                contact_name: form.nameContact.value,
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
        const { nameContact, vocative, phone, email, address, note, dirty } =
            this.state.form;

        return (
            <div>
                <div className="contact-info">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Contact info
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="label-info">
                                    Vocative{" "}
                                    <span className="required-label">*</span>
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
                                    <option value={"Quý ông"}>Quý ông</option>
                                    <option value={"Quý bà"}>Quý bà</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label className="label-info">
                                    Full name{" "}
                                    <span className="required-label">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    name="nameContact"
                                    className="form-control"
                                    placeholder="Full name"
                                    value={nameContact.value}
                                    onChange={(ev) =>
                                        this._setValue(ev, "nameContact")
                                    }
                                />
                                {nameContact.err == "*" && dirty ? (
                                    <FormError err="Full name cannot be empty" />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-sm-4">
                                <label className="label-info">
                                    Phone number{" "}
                                    <span className="required-label">*</span>
                                </label>

                                <input
                                    type="tel"
                                    required
                                    pattern={REGEX_TEL}
                                    name="phone"
                                    className="form-control"
                                    placeholder="Phone number"
                                    value={phone.value}
                                    onChange={(ev) =>
                                        this._setValue(ev, "phone")
                                    }
                                />
                                {phone.err == "*" && dirty ? (
                                    <FormError err="Phone number cannot be empty" />
                                ) : phone.err.length > 0 && dirty ? (
                                    <FormError err="Incorrect phone number " />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
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
                                        <FormError err="Email cannot be empty" />
                                    ) : email.err.length > 0 && dirty ? (
                                        <FormError err="Wrong email format " />
                                    ) : (
                                        ""
                                    )}
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <label className="label-info">
                                        Address{" "}
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        name="address"
                                        value={address.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "address")
                                        }
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <label className="label-info">Note </label>
                                    <textarea
                                        type="text"
                                        name="note"
                                        className="form-control"
                                        placeholder="Note"
                                        value={note.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "note")
                                        }
                                    ></textarea>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactInfo;
