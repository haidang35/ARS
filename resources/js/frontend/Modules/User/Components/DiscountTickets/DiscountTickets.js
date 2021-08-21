import React from "react";
import { Component } from "react";
import "./DiscountTickets.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SearchFlightBar from "../../Components/SearchFlightBar/SearchFlightBar";
import { Typography } from "@material-ui/core";
import { RiErrorWarningLine } from "react-icons/ri";
import UserService from "../../Shared/UserService/UserService";

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
                                                                    <img src="http://divui.com/blog/wp-content/uploads/2017/11/kinh-nghiem-du-lich-sapa-1.jpg" />
                                                                </div>
                                                                <Typography
                                                                    variant="h6"
                                                                    className="destination-name"
                                                                >
                                                                    Hồ Chí Minh
                                                                </Typography>
                                                                <div className="flight-info">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="logo-airline-box">
                                                                                <img
                                                                                    src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
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
                                                                                    17-08-2021
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    className="item-info"
                                                                                >
                                                                                    HAN
                                                                                    -
                                                                                    PQC,
                                                                                    Bamboo
                                                                                    Airways
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="price-info">
                                                                    <div className="title-box">
                                                                        <Typography
                                                                            variant="body1"
                                                                            className="title"
                                                                        >
                                                                            <RiErrorWarningLine className="icon" />
                                                                            Hạn
                                                                            chế
                                                                            vừa
                                                                            phải
                                                                        </Typography>
                                                                    </div>

                                                                    <Typography
                                                                        variant="body1"
                                                                        className="price"
                                                                    >
                                                                        Giá chỉ
                                                                        từ
                                                                        500.000
                                                                        đ
                                                                    </Typography>
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
