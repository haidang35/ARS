import React from "react";
import { Component } from "react";
import "./DiscountTickets.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SearchFlightBar from "../../Components/SearchFlightBar/SearchFlightBar";
import { Button, Typography } from "@material-ui/core";
import { RiErrorWarningLine } from "react-icons/ri";
import UserService from "../../Shared/UserService/UserService";
import {
    dateConvert,
    getDate,
} from "../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../Helpers/FormatCurrency";
import {
    URL_IMAGE_AIRLINE,
    URL_IMAGE_DESTINATION,
} from "../../../../Constances/const";
import { goTo } from "../../../../Helpers/Redirect/Redirect";

class DiscountTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discountTickets: [],
        };
    }

    componentDidMount() {
        this.getDiscountTickets();
    }

    getDiscountTickets = () => {
        UserService.getDiscountTicket().then((res) => {
            this.setState({
                discountTickets: res.data,
            });
        });
    };

    render() {
        const { discountTickets } = this.state;
        return (
            <div>
                <SubNavbar />
                <SearchFlightBar />
                <div className="discount-tickets">
                    <div className="wrap-container">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">
                                    {" "}
                                    Vé máy bay giá rẻ và ưu đãi giờ chót của
                                    hãng hàng không
                                </h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="content-box">
                                        <div className="discount-ticket-list">
                                            <div className="row">
                                                {discountTickets.map((item) => {
                                                    return (
                                                        <div className="col-md-4">
                                                            <div className="ticket-item">
                                                                <div className="img-box">
                                                                    <img
                                                                        src={
                                                                            URL_IMAGE_DESTINATION +
                                                                            item
                                                                                .flight
                                                                                .destination
                                                                                .image[0][
                                                                                "image_name"
                                                                            ]
                                                                        }
                                                                    />
                                                                </div>
                                                                <Typography
                                                                    variant="h6"
                                                                    className="destination-name"
                                                                >
                                                                    {
                                                                        item
                                                                            .flight
                                                                            .destination
                                                                            .city
                                                                    }
                                                                </Typography>
                                                                <div className="flight-info">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="logo-airline-box">
                                                                                <img
                                                                                    src={
                                                                                        URL_IMAGE_AIRLINE +
                                                                                        item
                                                                                            .flight
                                                                                            .airline
                                                                                            .logo
                                                                                    }
                                                                                    className="logo-airline"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="info">
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    className="item-info"
                                                                                >
                                                                                    {dateConvert(
                                                                                        item
                                                                                            .flight
                                                                                            .departure_datetime
                                                                                    )}
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    className="item-info"
                                                                                >
                                                                                    {`${item.flight.departure.airport_code} - ${item.flight.destination.airport_code}, ${item.flight.airline.airline_name}`}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="price-info">
                                                                    <Typography
                                                                        variant="h6"
                                                                        className="price"
                                                                    >
                                                                        {`Giá chỉ từ ${formatCurrency(
                                                                            item.price +
                                                                                item.tax
                                                                        )}`}
                                                                    </Typography>

                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        className="btn-view"
                                                                        onClick={() =>
                                                                            goTo(
                                                                                `search-flight?departure=${
                                                                                    item
                                                                                        .flight
                                                                                        .departure
                                                                                        .id
                                                                                }&destination=${
                                                                                    item
                                                                                        .flight
                                                                                        .destination
                                                                                        .id
                                                                                }&time=${getDate(
                                                                                    item
                                                                                        .flight
                                                                                        .departure_datetime
                                                                                )}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Xem
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DiscountTickets;
