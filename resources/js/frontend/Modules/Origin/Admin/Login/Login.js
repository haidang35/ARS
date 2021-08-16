import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import Form from "../../../../Shared/Components/Form/Form";
import ModalNotice2 from "../../../../Shared/Components/Modal/ModalNotice2";
import "./Login.scss";
import AuthService from "../../../../Shared/Service/AuthService";
import { goTo } from "../../../../Helpers/Redirect/Redirect";
class Login extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                username: "",
                password: "",
            }),
            message: "",
        };
    }

    onLogin = () => {
        const { form } = this.state;
        this._validateForm();
        this.state.form["dirty"] = true;
        if (form.username.err == "*") {
            this.setState({
                message: "Vui lòng nhập tài khoản",
            });
        } else if (form.username.err.length > 0) {
            this.setState({
                message: "Vui lòng nhập đúng định dạng email",
            });
        } else if (form.password.err == "*") {
            this.setState({
                message: "Vui lòng nhập mật khẩu",
            });
        }
        if (this._isFormValid()) {
            const data = {
                email: form.username.value,
                password: form.password.value,
            };
            AuthService.adminLogin(data)
                .then((res) => {
                    localStorage.setItem(
                        "adminId",
                        JSON.stringify(res.data.user.id)
                    );
                    goTo("admin");
                })
                .catch((err) => {
                    console.log(
                        "🚀 ~ file: Login.js ~ line 51 ~ Login ~ err",
                        err
                    );
                    this.setState({
                        message: "Bạn không có quyền truy cập vào trang này !!",
                    });
                });
        }
    };

    render() {
        const { username, password } = this.state.form;
        return (
            <div className="admin-login">
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            <Typography variant="h4" className="title-login">
                                Flight Hi <br /> Management
                            </Typography>
                            <div className="login">
                                <div className="login__field">
                                    <i className="login__icon fas fa-user" />
                                    <input
                                        type="email"
                                        name="username"
                                        required
                                        className="login__input"
                                        value={username.value}
                                        placeholder="User name / Email"
                                        onChange={(ev) =>
                                            this._setValue(ev, "username")
                                        }
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock" />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="login__input"
                                        placeholder="Password"
                                        value={password.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "password")
                                        }
                                    />
                                </div>
                                <button
                                    onClick={this.onLogin}
                                    className="button login__submit"
                                >
                                    <span className="button__text">Log In</span>
                                    <i className="button__icon fas fa-chevron-right" />
                                </button>
                            </div>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4" />
                            <span className="screen__background__shape screen__background__shape3" />
                            <span className="screen__background__shape screen__background__shape2" />
                            <span className="screen__background__shape screen__background__shape1" />
                        </div>
                    </div>
                    <ModalNotice2
                        message={this.state.message}
                        onClose={() => this.setState({ message: "" })}
                    />
                </div>
            </div>
        );
    }
}

export default Login;
