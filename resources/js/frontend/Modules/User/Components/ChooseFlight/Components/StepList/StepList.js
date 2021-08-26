import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./StepList.scss";

class StepListBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { step } = this.props;
        return (
            <div>
                <div className="step-list">
                    <div className="row">
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 1 || step == 2 || step == 3
                                        ? "step-item "
                                        : "step-item step-unactive"
                                }
                            >
                                <span className="step-number">1</span>
                                <Typography className="title">
                                    {" "}
                                    Chọn chuyến bay
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 2 || step == 3
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">2</span>
                                <Typography className="title">
                                    {" "}
                                    Đặt chỗ
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 3 || step == 4
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">3</span>
                                <Typography className="title">
                                    {" "}
                                    Dịch vụ bổ sung
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 4
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">4</span>
                                <Typography className="title">
                                    {" "}
                                    Thanh toán
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepListBar;
