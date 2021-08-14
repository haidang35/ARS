import React from "react";
import { Component } from "react";
import "./Payment.scss";
import { Typography } from "@material-ui/core";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { PayPalButton } from "react-paypal-button-v2";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        let intoMoney = Math.floor(data.into_money / 22810);
        return (
            <div className="payment">
                <div className="title-box">
                    <Typography variant="h6" className="title">
                        Thanh toán
                    </Typography>
                </div>
                <div className="content">
                    <div className="btn-payment-paypal">
                        <PayPalButton
                            clientId="AUmxZucXArWx3PnoX5kze8LxBeJxkCTC-a8JFaYG5g9yigVFeYCK0jwbMImLmxv7h-o1GkAkm2GvtnNm"
                            amount={intoMoney}
                            onSuccess={(details, data) => {
                                this.props.onPaymentBooking();
                                return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                        orderID: data.orderID,
                                    }),
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;
