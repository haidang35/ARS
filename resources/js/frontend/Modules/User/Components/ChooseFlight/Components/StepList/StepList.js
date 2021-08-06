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
        return (
            <div>
                <div className="step-list">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="step-item">
                                <span className="step-number">1</span>
                                <Typography className="title"> Chọn chuyến bay</Typography>       
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step-item next-step">
                                <span className="step-number">2</span>
                                <Typography className="title"> Đặt chỗ</Typography>       
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step-item next-step">
                                <span className="step-number">3</span>
                                <Typography className="title"> Thanh toán</Typography>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepListBar;
