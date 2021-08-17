import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./FavouriteDestination.scss";
import DestinationService from "../../../Admin/Components/Destination/Shared/DestinationService";
import { URL_IMAGE_DESTINATION } from "../../../../Constances/const";

class FavouriteDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteDestinations: [],
        };
    }

    componentDidMount() {
        this.getFavouriteDestinations();
    }

    getFavouriteDestinations = () => {
        DestinationService.getFavouriteDestinations().then((res) => {
            this.setState({
                favouriteDestinations: res.data,
            });
        });
    };

    onChooseDestination = (data) => {
        this.props.getDestinationChoosed(data);
    };

    render() {
        const { favouriteDestinations } = this.state;
        let favDes = [];
        let hasData = false;
        if (
            Array.isArray(favouriteDestinations) &&
            favouriteDestinations.length > 0
        ) {
            favDes = favouriteDestinations;
            hasData = true;
        }

        return (
            <div className="favourite-destination">
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div
                                onClick={() =>
                                    this.onChooseDestination(favDes[0])
                                }
                                className="item-destination"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), " +
                                        `url('${
                                            hasData
                                                ? URL_IMAGE_DESTINATION +
                                                  favDes[0].image
                                                : ""
                                        }')`,
                                    backgroundRepeat: hasData
                                        ? "no-repeat"
                                        : "",
                                    backgroundSize: hasData ? "cover" : "",
                                }}
                            >
                                <Typography variant="h5" className="title">
                                    {hasData ? favDes[0].city : ""}
                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    >
                                        Từ
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    >
                                        5000000 VND
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div
                                onClick={() =>
                                    this.onChooseDestination(favDes[1])
                                }
                                className="item-destination"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), " +
                                        `url('${
                                            hasData
                                                ? URL_IMAGE_DESTINATION +
                                                  favDes[1].image
                                                : ""
                                        }')`,
                                    backgroundRepeat: hasData
                                        ? "no-repeat"
                                        : "",
                                    backgroundSize: hasData ? "cover" : "",
                                }}
                            >
                                <Typography variant="h5" className="title">
                                    {hasData ? favDes[1].city : ""}
                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    >
                                        Từ
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    >
                                        5000000 VND
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div
                                onClick={() =>
                                    this.onChooseDestination(favDes[2])
                                }
                                className="item-destination item-destination-big"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), " +
                                        `url('${
                                            hasData
                                                ? URL_IMAGE_DESTINATION +
                                                  favDes[2].image
                                                : ""
                                        }')`,
                                    backgroundRepeat: hasData
                                        ? "no-repeat"
                                        : "",
                                    backgroundSize: hasData ? "cover" : "",
                                }}
                            >
                                <Typography variant="h5" className="title">
                                    {hasData ? favDes[2].city : ""}
                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    >
                                        Từ
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    >
                                        5000000 VND
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div
                                        onClick={() =>
                                            this.onChooseDestination(favDes[3])
                                        }
                                        className="item-destination item-destination-small"
                                        style={{
                                            background:
                                                "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), " +
                                                `url('${
                                                    hasData
                                                        ? URL_IMAGE_DESTINATION +
                                                          favDes[3].image
                                                        : ""
                                                }')`,
                                            backgroundRepeat: hasData
                                                ? "no-repeat"
                                                : "",
                                            backgroundSize: hasData
                                                ? "cover"
                                                : "",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            className="title"
                                        >
                                            {hasData ? favDes[3].city : ""}
                                        </Typography>
                                        <div className="content">
                                            <Typography
                                                variant="body1"
                                                className="from-title"
                                            >
                                                Từ
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                className="price-title"
                                            >
                                                5000000 VND
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div
                                        onClick={() =>
                                            this.onChooseDestination(favDes[4])
                                        }
                                        className="item-destination item-destination-small"
                                        style={{
                                            background:
                                                "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), " +
                                                `url('${
                                                    hasData
                                                        ? URL_IMAGE_DESTINATION +
                                                          favDes[4].image
                                                        : ""
                                                }')`,
                                            backgroundRepeat: hasData
                                                ? "no-repeat"
                                                : "",
                                            backgroundSize: hasData
                                                ? "cover"
                                                : "",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            className="title"
                                        >
                                            {hasData ? favDes[4].city : ""}
                                        </Typography>
                                        <div className="content">
                                            <Typography
                                                variant="body1"
                                                className="from-title"
                                            >
                                                Từ
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                className="price-title"
                                            >
                                                5000000 VND
                                            </Typography>
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
export default FavouriteDestination;
