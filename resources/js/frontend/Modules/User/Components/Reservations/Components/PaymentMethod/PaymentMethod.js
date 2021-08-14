import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./PaymentMethod.scss";
import { BiCheckCircle } from "react-icons/bi";
import { Link, withRouter } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { formatCurrencyToUSD } from "../../../../../../Helpers/FormatCurrency";

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethod: 0,
            openPaymentPay: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.onReservation) {
            this.getPaymentMethod();
        }
    }

    getPaymentMethod = () => {
        const { paymentMethod } = this.state;
        if (paymentMethod !== 0) {
            this.props.getPaymentMethod(paymentMethod);
        }
    };

    handleChangePaymentMethod = (value) => {
        this.setState({
            paymentMethod: value,
        });
    };

    onOpenMethodPayment = () => {
        this.setState({
            openPaymentPay: true,
        });
    };

    render() {
        const { paymentMethod, openPaymentPay } = this.state;
        const { data } = this.props;
        let intoMoney = Math.floor(data.into_money / 22810);
        return (
            <div>
                <div className="payment-method">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Phương thức thanh toán
                        </Typography>
                    </div>
                    <div className="content">
                        <div
                            className={
                                paymentMethod == 1
                                    ? "payment-method-item active-payment-method"
                                    : "payment-method-item"
                            }
                            onClick={() => this.handleChangePaymentMethod(1)}
                        >
                            <BiCheckCircle className="icon-check" />
                            <Typography className="title" variant="h5">
                                Thanh toán tại văn phòng
                            </Typography>
                        </div>
                        <div
                            className={
                                paymentMethod == 2
                                    ? "payment-method-item active-payment-method"
                                    : "payment-method-item"
                            }
                            onClick={() => this.handleChangePaymentMethod(2)}
                        >
                            <BiCheckCircle className="icon-check" />
                            <Typography className="title" variant="h5">
                                Giữ chỗ miễn phí và thanh toán qua chuyển khoản
                            </Typography>
                        </div>
                        <div
                            onClick={() => this.handleChangePaymentMethod(3)}
                            className={
                                paymentMethod == 3
                                    ? "payment-method-item active-payment-method"
                                    : "payment-method-item"
                            }
                        >
                            <BiCheckCircle className="icon-check" />
                            <Typography
                                className="title"
                                variant="h5"
                                style={{ marginRight: "2rem" }}
                            >
                                Cổng thanh toán online paypal quốc tế
                            </Typography>
                        </div>
                    </div>
                    <div className="btn-box">
                        <Button
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                            variant="outlined"
                            color="primary"
                        >
                            Quay lại
                        </Button>

                        <Button
                            onClick={this.props.onReservation}
                            className="btn-reser"
                            variant="outlined"
                            color="primary"
                        >
                            Đặt vé
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PaymentMethod);
