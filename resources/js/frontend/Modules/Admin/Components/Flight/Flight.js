import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import FlightService from "./Shared/FlightService";
import AirlineService from "../Airline/Shared/AirlineService";
import DestinationService from "../Destination/Shared/DestinationService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
import {
    dateConvert,
    getDate,
    getTime,
} from "../../../../Helpers/DateTime/ConvertDateTime";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { TablePagination, withStyles } from "@material-ui/core";
import AlertModal from "../../../../Shared/Components/Modal/AlertModal";
import AddNewFlight from "./Components/AddNewFlight/AddNewFlight";

const StyleDatePicker = withStyles({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
        },
    },
})(KeyboardDatePicker);
class Flight extends Form {
    constructor(props) {
        super(props);
        this.state = {
            destinationList: [],
            flightList: [],
            airlineList: [],
            onAdd: false,
            message: "",
            errorMessage: "",
            onSearch: false,
            searchValue: "",
            scopeAirline: "",
            scopeDestination: "",
            scopeDeparture: "",
            scopeTimeList: "",
            showDatePicker: false,
            scopeDatePicker: new Date(),
            page: 0,
            rowsPerPage: 20,
        };
    }
    componentDidMount() {
        this.getFlightList();
        this.getDestinationList();
        this.getAirlineList();
    }
    getFlightList = () => {
        FlightService.getFlightList()
            .then((res) => {
                this.setState({
                    flightList: res.data,
                });
            })
            .catch((err) => {});
    };
    getAirlineList = () => {
        AirlineService.getAirlineList().then((res) => {
            this.setState({
                airlineList: res.data,
            });
        });
    };

    getDestinationList = () => {
        DestinationService.getDestinationList().then((res) => {
            this.setState({
                destinationList: res.data,
            });
        });
    };

    onCancelAdd = () => {
        this.setState({
            onAdd: false,
        });
        this._fillForm({
            flight_code: "",
            departure_datetime: "",
            arrival_datetime: "",
            aircraft: "",
            airline_id: "",
            departure_id: "",
            destination_id: "",
            capacity: "",
            seats_reserved: "",
            seats_available: "",
            dirty: false,
        });
        this.getFlightList();
    };
    onAddFlight = () => {
        this.setState({
            onAdd: !this.state.onAdd,
        });
    };
    onSubmitInfo = (data) => {
        FlightService.addNewFlight(data)
            .then((res) => {
                this.getFlightList();
                this._fillForm({
                    flight_code: "",
                    departure_datetime: new Date(),
                    arrival_datetime: new Date(),
                    aircraft: "",
                    airline_id: "",
                    departure_id: "",
                    destination_id: "",
                    capacity: "",
                    seats_reserved: "",
                    seats_available: "",
                });
                this.setState({
                    message: `Create successfully flight with code ${res.data.flight_code}`,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create flight failed",
                });
            });
        this.setState({
            onAdd: false,
        });
    };

