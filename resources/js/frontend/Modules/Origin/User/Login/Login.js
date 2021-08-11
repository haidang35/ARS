import React from "react";
import { Component } from "react";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import SubNavbar from "../../../User/Shared/Components/SubNavbar/SubNavbar";
import AuthService from "../../../../Shared/Service/AuthService";
import "./Login.scss";
import { Link, Redirect } from "react-router-dom";
import { goTo } from "../../../../Helpers/Redirect/Redirect";

class Login extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                email: "",
                password: "",
            }),
            onLogged: false,
        };
    }

    onLogin = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                email: form.email.value,
                password: form.password.value,
            };
            AuthService.userLogin(data).then((res) => {
                localStorage.setItem("userId", res.data.user.id);
                AuthService.getUserInfo();
                goTo("");
            });
        }
    };

    render() {
        const { email, password, dirty } = this.state.form;

        return (
            <div>
                <SubNavbar />
                <div className="user-login-page">
                    <div className="wrap-container">
                        <div className="container-fluid ps-md-0">
                            <div className="row g-0">
                                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                                <div className="col-md-8 col-lg-6">
                                    <div className="login d-flex align-items-center py-5">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-9 col-lg-8 mx-auto">
                                                    <h3 className="login-heading mb-4">
                                                        Đăng nhập
                                                    </h3>
                                                    {/* Sign In Form */}

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
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            defaultValue
                                                            id="rememberPasswordCheck"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="rememberPasswordCheck"
                                                        >
                                                            Remember password
                                                        </label>
                                                    </div>
                                                    <div className="d-grid">
                                                        <button
                                                            onClick={
                                                                this.onLogin
                                                            }
                                                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                        >
                                                            Sign in
                                                        </button>
                                                        <Link to="/register">
                                                            <button
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                className="btn btn-lg btn-info btn-login text-uppercase fw-bold mb-2"
                                                            >
                                                                Sign up
                                                            </button>
                                                        </Link>

                                                        <div className="text-center">
                                                            <a
                                                                className="small"
                                                                href="#"
                                                            >
                                                                Forgot password?
                                                            </a>
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
            </div>
        );
    }
}
export default Login;
