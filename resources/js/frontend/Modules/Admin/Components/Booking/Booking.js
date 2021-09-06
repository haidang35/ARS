import React from "react";
import { Component } from "react";
import BookingService from "./Shared/BookingService";
import { formatCurrency } from "../../../../Helpers/FormatCurrency";
import { Link } from "react-router-dom";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
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
import {
    dateConvert,
    getTime,
} from "../../../../Helpers/DateTime/ConvertDateTime";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
            destinationList: [],
            airlineList: [],
            message: "",
            itemLoadingConfirm: "",
            onSearch: false,
            searchValue: "",
            scopeDeparture: "",
            scopeAirline: "",
            scopeDestination: "",
            scopeDatePicker: new Date(),
            scopeTimeList: "",
            showDatePicker: false,
            scopeTotalPrice: "",
            scopePaymentStatus: "",
            scopeStatus: "",
            page: 0,
            rowsPerPage: 20,
        };
    }

    componentDidMount() {
        this.getBookingList();
        this.getDestinationList();
        this.getAirlineList();
    }

    getBookingList = () => {
        BookingService.getAllBooking().then((res) => {
            this.setState({
                bookingList: res.data,
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

    confirmBooking = (id) => {
        this.setState({ itemLoadingConfirm: id });
        BookingService.updateStatus(id, { status: 2 }).then((res) => {
            this.setState({
                message: `Xác nhận đặt vé cho khách hàng ${res.data.contact_name} thành công`,
                itemLoadingConfirm: "",
            });
            this.getBookingList();
        });
    };

    cancelBooking = (id) => {
        this.setState({ itemLoadingConfirm: id });
        BookingService.updateStatus(id, { status: 3 }).then((res) => {
            this.setState({
                message: `Hủy đặt vé cho khách hàng ${res.data.contact_name} thành công`,
                itemLoadingConfirm: "",
            });
            this.getBookingList();
        });
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

    onScopeDeparture = (bookingData) => {
        let { scopeDeparture } = this.state;
        let bookingList = bookingData.filter((item) => {
            return item.flight.departure.id == scopeDeparture;
        });
        return bookingList;
    };

    onScopeDestination = (bookingData) => {
        let { scopeDestination } = this.state;
        let bookingList = bookingData.filter((item) => {
            return item.flight.destination.id == scopeDestination;
        });
        return bookingList;
    };

    onScopeAirline = (bookingData) => {
        let { scopeAirline } = this.state;
        let bookingList = bookingData.filter((item) => {
            return item.flight.airline.id == scopeAirline;
        });
        return bookingList;
    };

    onScopeListTime = (bookingData) => {
        const { scopeTimeList } = this.state;
        let bookingList = [];
        if (scopeTimeList == 1) {
            const today = new Date();
            bookingList = bookingData.filter((item) => {
                const departureDate = new Date(item.booking_date);
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
            bookingList = bookingData.filter((item) => {
                const departureDate = new Date(item.booking_date);
                if (
                    departureDate.getDate() == today.getDate() &&
                    departureDate.getMonth() == today.getMonth() &&
                    departureDate.getFullYear() == today.getFullYear()
                ) {
                    return item;
                }
            });
        } else if (scopeTimeList == 3) {
            bookingList = bookingData.filter((item) => {
                if (this.checkScopeThisWeek(item.booking_date)) {
                    return item;
                }
            });
        }
        return bookingList;
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

    onScopeDate = (bookingData) => {
        const { scopeDatePicker } = this.state;
        let bookingList = bookingData.filter((item) => {
            const departureTime = new Date(item.booking_date);
            if (
                departureTime.getDate() == scopeDatePicker.getDate() &&
                departureTime.getMonth() == scopeDatePicker.getMonth() &&
                departureTime.getFullYear() == scopeDatePicker.getFullYear()
            ) {
                return item;
            }
        });
        return bookingList;
    };

    onScopeTotalPrice = (bookingData) => {
        const { scopeTotalPrice } = this.state;
        let bookingList = [];
        if (scopeTotalPrice == 1) {
            bookingList = bookingData.sort((item1, item2) => {
                return item1.into_money - item2.into_money;
            });
        } else if (scopeTotalPrice == 2) {
            bookingList = bookingData.sort((item1, item2) => {
                return item2.into_money - item1.into_money;
            });
        }
        return bookingList;
    };

    onScopePaymentStatus = (bookingData) => {
        const { scopePaymentStatus } = this.state;
        let bookingList = [];
        if (scopePaymentStatus == 1) {
            bookingList = bookingData.filter((item) => {
                return item.payment_status == 1;
            });
        } else if (scopePaymentStatus == 2) {
            bookingList = bookingData.filter((item) => {
                return item.payment_status == 0;
            });
        }
        return bookingList;
    };

    onScopeStatus = (bookingData) => {
        const { scopeStatus } = this.state;
        let bookingList = [];
        if (scopeStatus == 1) {
            bookingList = bookingData.filter((item) => {
                return item.status == 1;
            });
        } else if (scopeStatus == 2) {
            bookingList = bookingData.filter((item) => {
                return item.status == 2;
            });
        } else if (scopeStatus == 3) {
            bookingList = bookingData.filter((item) => {
                return item.status == 3;
            });
        }
        return bookingList;
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
        let {
            bookingList,
            itemLoadingConfirm,
            destinationList,
            airlineList,
            scopeAirline,
            scopeDatePicker,
            scopeDeparture,
            scopeDestination,
            scopeTimeList,
            scopePaymentStatus,
            scopeTotalPrice,
            scopeStatus,
            searchValue,
            onSearch,
            page,
            rowsPerPage,
        } = this.state;

        bookingList = bookingList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

        if (onSearch) {
            bookingList = bookingList.filter((item) => {
                return (
                    item.contact_name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.contact_phone
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.flight.flight_code
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
            if (scopeAirline !== "") {
                bookingList = this.onScopeAirline(bookingList);
            }
            if (scopeDeparture !== "") {
                bookingList = this.onScopeDeparture(bookingList);
            }
            if (scopeDestination !== "") {
                bookingList = this.onScopeDestination(bookingList);
            }
            if (scopeTimeList !== "") {
                bookingList = this.onScopeListTime(bookingList);
            }
            if (this.state.showDatePicker) {
                bookingList = this.onScopeDate(bookingList);
            }
            if (scopeTotalPrice !== "") {
                bookingList = this.onScopeTotalPrice(bookingList);
            }
            if (scopePaymentStatus !== "") {
                bookingList = this.onScopePaymentStatus(bookingList);
            }
            if (scopeStatus !== "") {
                bookingList = this.onScopeStatus(bookingList);
            }
        }
        let loop = 1;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Booking List</h4>
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
                                                <option value="">
                                                    Choose time
                                                </option>
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
                                                        label="Choose depart"
                                                        format="dd/MM/yyyy"
                                                        value={
                                                            this.state
                                                                .scopeDatePicker
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
                                            name="scopeTotalPrice"
                                            value={this.state.scopeTotalPrice}
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Filter by price
                                            </option>
                                            <option value={1}>
                                                From low to high
                                            </option>
                                            <option value={2}>
                                                From high to low
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <select
                                            className="choices form-select"
                                            name="scopePaymentStatus"
                                            value={
                                                this.state.scopePaymentStatus
                                            }
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Payment status
                                            </option>
                                            <option value={1}>Paid</option>
                                            <option value={2}>Unpaid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div style={{ marginLeft: "-1rem" }}>
                                        <select
                                            className="choices form-select"
                                            name="scopeStatus"
                                            value={this.state.scopeStatus}
                                            onChange={this.handleChangeScope}
                                        >
                                            <option value="">
                                                Booking status
                                            </option>
                                            <option value={1}>
                                                Unconfirmed
                                            </option>
                                            <option value={2}>confirmed</option>
                                            <option value={3}>Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <AlertSuccess message={this.state.message} />
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Customer</th>
                                                <th>Phone number</th>
                                                <th>Route</th>
                                                <th>Booking date </th>
                                                <th>Number of passengers </th>
                                                <th>Flight </th>
                                                <th>Airline </th>
                                                <th>Total money</th>
                                                <th>Payment status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {loop++}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.contact_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.contact_phone}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight
                                                                .departure
                                                                .city +
                                                                " - " +
                                                                item.flight
                                                                    .destination
                                                                    .city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {`${getTime(
                                                                item.booking_date
                                                            )} - ${dateConvert(
                                                                item.booking_date
                                                            )}`}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.passenger
                                                                    .length
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .flight_code
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .airline
                                                                    .airline_name
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {formatCurrency(
                                                                item.into_money
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.payment_status ==
                                                            0
                                                                ? "Unpaid"
                                                                : "Paid"}
                                                        </td>

                                                        <td>
                                                            <div className="btn-group-table">
                                                                <Link
                                                                    to={`/admin/bookings/${item.id}`}
                                                                >
                                                                    <button className="btn btn-primary rounded-pill">
                                                                        View
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        rowsPerPageOptions={[10, 20, 50, 100]}
                                        count={this.state.bookingList.length}
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
                </div>
            </div>
        );
    }
}

export default Booking;