    handleChangeSearchValue = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
            onSearch: false,
        });
    };

    handleChangeScope = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    onSearch = () => {
        this.setState({
            onSearch: true,
        });
    };

    onScopeDeparture = (flightData) => {
        let { scopeDeparture } = this.state;
        let flightList = flightData.filter((item) => {
            return item.departure_id == scopeDeparture;
        });
        return flightList;
    };

    onScopeDestination = (flightData) => {
        let { scopeDestination } = this.state;
        let flightList = flightData.filter((item) => {
            return item.destination_id == scopeDestination;
        });
        return flightList;
    };

    onScopeAirline = (flightData) => {
        let { scopeAirline } = this.state;
        let flightList = flightData.filter((item) => {
            return item.airline_id == scopeAirline;
        });
        return flightList;
    };

    onScopeListTime = (flightData) => {
        const { scopeTimeList } = this.state;
        let flightList = [];
        if (scopeTimeList == 1) {
            const today = new Date();
            flightList = flightData.filter((item) => {
                const departureDate = new Date(item.departure_datetime);
                if (
                    departureDate.getDate() == today.getDate() &&
                    departureDate.getMonth() == today.getMonth() &&
                    departureDate.getFullYear() == today.getFullYear()
                ) {
                    return item;
                }
            });
        } else if (scopeTimeList == 2) {
            const today = new Date();
            today.setDate(today.getDate() + 1);
            flightList = flightData.filter((item) => {
                const departureDate = new Date(item.departure_datetime);
                if (
                    departureDate.getDate() == today.getDate() &&
                    departureDate.getMonth() == today.getMonth() &&
                    departureDate.getFullYear() == today.getFullYear()
                ) {
                    return item;
                }
            });
        } else if (scopeTimeList == 3) {
            flightList = flightData.filter((item) => {
                if (this.checkScopeThisWeek(item.departure_datetime)) {
                    return item;
                }
            });
        }
        return flightList;
    };

    showDatePicker = () => {
        this.setState({
            showDatePicker: !this.state.showDatePicker,
        });
    };

    checkScopeThisWeek(date) {
        const today = new Date();
        const dateConvert = new Date(date);
        let curr = new Date();
        let first = curr.getDate() - curr.getDay();
        let last = first + 6;
        let firstday = new Date(curr.setDate(first));
        let lastday = new Date(curr.setDate(last));

        if (
            dateConvert.getDate() >= firstday.getDate() &&
            dateConvert.getDate() <= lastday.getDate() &&
            dateConvert.getMonth() === today.getMonth() &&
            dateConvert.getFullYear() === today.getFullYear()
        ) {
            return true;
        } else {
            return false;
        }
    }

    handleChangeDatePicker = (datetime, value) => {
        this.setState({
            scopeDatePicker: datetime,
        });
    };

    onScopeDate = (flightData) => {
        const { scopeDatePicker } = this.state;
        let flightList = flightData.filter((item) => {
            const departureTime = new Date(item.departure_datetime);
            if (
                departureTime.getDate() == scopeDatePicker.getDate() &&
                departureTime.getMonth() == scopeDatePicker.getMonth() &&
                departureTime.getFullYear() == scopeDatePicker.getFullYear()
            ) {
                return item;
            }
        });
        return flightList;
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

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0,
        });
    };

    onDeleteFlight = (id) => {
        FlightService.deleteFlight(id)
            .then((res) => {
                this.setState({
                    message: `Delete flight ${res.data.flight_code} successful`,
                });
                this.getFlightList();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: `Delete flight  failed`,
                });
            });
    };

    render() {
        let {
            flightList,
            airlineList,
            destinationList,
            message,
            errorMessage,
            searchValue,
            scopeAirline,
            scopeDestination,
            onSearch,
            scopeDeparture,
            scopeTimeList,
            scopeDatePicker,
            page,
            rowsPerPage,
        } = this.state;

        const { onAdd } = this.state;

        flightList = flightList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        if (onSearch) {
            flightList = flightList.filter((item) => {
                return (
                    item.flight_code
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.aircraft
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
            if (scopeAirline !== "") {
                flightList = this.onScopeAirline(flightList);
            }
            if (scopeDeparture !== "") {
                flightList = this.onScopeDeparture(flightList);
            }
            if (scopeDestination !== "") {
                flightList = this.onScopeDestination(flightList);
            }
            if (scopeTimeList !== "") {
                flightList = this.onScopeListTime(flightList);
            }
            if (this.state.showDatePicker) {
                flightList = this.onScopeDate(flightList);
            }
        }

        if (message.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    message: "",
                    errorMessage: "",
                });
            }, 5000);
        }
        return (
            <div>
                {onAdd ? (
                    <AddNewFlight
                        destinationList={destinationList}
                        airlineList={airlineList}
                        onClose={this.onAddFlight}
                        onSubmitInfo={this.onSubmitInfo}
                    />
                ) : (
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Flight List
                                <button
                                    style={{ float: "right" }}
                                    onClick={this.onAddFlight}
                                    className="btn btn-primary"
                                >
                                    Add new flight
                                </button>
                            </h4>

                            <div style={{ marginTop: "54px" }}>
                                <AlertSuccess message={this.state.message} />
                                <AlertDanger
                                    message={this.state.errorMessage}
                                />
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group position-relative has-icon-left">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            name="searchValue"
                                            value={this.state.searchValue}
                                            onChange={
                                                this.handleChangeSearchValue
                                            }
                                        />
                                        <div className="form-control-icon">
                                            <i className="bi bi-search" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <select
                                            className="choices form-select"
                                            name="scopeDeparture"
                                            value={this.state.scopeDeparture}
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Choose departure
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
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <select
                                            className="choices form-select"
                                            name="scopeDestination"
                                            value={this.state.scopeDestination}
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Choose destination
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
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <select
                                            className="choices form-select"
                                            name="scopeAirline"
                                            value={this.state.scopeAirline}
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Choose airline
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
                                    </div>
                                </div>

                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <button
                                            onClick={this.onSearch}
                                            className="btn btn-primary"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {!this.state.showDatePicker ? (
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <select
                                                className="choices form-select"
                                                name="scopeTimeList"
                                                value={this.state.scopeTimeList}
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">Time</option>
                                                <option value={1}>Today</option>
                                                <option value={2}>
                                                    Tomorrow
                                                </option>
                                                <option value={3}>
                                                    This week
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-md-3">
                                        <div style={{ marginLeft: "2rem" }}>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Grid container>
                                                    <KeyboardDatePicker
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Chọn ngày khởi hành"
                                                        format="dd/MM/yyyy"
                                                        value={scopeDatePicker}
                                                        onChange={
                                                            this
                                                                .handleChangeDatePicker
                                                        }
                                                        KeyboardButtonProps={{
                                                            "aria-label":
                                                                "change date",
                                                        }}
                                                    />

                                                    {/*                                                    
                                                        <KeyboardTimePicker
                                                            margin="normal"
                                                            id="time-picker"
                                                            label="Giờ khởi hành"
                                                            value={
                                                                scopeDatePicker
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeDatePicker
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change time",
                                                            }}
                                                        />
                                                    */}
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-2">
                                    <button
                                        onClick={this.showDatePicker}
                                        className="btn btn-info"
                                        style={
                                            this.state.showDatePicker
                                                ? { marginTop: "1rem" }
                                                : {}
                                        }
                                    >
                                        {!this.state.showDatePicker
                                            ? "Date Picker"
                                            : " Time List "}
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Flight</th>
                                                <th>Depart</th>
                                                <th>Landing time</th>
                                                <th>Departure</th>
                                                <th>Destination</th>
                                                <th>Aircraft</th>
                                                <th>Airline</th>
                                                <th>Capacity</th>
                                                <th>Seat reserved</th>
                                                <th>Seat available</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flightList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {`${getTime(
                                                                item.departure_datetime
                                                            )} ${dateConvert(
                                                                item.departure_datetime
                                                            )}`}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {`${getTime(
                                                                item.arrival_datetime
                                                            )} ${dateConvert(
                                                                item.arrival_datetime
                                                            )}`}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.departure
                                                                    .city
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.destination
                                                                    .city
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.aircraft}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.airline
                                                                    .airline_name
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.capacity}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.seats_reserved
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.seats_available
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/admin/flights/${item.id}`}
                                                            >
                                                                <button className="btn btn-primary">
                                                                    View
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                data-toggle="modal"
                                                                data-target={`#alertModal${item.id}`}
                                                                style={{
                                                                    marginTop:
                                                                        "0.5rem",
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                            <AlertModal
                                                                id={item.id}
                                                                onConfirm={
                                                                    this
                                                                        .onDeleteFlight
                                                                }
                                                                title={
                                                                    "Confirm"
                                                                }
                                                                message={`Are you sure delete flight ${item.flight_code}`}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        count={this.state.flightList.length}
                                        rowsPerPageOptions={[10, 20, 50, 100]}
                                        page={page}
                                        onPageChange={this.handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={
                                            this.handleChangeRowsPerPage
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Flight;
