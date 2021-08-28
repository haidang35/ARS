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
                            Hàng ghế thương gia
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(businessPrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Giảm thiểu rung lắc khi cất/hạ cánh.
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Di chuyển thuận tiện khi lên hoặc xuống máy bay.
                        </Typography>
                    </div>
                    <div className="price-info-box deluxe-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Hàng ghế phổ thông đặc biệt
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(deluxePrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Khu vực ghế trung tâm, có độ yên tĩnh cao, các điều
                            kiện tiêu chuẩn và thoải mái
                        </Typography>
                    </div>
                    <div className="price-info-box economy-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Hàng ghế tiêu chuẩn
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(economyPrice)}`}
                        </Typography>
                    </div>
                    <div className="price-info-box exit-info">
                        <MdAirlineSeatReclineExtra className="seat-icon" />
                        <Typography className="seat-title" variant="h6">
                            Hàng ghế gần lối thoát hiểm
                        </Typography>
                        <Typography className="seat-price" variant="h6">
                            {`+${formatCurrency(exitPrice)}`}
                        </Typography>
                        <Typography className="seat-desc" variant="body1">
                            Ghế ngồi rộng chân
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}
export default SeatPriceInfo;
