import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import BusinessSeat from "../../../../../../User/Components/BonusServices/Components/FlightSeatSelection/BusinessSeat/BusinessSeat";
import EconomySeat from "../../../../../../User/Components/BonusServices/Components/FlightSeatSelection/EconomySeat/EconomySeat";
import EmergencyExitSeat from "../../../../../../User/Components/BonusServices/Components/FlightSeatSelection/EmergencyExitSeat/EmergencyExitSeat";
import FirstEconomySeat from "../../../../../../User/Components/BonusServices/Components/FlightSeatSelection/FirstEconomySeat/FirstEconomySeat";
import LetterRow from "../../../../../../User/Components/BonusServices/Components/FlightSeatSelection/LetterRow/LetterRow";

class FlightSeatDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            seats,
            businessSeats,
            economySeats,
            firstEconomySeats,
            exitSeats,
            seatsReserved,
            flightInfo,
        } = this.props;

        return (
            <div>
                <div className="flight-seat-setting">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="seat-map">
                                <div className="title-box">
                                    <Typography className="title" variant="h6">
                                        Flight seats
                                    </Typography>
                                </div>
                                <div className="seats-diagram">
                                    <div className="seat-list">
                                        <div className="carbin first-carbin">
                                            <LetterRow />
                                            <BusinessSeat
                                                seats={businessSeats}
                                                rowNumberFrom={1}
                                                price={0}
                                                seatsReserved={seatsReserved}
                                                passengers={[]}
                                            />
                                            <FirstEconomySeat
                                                seats={firstEconomySeats}
                                                rowNumberFrom={
                                                    businessSeats / 6 + 1
                                                }
                                                price={0}
                                                seatsReserved={seatsReserved}
                                                passengers={[]}
                                            />
                                            <EconomySeat
                                                seats={30}
                                                rowNumberFrom={
                                                    businessSeats / 6 +
                                                    firstEconomySeats / 6 +
                                                    1
                                                }
                                                price={0}
                                                seatsReserved={seatsReserved}
                                                passengers={seatsReserved}
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
                                                price={0}
                                                seatsReserved={seatsReserved}
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
                                                price={0}
                                                seatsReserved={seatsReserved}
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
                                                price={0}
                                                seatsReserved={seatsReserved}
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
                                                price={0}
                                                seatsReserved={seatsReserved}
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
                                                price={0}
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
                                                price={0}
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
                                        <label>Business seats</label>
                                        <input
                                            required
                                            name="businessSeat"
                                            className="form-control"
                                            value={businessSeats}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Business class price</label>
                                        <input
                                            type="text"
                                            required
                                            name="businessPrice"
                                            className="form-control"
                                            value={flightInfo.business_price}
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Deluxe class seats</label>
                                        <input
                                            type="text"
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={firstEconomySeats}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Deluxe class price</label>
                                        <input
                                            type="text"
                                            required
                                            name="firstEconomyPrice"
                                            className="form-control"
                                            value={flightInfo.deluxe_price}
                                            min={0}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Economy seats</label>
                                        <input
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={economySeats}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Economy class price</label>
                                        <input
                                            type="text"
                                            required
                                            name="economyPrice"
                                            className="form-control"
                                            value={flightInfo.economy_price}
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Emergency exit seats</label>
                                        <input
                                            type="text"
                                            required
                                            name="flight_code"
                                            className="form-control"
                                            value={exitSeats}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginTop: "1rem" }}>
                                        <label>Speacial economy price</label>
                                        <input
                                            type="text"
                                            required
                                            name="exitPrice"
                                            className="form-control"
                                            value={flightInfo.exit_price}
                                            min={0}
                                        />
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
export default FlightSeatDetails;
