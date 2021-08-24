import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { URL_IMAGE_AIRLINE } from "../../../../../Constances/const";
import {
    dateConvert,
    getTime,
} from "../../../../../Helpers/DateTime/ConvertDateTime";
import "./FlightInfoDetails.scss";

class FlightInfoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <div className="flight-info-details">
                    <div className="img-box">
                        <img src={URL_IMAGE_AIRLINE + data.airline.logo} />
                    </div>
                    <div className="flight-info">
                        <div className="row">
                            <div className="col-md-4">
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Điểm khởi hành: ${data.departure.city}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Cất cánh: ${getTime(
                                    data.departure_datetime
                                )}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Ngày : ${dateConvert(
                                    data.departure_datetime
                                )}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Sân Bay ${data.departure.airport_name}`}</Typography>
                            </div>

                            <div className="col-md-4">
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Điểm đến: ${data.destination.city}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Hạ cánh: ${getTime(
                                    data.arrival_datetime
                                )}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Ngày: ${dateConvert(
                                    data.arrival_datetime
                                )}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Sân Bay ${data.destination.airport_code}`}</Typography>
                            </div>

                            <div className="col-md-4">
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >
                                    {data.status == 1
                                        ? `Khởi hành đúng giờ`
                                        : ""}
                                </Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Chuyến bay ${data.flight_code}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Chuyên cơ ${data.aircraft}`}</Typography>
                                <Typography
                                    className="info-item"
                                    variant="body1"
                                >{`Sức chứa ${data.capacity}`}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightInfoDetails;
