import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import {
    getInterval,
    getTime,
} from "../../../../../Helpers/DateTime/ConvertDateTime";
import FlightInfoDetails from "../FlightInfoDetails/FlightInfoDetails";
import { FaSearchengin, FaPlane } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { URL_IMAGE_AIRLINE } from "../../../../../Constances/const";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

class FlightItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfoDetails: false,
        };
    }

    onShowInfoDetails = () => {
        this.setState({
            showInfoDetails: !this.state.showInfoDetails,
        });
    };

    render() {
        const { data } = this.props;
        const { showInfoDetails } = this.state;
        return (
            <div>
                <div className="item-result">
                    <div className="img-box">
                        <img src={URL_IMAGE_AIRLINE + data.airline.logo} />
                    </div>
                    <div className="content-box">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="departure-info">
                                    <Typography
                                        variant="body1"
                                        className="departure-name"
                                    >
                                        {data.departure.city}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="departure-time"
                                    >
                                        {getTime(data.departure_datetime)}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="arrow-box">
                                    <Typography
                                        variant="body1"
                                        className="flight-code"
                                    >
                                        {data.flight_code}
                                    </Typography>
                                    <div className="icon-box">
                                        <MdLocationOn className="icon-location" />
                                        <div className="line-airport"></div>
                                        <FaPlane className="flight-icon" />
                                    </div>

                                    <Typography
                                        variant="body1"
                                        className="flight-time"
                                    >
                                        {getInterval(
                                            data.departure_datetime,
                                            data.arrival_datetime
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="departure-info">
                                    <Typography
                                        variant="body1"
                                        className="departure-name"
                                    >
                                        {data.destination.city}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="departure-time"
                                    >
                                        {getTime(data.arrival_datetime)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-box">
                        <Button
                            onClick={this.onShowInfoDetails}
                            variant="contained"
                            className="btn-view-details"
                        >
                            Xem chi tiết
                            {showInfoDetails ? (
                                <MdArrowDropUp className="icon-drop" />
                            ) : (
                                <MdArrowDropDown className="icon-drop" />
                            )}
                        </Button>
                    </div>
                </div>
                {showInfoDetails ? <FlightInfoDetails data={data} /> : ""}
            </div>
        );
    }
}
export default FlightItem;
