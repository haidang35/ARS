import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import "./CheckoutBar.scss";

class CheckoutBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <div className="checkout-bar">
                    <div className="wrap-container">
                        <div className="row">
                            <div className="col-md-3">
                                <Button
                                    className="btn-back"
                                    variant="contained"
                                    color="inherit"
                                >
                                    Quay lại
                                </Button>
                            </div>
                            <div className="col-md-6">
                                <div className="booking-price-total">
                                    <Typography
                                        className="price-total"
                                        variant="h6"
                                    >
                                        {`Tổng tiền ${formatCurrency(
                                            data.into_money
                                        )}`}
                                    </Typography>
                                    <Typography
                                        className="price-info"
                                        variant="body1"
                                    >
                                        Đã bao gồm thuế, phí và phụ phí
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <Button
                                    onClick={() => this.props.onContinue()}
                                    className="btn-continue"
                                    variant="contained"
                                    color="inherit"
                                >
                                    Tiếp tục
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CheckoutBar;
