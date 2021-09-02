import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import {
    getDate,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { TablePagination, withStyles } from "@material-ui/core";
import FlightSeatSetting from "../FlightSeatSetting/FlightSeatSetting";

const StyleDatePicker = withStyles({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
        },
    },
})(KeyboardDatePicker);

class AddNewFlight extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                flight_code: "",
                departure_datetime: new Date(),
                arrival_datetime: new Date(),
                aircraft: "",
                airline_id: "",
                departure_id: "",
                destination_id: "",
                capacity: 200,
                seats_reserved: 0,
                seats_available: 200,
            }),
            business_seats: 18,
            economy_seats: 146,
            first_economy_seats: 18,
            exit_seats: 18,
            onSubmitForm: false,
        };
    }

    priceSeats = "";

    onSubmitInfo = async () => {
        this.setState({
            onSubmitForm: true,
        });
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            (await this.priceSeats) !== "";
            if (this.priceSeats !== "") {
                const {
                    form,
                    business_seats,
                    economy_seats,
                    first_economy_seats,
                    exit_seats,
                } = this.state;
                const priceData = [
                    {
                        class: 1,
                        price: this.priceSeats["businessPrice"],
                    },
                    {
                        class: 2,
                        price: this.priceSeats["firstEconomyPrice"],
                    },
                    {
                        class: 3,
                        price: this.priceSeats["economyPrice"],
                    },
                    {
                        class: 4,
                        price: this.priceSeats["exitPrice"],
                    },
                ];
                const data = {
                    flight_code: form.flight_code.value,
                    departure_datetime:
                        getDate(form.departure_datetime.value) +
                        " " +
                        getTime(form.departure_datetime.value),
                    arrival_datetime:
                        getDate(form.arrival_datetime.value) +
                        " " +
                        getTime(form.arrival_datetime.value),
                    aircraft: form.aircraft.value,
                    airline_id: form.airline_id.value,
                    departure_id: form.departure_id.value,
                    destination_id: form.destination_id.value,
                    capacity: form.capacity.value,
                    seats_reserved: form.seats_reserved.value,
                    seats_available: form.seats_available.value,
                    business_seats,
                    economy_seats,
                    first_economy_seats,
                    exit_seats,
                    price_data: priceData,
                };
                this.props.onSubmitInfo(data);
            }
        }
    };

    handleChangeAddDepartureTime = (time, value) => {
        let { form } = this.state;
        form["departure_datetime"].value = time;
        this.setState({
            form,
        });
    };

    handleChangeAddArrivalTime = (time, value) => {
        let { form } = this.state;
        form["arrival_datetime"].value = time;
        this.setState({
            form,
        });
    };

    setBusinessSeats = (action) => {
        const { business_seats } = this.state;
        let { form } = this.state;
        if (action === 0) {
            form["capacity"].value = form["capacity"].value - 6;
            form["seats_available"].value = form["seats_available"].value - 6;

            this.setState({
                business_seats: business_seats - 6,
                form,
            });
        } else if (action === 1) {
            form["capacity"].value = form["capacity"].value + 6;
            form["seats_available"].value = form["seats_available"].value + 6;

            this.setState({
                business_seats: business_seats + 6,
                form,
            });
        }
    };

    setEconomySeats = (action) => {
        const { economy_seats } = this.state;
        let { form } = this.state;
        if (action === 0) {
            form["capacity"].value = form["capacity"].value - 6;
            form["seats_available"].value = form["seats_available"].value - 6;
            this.setState({
                economy_seats: economy_seats - 6,
                form,
            });
        } else if (action === 1) {
            form["capacity"].value = form["capacity"].value + 6;
            form["seats_available"].value = form["seats_available"].value + 6;

            this.setState({
                economy_seats: economy_seats + 6,
                form,
            });
        }
    };

    setFirstEconomySeats = (action) => {
        const { first_economy_seats } = this.state;
        let { form } = this.state;
        if (action === 0) {
            form["capacity"].value = form["capacity"].value - 6;
            form["seats_available"].value = form["seats_available"].value - 6;

            this.setState({
                first_economy_seats: first_economy_seats - 6,
                form,
            });
        } else if (action === 1) {
            form["capacity"].value = form["capacity"].value + 6;
            form["seats_available"].value = form["seats_available"].value + 6;

            this.setState({
                first_economy_seats: first_economy_seats + 6,
                form,
            });
        }
    };

    setExitSeats = (action) => {
        const { exit_seats } = this.state;
        let { form } = this.state;
        if (action === 0) {
            form["capacity"].value = form["capacity"].value - 6;
            form["seats_available"].value = form["seats_available"].value - 6;

            this.setState({
                exit_seats: exit_seats - 6,
                form,
            });
        } else if (action === 1) {
            form["capacity"].value = form["capacity"].value + 6;
            form["seats_available"].value = form["seats_available"].value + 6;

            this.setState({
                exit_seats: exit_seats + 6,
                form,
            });
        }
    };

    getPriceData = (data) => {
        this.priceSeats = data;
    };

    render() {
        const {
            flight_code,
            departure_datetime,
            arrival_datetime,
            aircraft,
            airline_id,
            departure_id,
            destination_id,
            capacity,
            seats_reserved,
            seats_available,
            dirty,
        } = this.state.form;
        const {
            business_seats,
            economy_seats,
            first_economy_seats,
            exit_seats,
        } = this.state;
        const { destinationList, airlineList } = this.props;

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h4
                            className="card-title"
                            style={{ marginLeft: "20px" }}
                        >
                            Thêm chuyến bay
                            <div className="float-right">
                                <button
                                    className="btn btn-success"
                                    style={{
                                        marginRight: "1rem",
                                    }}
                                    onClick={this.onSubmitInfo}
                                >
                                    Submit
                                </button>
                                <button
                                    className="btn btn-warning"
                                    style={{
                                        marginRight: "20px",
                                    }}
                                    onClick={() => this.props.onClose()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <div style={{ marginTop: "2rem" }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div>
                                            <label>Điểm khởi hành</label>
                                            <select
                                                name="departure_id"
                                                required
                                                className="form-control"
                                                value={departure_id.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "departure_id"
                                                    )
                                                }
                                            >
                                                <option>
                                                    Select departure city
                                                </option>
                                                {destinationList.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.city}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty &&
                                            departure_id.err === "*" ? (
                                                <FormError err="Departure city cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        <div>
                                            <label>Điểm đến</label>

                                            <select
                                                type="text"
                                                required
                                                className="form-control"
                                                name="destination_id"
                                                value={destination_id.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "destination_id"
                                                    )
                                                }
                                            >
                                                <option>
                                                    Select destination city
                                                </option>
                                                {destinationList.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.city}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty &&
                                            destination_id.err === "*" ? (
                                                <FormError err="Destination city cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "20px" }}
                                >
                                    <div className="col-sm-6">
                                        <div>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <StyleDatePicker
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            label="Chọn ngày khởi hành"
                                                            name="departure_datetime"
                                                            format="dd/MM/yyyy"
                                                            value={
                                                                departure_datetime.value
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeAddDepartureTime
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change date",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <KeyboardTimePicker
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            margin="normal"
                                                            id="time-picker"
                                                            name="departure_datetime"
                                                            label="Giờ khởi hành"
                                                            value={
                                                                departure_datetime.value
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeAddDepartureTime
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change time",
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div style={{ marginLeft: "1rem" }}>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <StyleDatePicker
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            label="Chọn ngày đến"
                                                            name="destination_datetime"
                                                            format="dd/MM/yyyy"
                                                            value={
                                                                arrival_datetime.value
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeAddArrivalTime
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change date",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <KeyboardTimePicker
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            margin="normal"
                                                            id="time-picker"
                                                            name="destination_datetime"
                                                            label="Thời gian hạ cánh"
                                                            value={
                                                                arrival_datetime.value
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeAddArrivalTime
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change time",
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "20px" }}
                                >
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingRight: "20px" }}
                                    >
                                        <div>
                                            <label>Tên hãng hàng không</label>
                                            <select
                                                required
                                                name="airline_id"
                                                className="form-control"
                                                value={airline_id.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "airline_id"
                                                    )
                                                }
                                            >
                                                <option>
                                                    Select airline name
                                                </option>
                                                {airlineList.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.airline_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty && airline_id.err === "*" ? (
                                                <FormError err="Airline name cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        <div>
                                            <label>Mã chuyến bay</label>
                                            <input
                                                required
                                                name="flight_code"
                                                className="form-control"
                                                value={flight_code.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "flight_code"
                                                    )
                                                }
                                            ></input>
                                            {dirty &&
                                            flight_code.err === "*" ? (
                                                <FormError err="Flight code cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "20px" }}
                                >
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingRightt: "20px" }}
                                    >
                                        <div>
                                            <label>Loại máy bay</label>
                                            <input
                                                required
                                                name="aircraft"
                                                className="form-control"
                                                value={aircraft.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "aircraft"
                                                    )
                                                }
                                            ></input>
                                            {dirty && aircraft.err === "*" ? (
                                                <FormError err="Aircraft cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        <div>
                                            <label>Sức chứa</label>
                                            <input
                                                required
                                                name="capacity"
                                                className="form-control"
                                                value={capacity.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "capacity"
                                                    )
                                                }
                                            ></input>
                                            {dirty && capacity.err === "*" ? (
                                                <FormError err="Capacity cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginTop: "20px" }}
                                >
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingRight: "20px" }}
                                    >
                                        <div>
                                            <label>Chỗ ngồi đã đặt trước</label>
                                            <input
                                                required
                                                name="seats_reserved"
                                                className="form-control"
                                                value={seats_reserved.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "seats_reserved"
                                                    )
                                                }
                                            ></input>
                                            {dirty &&
                                            seats_reserved.err === "*" ? (
                                                <FormError err="Seats reserved cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        <div>
                                            <label>Chỗ ngồi trống</label>
                                            <input
                                                required
                                                name="seats_available"
                                                className="form-control"
                                                value={seats_available.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "seats_available"
                                                    )
                                                }
                                            ></input>
                                            {dirty &&
                                            seats_available.err === "*" ? (
                                                <FormError err="Seats available cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FlightSeatSetting
                                onSubmitForm={this.state.onSubmitForm}
                                seats={capacity.value}
                                businessSeats={business_seats}
                                economySeats={economy_seats}
                                firstEconomySeats={first_economy_seats}
                                exitSeats={exit_seats}
                                setBusinessSeats={this.setBusinessSeats}
                                setEconomySeats={this.setEconomySeats}
                                setFirstEconomySeats={this.setFirstEconomySeats}
                                setExitSeats={this.setExitSeats}
                                getPriceData={this.getPriceData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddNewFlight;
