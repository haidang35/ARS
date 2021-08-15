import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import TicketService from "./Shared/TicketService";
import FlightService from "../Flight/Shared/FlightService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
import { formatCurrency } from "../../../../Helpers/FormatCurrency";
import {
    dateConvert,
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
import DestinationService from "../Destination/Shared/DestinationService";
import AirlineService from "../Airline/Shared/AirlineService";
class Ticket extends Form {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            flightList: [],
            destinationList: [],
            airlineList: [],
            form: this._getInitFormData({
                flight_id: "",
                ticket_type: "",
                available_class: "",
                status: "",
                carbin_bag: "",
                checkin_bag: "",
                price: "",
                tax: "",
            }),
            message: "",
            errorMessage: "",
            onAdd: false,
            searchValue: "",
            scopeDeparture: "",
            scopeAirline: "",
            scopeDestination: "",
            scopeDatePicker: new Date(),
            scopeTimeList: "",
            showDatePicker: false,
            scopeTicketPrice: "",
            scopeClass: "",
            scopeStatus: "",
            page: 0,
            rowsPerPage: 20,
        };
    }
    componentDidMount() {
        this.getTicketList();
        this.getFlightList();
        this.getDestinationList();
        this.getAirlineList();
    }
    getTicketList = () => {
        TicketService.getTicketList().then((res) => {
            this.setState({
                ticketList: res.data,
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

    getAirlineList = () => {
        AirlineService.getAirlineList().then((res) => {
            this.setState({
                airlineList: res.data,
            });
        });
    };

    getFlightList = () => {
        FlightService.getFlightList().then((res) => {
            this.setState({
                flightList: res.data,
            });
        });
    };
    onAddTicket = () => {
        this.setState({
            onAdd: true,
        });
    };
    onCancelAdd = () => {
        this.setState({
            onAdd: false,
        });
        this._fillForm({
            flight_id: "",
            ticket_type: "",
            available_class: "",
            status: "",
            carbin_bag: "",
            checkin_bag: "",
            price: "",
            tax: "",
            dirty: false,
        });
    };
    onSubmitInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                flight_id: form.flight_id.value,
                ticket_type: form.ticket_type.value,
                available_class: form.available_class.value,
                status: form.status.value,
                carbin_bag: form.carbin_bag.value,
                checkin_bag: form.checkin_bag.value,
                price: form.price.value,
                tax: form.tax.value,
            };
            TicketService.addNewTicket(data)
                .then((res) => {
                    this.getTicketList();

                    this._fillForm({
                        flight_id: "",
                        ticket_type: "",
                        available_class: "",
                        status: "",
                        carbin_bag: "",
                        checkin_bag: "",
                        price: "",
                        tax: "",
                        dirty: false,
                    });
                    this.setState({
                        message: "Create ticket success",
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: "Create ticket failed",
                    });
                });
            this.setState({
                onAdd: false,
            });
        }
    };

    handleChangeSearchValue = (ev) => {
        this.setState({
            searchValue: ev.target.value,
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

    onScopeDeparture = (ticketData) => {
        let { scopeDeparture } = this.state;
        console.log(scopeDeparture);
        let ticketList = ticketData.filter((item) => {
            return item.departure.id == scopeDeparture;
        });
        return ticketList;
    };

    onScopeDestination = (ticketData) => {
        let { scopeDestination } = this.state;
        let ticketList = ticketData.filter((item) => {
            return item.destination.id == scopeDestination;
        });
        return ticketList;
    };

    onScopeAirline = (ticketData) => {
        let { scopeAirline } = this.state;
        let ticketList = ticketData.filter((item) => {
            return item.airline.id == scopeAirline;
        });
        return ticketList;
    };

    onScopeListTime = (ticketData) => {
        const { scopeTimeList } = this.state;
        let ticketList = [];
        if (scopeTimeList == 1) {
            const today = new Date();
            ticketList = ticketData.filter((item) => {
                const departureDate = new Date(item.flight.departure_datetime);
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
            ticketList = ticketData.filter((item) => {
                const departureDate = new Date(item.flight.departure_datetime);
                if (
                    departureDate.getDate() == today.getDate() &&
                    departureDate.getMonth() == today.getMonth() &&
                    departureDate.getFullYear() == today.getFullYear()
                ) {
                    return item;
                }
            });
        } else if (scopeTimeList == 3) {
            ticketList = ticketData.filter((item) => {
                if (this.checkScopeThisWeek(item.flight.departure_datetime)) {
                    return item;
                }
            });
        }
        return ticketList;
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

    onScopeDate = (ticketData) => {
        const { scopeDatePicker } = this.state;
        let ticketList = ticketData.filter((item) => {
            const departureTime = new Date(item.flight.departure_datetime);
            if (
                departureTime.getDate() == scopeDatePicker.getDate() &&
                departureTime.getMonth() == scopeDatePicker.getMonth() &&
                departureTime.getFullYear() == scopeDatePicker.getFullYear()
            ) {
                return item;
            }
        });
        return ticketList;
    };

    onScopeTicketPrice = (ticketData) => {
        const { scopeTicketPrice } = this.state;
        console.log(
            "🚀 ~ file: Ticket.js ~ line 291 ~ Ticket ~ scopeTicketPrice",
            scopeTicketPrice
        );
        let ticketList = [];
        if (scopeTicketPrice == 1) {
            ticketList = ticketData.sort((item1, item2) => {
                return item1.price - item2.price;
            });
        } else if (scopeTicketPrice == 2) {
            ticketList = ticketData.sort((item1, item2) => {
                return item2.price - item1.price;
            });
        }
        return ticketList;
    };

    onScopeClass = (ticketData) => {
        const { scopeClass } = this.state;
        let ticketList = [];
        if (scopeClass == 1) {
            ticketList = ticketData.filter((item) => {
                return (
                    item.available_class.toLowerCase().indexOf("economy") !== -1
                );
            });
        } else if (scopeClass == 2) {
            ticketList = ticketData.filter((item) => {
                return (
                    item.available_class.toLowerCase().indexOf("business") !==
                    -1
                );
            });
        }
        return ticketList;
    };

    onScopeStatus = (ticketData) => {
        const { scopeStatus } = this.state;
        let ticketList = [];
        if (scopeStatus == 1) {
            ticketList = ticketData.filter((item) => {
                return item.status == 1;
            });
        } else if (scopeStatus == 2) {
            ticketList = ticketData.filter((item) => {
                return item.status == 2;
            });
        }
        return ticketList;
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

    render() {
        const {
            flight_id,
            ticket_type,
            available_class,
            status,
            carbin_bag,
            checkin_bag,
            price,
            tax,
            dirty,
        } = this.state.form;
        let {
            onAdd,
            destinationList,
            airlineList,
            onSearch,
            scopeAirline,
            scopeDatePicker,
            scopeDeparture,
            scopeDestination,
            scopeTimeList,
            searchValue,
            scopeTicketPrice,
            scopeClass,
            scopeStatus,
            page,
            rowsPerPage,
        } = this.state;
        let { ticketList, flightList, message, errorMessage } = this.state;
        ticketList = ticketList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

        if (onSearch) {
            ticketList = ticketList.filter((item) => {
                return (
                    item.flight.flight_code
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.flight.aircraft
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
            if (scopeAirline !== "") {
                ticketList = this.onScopeAirline(ticketList);
            }
            if (scopeDeparture !== "") {
                ticketList = this.onScopeDeparture(ticketList);
            }
            if (scopeDestination !== "") {
                ticketList = this.onScopeDestination(ticketList);
            }
            if (scopeTimeList !== "") {
                ticketList = this.onScopeListTime(ticketList);
            }
            if (this.state.showDatePicker) {
                ticketList = this.onScopeDate(ticketList);
            }
            if (scopeTicketPrice !== "") {
                ticketList = this.onScopeTicketPrice(ticketList);
            }
            if (scopeClass !== "") {
                ticketList = this.onScopeClass(ticketList);
            }
            if (scopeStatus !== "") {
                ticketList = this.onScopeStatus(ticketList);
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
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            {!onAdd ? (
                                <h4 className="card-title">
                                    Danh sách vé máy bay
                                    <button
                                        style={{
                                            marginRight: "20px",
                                            float: "right",
                                        }}
                                        className="btn btn-primary"
                                        onClick={this.onAddTicket}
                                    >
                                        Add new ticket
                                    </button>
                                </h4>
                            ) : (
                                <h4
                                    className="card-title"
                                    style={{ marginLeft: "20px" }}
                                >
                                    Thêm vé máy bay
                                    <div className="float-right">
                                        {onAdd ? (
                                            <div>
                                                <button
                                                    style={{
                                                        marginRight: "40px",
                                                    }}
                                                    className="btn btn-success"
                                                    onClick={this.onSubmitInfo}
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    style={{
                                                        marginRight: "15px",
                                                    }}
                                                    className="btn btn-warning"
                                                    onClick={this.onCancelAdd}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </h4>
                            )}
                            <div style={{ marginTop: "54px" }}>
                                <AlertSuccess message={this.state.message} />
                                <AlertDanger
                                    message={this.state.errorMessage}
                                />
                            </div>
                        </div>
                        {!onAdd ? (
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
                                                value={
                                                    this.state.scopeDeparture
                                                }
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Chọn điểm khởi hành
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
                                                value={
                                                    this.state.scopeDestination
                                                }
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Chọn điểm đến
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
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Chọn hãng hàng không
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
                                                    value={
                                                        this.state.scopeTimeList
                                                    }
                                                    onChange={
                                                        this.handleChangeScope
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn thời gian
                                                    </option>
                                                    <option value={1}>
                                                        Hôm nay
                                                    </option>
                                                    <option value={2}>
                                                        Ngày mai
                                                    </option>
                                                    <option value={3}>
                                                        Tuần này
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
                                                            value={
                                                                scopeDatePicker
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeDatePicker
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change date",
                                                            }}
                                                        />
                                                    </Grid>
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-md-1">
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
                                    <div className="col-sm-2">
                                        <div style={{ marginLeft: "-1rem" }}>
                                            <select
                                                className="choices form-select"
                                                name="scopeTicketPrice"
                                                value={
                                                    this.state.scopeTicketPrice
                                                }
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Lọc theo giá vé
                                                </option>
                                                <option value={1}>
                                                    Từ thấp tới cao
                                                </option>
                                                <option value={2}>
                                                    Từ cao tới thấp
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div style={{ marginLeft: "-1rem" }}>
                                            <select
                                                className="choices form-select"
                                                name="scopeClass"
                                                value={this.state.scopeClass}
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Lọc theo hạng ghế
                                                </option>
                                                <option value={1}>
                                                    Economy ( Hạng phổ thông )
                                                </option>
                                                <option value={2}>
                                                    Business ( Hạng thương gia )
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div style={{ marginLeft: "-1rem" }}>
                                            <select
                                                className="choices form-select"
                                                name="scopeStatus"
                                                value={this.state.scopeStatus}
                                                onChange={
                                                    this.handleChangeScope
                                                }
                                            >
                                                <option value="">
                                                    Lọc theo trạng thái
                                                </option>
                                                <option value={1}>
                                                    Khởi hành đúng giờ
                                                </option>
                                                <option value={2}>
                                                    Bị delay
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Chuyến bay</th>
                                                    <th>Hành trình</th>
                                                    <th>Thời gian khởi hành</th>
                                                    <th>Thời gian hạ cánh</th>
                                                    <th>Hãng hàng không</th>
                                                    <th>Loại vé</th>
                                                    <th>Hạng ghế có sẵn</th>
                                                    <th>Trạng thái</th>

                                                    <th>Giá vé</th>
                                                    <th>Thuế</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ticketList.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td className="text-bold-500">
                                                                {item.id}
                                                            </td>
                                                            <td className="text-bold-500">
                                                                {
                                                                    item.flight
                                                                        .flight_code
                                                                }
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: "20%",
                                                                }}
                                                            >
                                                                {item.departure
                                                                    .city +
                                                                    " - " +
                                                                    item
                                                                        .destination
                                                                        .city}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: "20%",
                                                                }}
                                                            >
                                                                {getTime(
                                                                    item.flight
                                                                        .departure_datetime
                                                                ) +
                                                                    " " +
                                                                    dateConvert(
                                                                        item
                                                                            .flight
                                                                            .departure_datetime
                                                                    )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: "20%",
                                                                }}
                                                            >
                                                                {getTime(
                                                                    item.flight
                                                                        .arrival_datetime
                                                                ) +
                                                                    " " +
                                                                    dateConvert(
                                                                        item
                                                                            .flight
                                                                            .arrival_datetime
                                                                    )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: "15%",
                                                                }}
                                                            >
                                                                {
                                                                    item.airline
                                                                        .airline_name
                                                                }
                                                            </td>
                                                            <td
                                                                className="text-bold-500"
                                                                style={{
                                                                    width: "5%",
                                                                }}
                                                            >
                                                                {
                                                                    item.ticket_type
                                                                }
                                                            </td>
                                                            <td className="text-bold-500">
                                                                {
                                                                    item.available_class
                                                                }
                                                            </td>

                                                            <td
                                                                className="text-bold-500"
                                                                style={{
                                                                    width: "15%",
                                                                }}
                                                            >
                                                                {item.status ==
                                                                1
                                                                    ? "Khởi hành đúng giờ"
                                                                    : "Bị hoãn"}
                                                            </td>

                                                            <td className="text-bold-500">
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </td>
                                                            <td className="text-bold-500">
                                                                {formatCurrency(
                                                                    item.tax
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/admin/tickets/${item.id}`}
                                                                >
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        style={{
                                                                            float: "right",
                                                                            marginRight:
                                                                                "-18px",
                                                                        }}
                                                                    >
                                                                        View
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <TablePagination
                                            component="div"
                                            count={this.state.ticketList.length}
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
                        ) : (
                            ""
                        )}
                        {onAdd ? (
                            <div style={{ padding: "40px" }}>
                                <div className="row">
                                    <div
                                        className="col-sm-6"
                                        style={{ paddingRight: "20px" }}
                                    >
                                        <div>
                                            <label>Chuyến bay</label>
                                            <select
                                                name="flight_id"
                                                required
                                                className="form-control"
                                                value={flight_id.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "flight_id"
                                                    )
                                                }
                                            >
                                                <option>
                                                    Select flight code
                                                </option>
                                                {flightList.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.flight_code}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty && flight_id.err === "*" ? (
                                                <FormError err="Flight code cannot be empty" />
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
                                            <label>Loại vé</label>
                                            <input
                                                type="text"
                                                name="ticket_type"
                                                required
                                                className="form-control"
                                                value={ticket_type.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "ticket_type"
                                                    )
                                                }
                                            />
                                            {dirty &&
                                            ticket_type.err === "*" ? (
                                                <FormError err="Ticket type cannot be empty" />
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
                                            <label>Hạng ghế có sẵn</label>
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                name="available_class"
                                                value={available_class.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "available_class"
                                                    )
                                                }
                                            />
                                            {dirty &&
                                            available_class.err === "*" ? (
                                                <FormError err="Available class cannot be empty" />
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
                                            <label>Trạng thái</label>
                                            <input
                                                name="status"
                                                required
                                                className="form-control"
                                                value={status.value}
                                                onChange={(ev) =>
                                                    this._setValue(ev, "status")
                                                }
                                            ></input>
                                            {dirty && status.err === "*" ? (
                                                <FormError err="Status cannot be empty" />
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
                                            <label>Hành lý xách tay</label>
                                            <input
                                                required
                                                name="carbin_bag"
                                                className="form-control"
                                                value={carbin_bag.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "carbin_bag"
                                                    )
                                                }
                                            ></input>
                                            {dirty && carbin_bag.err === "*" ? (
                                                <FormError err="Carbin baggage cannot be empty" />
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
                                            <label>Hành lý ký gửi</label>
                                            <input
                                                required
                                                name="checkin_bag"
                                                className="form-control"
                                                value={checkin_bag.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "checkin_bag"
                                                    )
                                                }
                                            ></input>
                                            {dirty &&
                                            checkin_bag.err === "*" ? (
                                                <FormError err="Checkin baggage cannot be empty" />
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
                                            <label>Giá vé</label>
                                            <input
                                                required
                                                name="price"
                                                className="form-control"
                                                value={price.value}
                                                onChange={(ev) =>
                                                    this._setValue(ev, "price")
                                                }
                                            ></input>
                                            {dirty && price.err === "*" ? (
                                                <FormError err="Price cannot be empty" />
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
                                            <label>Thuế phí</label>
                                            <input
                                                required
                                                name="tax"
                                                className="form-control"
                                                value={tax.value}
                                                onChange={(ev) =>
                                                    this._setValue(ev, "tax")
                                                }
                                            ></input>
                                            {dirty && tax.err === "*" ? (
                                                <FormError err="Tax cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ticket;
