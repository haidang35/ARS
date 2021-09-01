import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { formatCurrency } from "../../../../Helpers/FormatCurrency";
import "./CheckoutStepBar.scss";

class CheckoutStepBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { intoMoney } = this.props;
        return (
            <div>
                <div className="checkout-step-bar">
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
                            {intoMoney > 0 ? (
                                <div className="col-md-6">
                                    <div className="booking-price-total">
                                        <Typography
                                            className="price-total"
                                            variant="h6"
                                        >
                                            {`Tổng tiền ${formatCurrency(
                                                intoMoney
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
                            ) : (
                                <div className="col-md-6"></div>
                            )}

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
export default CheckoutStepBar;
