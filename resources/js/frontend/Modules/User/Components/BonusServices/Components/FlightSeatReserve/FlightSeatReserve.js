import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./FlightSeatReserve.scss";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

class FlightSeatReserve extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangeService = (ev) => {
        this.props.onChangeBonusService(ev.target.value);
    };

    render() {
        const { bonusService } = this.props;
        return (
            <div>
                <div className="flight-seat-reserve">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="select-service">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={bonusService == 1}
                                            name="checkedB"
                                            color="primary"
                                            className="check-box"
                                            value={1}
                                            onChange={this.handleChangeService}
                                        />
                                    }
                                    label=""
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="title-box">
                                        <MdAirlineSeatReclineExtra className="seat-icon" />
                                        <Typography
                                            className="select-seat-title"
                                            variant="h5"
                                        >
                                            Choose your favorite seat
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="description-box">
                                        <div className="desc-item">
                                            <FaCheck className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Individual seat selection
                                            </Typography>
                                        </div>
                                        <div className="desc-item">
                                            <FaCheck className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Standard seats
                                            </Typography>
                                        </div>
                                        <div className="desc-item">
                                            <FaCheck className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Wide seat
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="img-box"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightSeatReserve;
