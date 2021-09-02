import React from "react";
import { Component } from "react";
import "./SeatPriceInfo.scss";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { formatCurrency } from "../../../../../../../Helpers/FormatCurrency";

class SeatPriceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { businessPrice, economyPrice, deluxePrice, exitPrice } =
            this.props;
        return (
            <div>
                <div className="seat-price-info">
                    <div className="price-info-box business-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Business row seats
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(businessPrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Minimizes shaking during take-off/landing.
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Convenient transportation when boarding or
                            disembarking the plane.
                        </Typography>
                    </div>
                    <div className="price-info-box deluxe-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Special economy seats
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(deluxePrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Central seating area, high quietness, standard
                            conditions and comfort
                        </Typography>
                    </div>
                    <div className="price-info-box economy-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Standard row of seats{" "}
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(economyPrice)}`}
                        </Typography>
                    </div>
                    <div className="price-info-box exit-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            The row of seats near the emergency exit
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(exitPrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Wide seat
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}
export default SeatPriceInfo;
