import React from "react";
import { Component } from "react";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import SubNavbar from "../../../User/Shared/Components/SubNavbar/SubNavbar";
import AuthService from "../../../../Shared/Service/AuthService";
import "./Register.scss";
import { Link, Redirect } from "react-router-dom";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";

class Register extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                email: "",
                password: "",
                c_password: "",
                phone: "",
            }),
            passwordErr: "",
            redirectLogin: false,
            message: "",
        };
    }

    onRegister = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            if (form.password.value == form.c_password.value) {
                const data = {
                    name: form.name.value,
                    email: form.email.value,
                    password: form.password.value,
                    password_confirmation: form.c_password.value,
                    phone: form.phone.value,
                };
                AuthService.userRegister(data)
                    .then((res) => {
                        this.setState({
                            message: "Đăng ký tài khoản thành công",
                        });
                        this._fillForm({
                            name: "",
                            email: "",
                            password: "",
                            c_password: "",
                            phone: "",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.setState({
                    passwordErr: "Mật khẩu không trùng khớp, vui lòng thử lại ",
                });
            }
        }
    };

    render() {
        const { name, email, password, dirty, c_password, phone } =
            this.state.form;

        return (
            <div>
                <SubNavbar />
                <div className="user-register-page">
                    <div className="wrap-container">
                        <div className="container-fluid ps-md-0">
                            <div className="row g-0">
                                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                                <div className="col-md-8 col-lg-6">
                                    <div className="login d-flex align-items-center py-5">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-9 col-lg-8 mx-auto">
                                                    <AlertSuccess
                                                        message={
                                                            this.state.message
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-9 col-lg-8 mx-auto">
                                                    <h3 className="login-heading mb-4">
                                                        Đăng Ký
                                                    </h3>
                                                    {/* Sign In Form */}
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            required
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            value={name.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "name"
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="floatingInput">
                                                            Họ và tên
                                                        </label>
                                                        {name.err == "*" &&
                                                        dirty ? (
                                                            <FormError err="Vui lòng nhập họ và tên" />
                                                        ) : dirty ? (
                                                            <FormError
                                                                err={name.err}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            value={email.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "email"
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="floatingInput">
                                                            Email address
                                                        </label>
                                                        {email.err == "*" &&
                                                        dirty ? (
                                                            <FormError err="Vui lòng nhập email" />
                                                        ) : dirty ? (
                                                            <FormError
                                                                err={email.err}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            required
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            value={phone.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "phone"
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="floatingInput">
                                                            Số điện thoại
                                                        </label>
                                                        {phone.err == "*" &&
                                                        dirty ? (
                                                            <FormError err="Vui lòng nhập số điện thoại" />
                                                        ) : dirty ? (
                                                            <FormError
                                                                err={phone.err}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            required
                                                            className="form-control"
                                                            id="floatingPassword"
                                                            placeholder="Password"
                                                            value={
                                                                password.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "password"
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="floatingPassword">
                                                            Password
                                                        </label>
                                                        {password.err == "*" &&
                                                        dirty ? (
                                                            <FormError err="Vui lòng nhập password" />
                                                        ) : dirty ? (
                                                            <FormError
                                                                err={
                                                                    password.err
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            name="c_password"
                                                            required
                                                            className="form-control"
                                                            id="floatingPassword"
                                                            placeholder="Password Confirm"
                                                            value={
                                                                c_password.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "c_password"
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="floatingPassword">
                                                            Password Confirm
                                                        </label>
                                                        {c_password.err ==
                                                            "*" && dirty ? (
                                                            <FormError err="Vui lòng nhập lại password" />
                                                        ) : dirty &&
                                                          this.state.passwordErr
                                                              .length > 0 ? (
                                                            <FormError
                                                                err={
                                                                    this.state
                                                                        .passwordErr
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>

                                                    <div className="d-grid">
                                                        <button
                                                            onClick={
                                                                this.onRegister
                                                            }
                                                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                        >
                                                            Sign up
                                                        </button>
                                                        <Link to="/login">
                                                            <button
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                className="btn btn-lg btn-info btn-login text-uppercase fw-bold mb-2"
                                                            >
                                                                Sign in
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
export default Register;
