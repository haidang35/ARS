import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import BusinessSeat from "../../../../../User/Components/BonusServices/Components/FlightSeatSelection/BusinessSeat/BusinessSeat";
import EconomySeat from "../../../../../User/Components/BonusServices/Components/FlightSeatSelection/EconomySeat/EconomySeat";
import EmergencyExitSeat from "../../../../../User/Components/BonusServices/Components/FlightSeatSelection/EmergencyExitSeat/EmergencyExitSeat";
import FirstEconomySeat from "../../../../../User/Components/BonusServices/Components/FlightSeatSelection/FirstEconomySeat/FirstEconomySeat";
import LetterRow from "../../../../../User/Components/BonusServices/Components/FlightSeatSelection/LetterRow/LetterRow";
import "./FlightSeatSetting.scss";
import { MdAddCircle } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";

class FlightSeatSetting extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                businessPrice: 0,
                economyPrice: 0,
                firstEconomyPrice: 0,
                exitPrice: 0,
            }),
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.onSubmitForm) {
            const { form } = this.state;
            this._validateForm();
            this.state.form["dirty"] = true;
            if (this._isFormValid()) {
                const data = {
                    businessPrice: form.businessPrice.value,
                    economyPrice: form.economyPrice.value,
                    firstEconomyPrice: form.firstEconomyPrice.value,
                    exitPrice: form.exitPrice.value,
                };
                this.props.getPriceData(data);
            }
        }
    };

    render() {
        const {
            seats,
            businessSeats,
            economySeats,
            firstEconomySeats,
            exitSeats,
        } = this.props;
        const {
            businessPrice,
            economyPrice,
            firstEconomyPrice,
            exitPrice,
            dirty,
        } = this.state.form;
        return (
            <div>
                <div className="flight-seat-setting">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="seat-map">
                                <div className="title-box">
                                    <Typography className="title" variant="h6">
                                        Thiết lập sơ đồ hàng ghế
                                    </Typography>
                                </div>
                                <div className="seats-diagram">
                                    <div className="seat-list">
                                        <div className="carbin first-carbin">
                                            <LetterRow />
                                            <BusinessSeat
                                                seats={businessSeats}
                                                rowNumberFrom={1}
                                                price={businessPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                            <FirstEconomySeat
                                                seats={firstEconomySeats}
                                                rowNumberFrom={
                                                    businessSeats / 6 + 1
                                                }
                                                price={firstEconomyPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                            <EconomySeat
                                                seats={30}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    1
                                                }
                                                price={economyPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                        </div>
                                        <div className="carbin second-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={24}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    1
                                                }
                                                price={economyPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    1
                                                }
                                                price={exitPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                        </div>
                                        <div className="carbin third-carbirn">
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={exitPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                            <EconomySeat
                                                seats={54}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={economyPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                        </div>
                                        <div className="carbin fourth-carbirn">
                                            <LetterRow />
                                            <EmergencyExitSeat
                                                seats={6}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    1
                                                }
                                                price={exitPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                        </div>
                                        <div className="carbin fifth-carbirn">
                                            <LetterRow />
                                            <EconomySeat
                                                seats={economySeats - 108}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    30 / 6 +
                                                    24 / 6 +
                                                    6 / 6 +
                                                    6 / 6 +
                                                    54 / 6 +
                                                    6 / 6 +
                                                    1
                                                }
                                                price={economyPrice}
                                                seatsReserved={[]}
                                                passengers={[]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>
                                            Số ghế ngồi hạng thương gia
                                        </label>
                                        <input
                                            required
                                            name="businessSeat"
                                            className="form-control"
                                            value={businessSeats}
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Giá vé</label>
                                        <input
                                            type="text"
                                            required
                                            name="businessPrice"
                                            className="form-control"
                                            value={businessPrice.value}
                                            min={0}
                                            onChange={(ev) =>
                                                this._setValue(
                                                    ev,
                                                    "businessPrice"
                                                )
                                            }
                                        ></input>
                                        {businessPrice.err === "*" && dirty ? (
                                            <FormError
                                                err={
                                                    "Không được để trống giá vé"
                                                }
                                            />
                                        ) : dirty ? (
                                            <FormError
                                                err={businessPrice.err}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>
                                            Số ghế ngồi ưu tiên phía trước
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={firstEconomySeats}
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Giá vé</label>
                                        <input
                                            type="text"
                                            required
                                            name="firstEconomyPrice"
                                            className="form-control"
                                            value={firstEconomyPrice.value}
                                            min={0}
                                            onChange={(ev) =>
                                                this._setValue(
                                                    ev,
                                                    "firstEconomyPrice"
                                                )
                                            }
                                        ></input>
                                        {firstEconomyPrice.err === "*" &&
                                        dirty ? (
                                            <FormError
                                                err={
                                                    "Không được để trống giá vé"
                                                }
                                            />
                                        ) : dirty ? (
                                            <FormError
                                                err={firstEconomyPrice.err}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>
                                            Số ghế ngồi hạng thông thường
                                        </label>
                                        <input
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={economySeats}
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Giá vé</label>
                                        <input
                                            type="text"
                                            required
                                            name="economyPrice"
                                            className="form-control"
                                            value={economyPrice.value}
                                            min={0}
                                            onChange={(ev) =>
                                                this._setValue(
                                                    ev,
                                                    "economyPrice"
                                                )
                                            }
                                        ></input>
                                        {economyPrice.err === "*" && dirty ? (
                                            <FormError
                                                err={
                                                    "Không được để trống giá vé"
                                                }
                                            />
                                        ) : dirty ? (
                                            <FormError err={economyPrice.err} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>
                                            Số ghế ngồi gần cửa thoát hiểm
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={exitSeats}
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Giá vé</label>
                                        <input
                                            type="text"
                                            required
                                            name="exitPrice"
                                            className="form-control"
                                            value={exitPrice.value}
                                            min={0}
                                            onChange={(ev) =>
                                                this._setValue(ev, "exitPrice")
                                            }
                                        ></input>
                                        {exitPrice.err === "*" && dirty ? (
                                            <FormError
                                                err={
                                                    "Không được để trống giá vé"
                                                }
                                            />
                                        ) : dirty ? (
                                            <FormError err={exitPrice.err} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="set-seats">
                                <div
                                    className="set-business-seats"
                                    onClick={() =>
                                        this.props.setBusinessSeats(1)
                                    }
                                >
                                    <MdAddCircle className="add-icon" />
                                    <Typography
                                        variant="h6"
                                        className="set-title"
                                    >
                                        Thêm hàng ghế hạng thương gia
                                    </Typography>
                                </div>
                                {businessSeats > 18 ? (
                                    <div
                                        className="set-business-seats set-decrease-seats"
                                        onClick={() =>
                                            this.props.setBusinessSeats(0)
                                        }
                                    >
                                        <FaMinusCircle className="add-icon" />
                                        <Typography
                                            variant="h6"
                                            className="set-title"
                                        >
                                            Xóa đi một hàng ghế hạng thương gia
                                        </Typography>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div
                                    className="set-business-seats set-first-seats"
                                    onClick={() =>
                                        this.props.setFirstEconomySeats(1)
                                    }
                                >
                                    <MdAddCircle className="add-icon" />
                                    <Typography
                                        variant="h6"
                                        className="set-title"
                                    >
                                        Thêm hàng ghế đầu ưu tiên
                                    </Typography>
                                </div>
                                {firstEconomySeats > 18 ? (
                                    <div
                                        className="set-business-seats set-decrease-seats"
                                        onClick={() =>
                                            this.props.setFirstEconomySeats(0)
                                        }
                                    >
                                        <FaMinusCircle className="add-icon" />
                                        <Typography
                                            variant="h6"
                                            className="set-title"
                                        >
                                            Xóa đi một hàng ghế đầu ưu tiên
                                        </Typography>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div
                                    className="set-business-seats set-economy-seats"
                                    onClick={() =>
                                        this.props.setEconomySeats(1)
                                    }
                                >
                                    <MdAddCircle className="add-icon" />
                                    <Typography
                                        variant="h6"
                                        className="set-title"
                                    >
                                        Thêm hàng ghế hạng thông thường
                                    </Typography>
                                </div>
                                {economySeats > 146 ? (
                                    <div
                                        className="set-business-seats set-decrease-seats"
                                        onClick={() =>
                                            this.props.setEconomySeats(0)
                                        }
                                    >
                                        <FaMinusCircle className="add-icon" />
                                        <Typography
                                            variant="h6"
                                            className="set-title"
                                        >
                                            Xóa đi một hàng ghế hạng thông
                                            thường
                                        </Typography>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightSeatSetting;
