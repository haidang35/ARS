import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./PaymentMethod.scss";
import { BiCheckCircle } from "react-icons/bi";

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="payment-method">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Phương thức thanh toán
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="payment-method-item">
                            <BiCheckCircle className="icon-check" />
                            <Typography className="title" variant="h5">
                                Thanh toán tại văn phòng
                            </Typography>
                        </div>
                        <div className="payment-method-item">
                            <BiCheckCircle className="icon-check" />
                            <Typography className="title" variant="h5">
                                Giữ chỗ miễn phí và thanh toán qua chuyển khoản
                            </Typography>
                        </div>
                        <div className="payment-method-item">
                            <BiCheckCircle className="icon-check" />
                            <Typography className="title" variant="h5">
                                Cổng thanh toán online onepay quốc tế
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentMethod;
