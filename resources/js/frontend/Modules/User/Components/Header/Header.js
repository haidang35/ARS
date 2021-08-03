import {
    Button,
    FormGroup,
    Grid,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import Navbar from "../../Shared/Components/Navbar/Navbar";
import "./Header.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    AddCircleOutline,
    RemoveCircleOutline,
    Search,
} from "@material-ui/icons";
import ListDestination from "../ListDestination/ListDestination";
import UserService from "../../Shared/UserService/UserService";

const CssTextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "#18ffff",
        },
        "& .MuiInputLabel-root": {
            fontSize: "20px",
        },
        "& .input MuiInput-input": {
            fontSize: "17px",
        },
        "& label.Mui-focused": {
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white",
        },
        "& .MuiInputBase-input": {
            marginTop: "0.5rem",
            fontSize: "20px",
            padding: "15px 18px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "5px",
        },
    },
})(TextField);

const StyleDatePicker = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "#18ffff",
        },
        "& .MuiInputLabel-root": {
            fontSize: "20px",
        },
        "& .input MuiInput-input": {
            fontSize: "17px",
        },
        "& label.Mui-focused": {
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#18ffff",
        },
        "& .MuiInputBase-adornedEnd": {
            marginTop: "1.5rem",
            fontSize: "20px",
            padding: "10px 18px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "5px",
        },
    },
})(KeyboardDatePicker);

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            returnDate: new Date(),
            changeDeparture: false,
            changeDestination: false,
            destinationList: [],
            tripType: 1,
            departure: {},
            destination: {},
            adults: 1,
            children: 0,
            infants: 0,
        };
    }

    componentDidMount() {
        this.getDestinationList();
    }

    getDestinationList = () => {
        UserService.getAllDestination().then((res) => {
            this.setState({
                destinationList: res.data,
            });
        });
    };

    handleChangeStartDate = (date) => {
        this.setState({
            startDate: date,
        });
    };

    handleChangeReturnDate = (date) => {
        this.setState({
            returnDate: date,
        });
    };

    handleChangeDeparture = () => {
        this.setState({
            changeDeparture: !this.state.changeDeparture,
        });
    };

    handleChangeTripType = (ev) => {
        this.setState({
            tripType: ev.target.value,
        });
    };

    onChooseDeparture = (data) => {
        this.setState({
            departure: data,
        });
        this.handleChangeDeparture();
    };

    handleChangeDestination = () => {
        this.setState({
            changeDestination: !this.state.changeDestination,
        });
    };

    onChooseDestination = (data) => {
        this.setState({
            destination: data,
        });
        this.handleChangeDestination();
    };

    changeQuantityPassenger = (passengerType, action) => {
        if (action == 1 && passengerType == 1) {
            this.setState({
                adults: this.state.adults + 1,
            });
        } else if (action == 0 && passengerType == 1 && this.state.adults > 1) {
            this.setState({
                adults: this.state.adults - 1,
            });
        }
    };

    onSearchFlight = () => {
        const {
            startDate,
            returnDate,
            tripType,
            departure,
            destination,
            adults,
            children,
            infants,
        } = this.state;
        const data = {
            trip_type: tripType,
            departure_time: startDate,
            departure: departure.id,
            destination: destination.id,
            passenger: [
                {
                    passenger_type: 1,
                    quantity: adults,
                },
                {
                    passenger_type: 2,
                    quantity: children,
                },
                {
                    passenger_type: 3,
                    quantity: infants,
                },
            ],
        };
        UserService.searchFlight(data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {});
    };

    render() {
        return (
            <div className="user-header">
                <Navbar />
                <div className="wrap-container">
                    <div className="header-content">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="header-left">
                                    <Typography variant="h2" className="title">
                                        Chọn nơi mà bạn muốn đến ...
                                    </Typography>
                                    <div className="form-check">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                    className="check-box"
                                                    checked={
                                                        this.state.tripType == 1
                                                            ? true
                                                            : false
                                                    }
                                                    value={1}
                                                    onChange={
                                                        this
                                                            .handleChangeTripType
                                                    }
                                                />
                                            }
                                            label="Một chiều"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                    className="check-box"
                                                    checked={
                                                        this.state.tripType == 2
                                                            ? true
                                                            : false
                                                    }
                                                    value={2}
                                                    onChange={
                                                        this
                                                            .handleChangeTripType
                                                    }
                                                />
                                            }
                                            label="Khứ hồi"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                    className="check-box"
                                                    checked={
                                                        this.state.tripType == 3
                                                            ? true
                                                            : false
                                                    }
                                                    value={3}
                                                    onChange={
                                                        this
                                                            .handleChangeTripType
                                                    }
                                                />
                                            }
                                            label="Nhiều chặng"
                                        />
                                        <div className="form-input">
                                            <CssTextField
                                                required
                                                onClick={
                                                    this.handleChangeDeparture
                                                }
                                                id="standard-required"
                                                label="Điểm đi"
                                                defaultValue="Nhập thành phố/mã sân bay"
                                                className="input-field"
                                                disabled
                                                value={
                                                    this.state.departure.city
                                                }
                                            />
                                            <CssTextField
                                                required
                                                onClick={
                                                    this.handleChangeDestination
                                                }
                                                id="standard-required"
                                                label="Điểm đến"
                                                defaultValue="Nhập thành phố/mã sân bay"
                                                className="input-field"
                                                disabled
                                                value={
                                                    this.state.destination.city
                                                }
                                            />
                                        </div>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <StyleDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Ngày đi"
                                                value={this.state.startDate}
                                                onChange={
                                                    this.handleChangeStartDate
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                className="date-field"
                                            />

                                            <StyleDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Ngày về"
                                                disabled={
                                                    this.state.tripType == 2
                                                        ? false
                                                        : true
                                                }
                                                value={this.state.returnDate}
                                                onChange={
                                                    this.handleChangeReturnDate
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                className="date-field date-field-right"
                                            />
                                        </MuiPickersUtilsProvider>
                                        <div className="passenger-type">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="choose-quantity">
                                                        <label className="title-passenger">
                                                            Người lớn
                                                        </label>
                                                        <div className="content">
                                                            <RemoveCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        1,
                                                                        0
                                                                    )
                                                                }
                                                                className="icon"
                                                            />
                                                            <span className="quantity">
                                                                {
                                                                    this.state
                                                                        .adults
                                                                }
                                                            </span>
                                                            <AddCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        1,
                                                                        1
                                                                    )
                                                                }
                                                                className="icon"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="choose-quantity">
                                                        <label className="title-passenger">
                                                            Trẻ em
                                                        </label>
                                                        <div className="content">
                                                            <RemoveCircleOutline className="icon" />
                                                            <span className="quantity">
                                                                {
                                                                    this.state
                                                                        .children
                                                                }
                                                            </span>
                                                            <AddCircleOutline className="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="choose-quantity">
                                                        <label className="title-passenger">
                                                            Em bé
                                                        </label>
                                                        <div className="content">
                                                            <RemoveCircleOutline className="icon" />
                                                            <span className="quantity">
                                                                {
                                                                    this.state
                                                                        .infants
                                                                }
                                                            </span>
                                                            <AddCircleOutline className="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={this.onSearchFlight}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="btn-search-form"
                                        startIcon={<Search />}
                                    >
                                        Tìm kiếm chuyến bay
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="header-right"></div>
                                <ListDestination
                                    onOpen={
                                        this.state.changeDeparture ||
                                        this.state.changeDestination
                                    }
                                    handleClose={
                                        this.handleChangeDeparture ||
                                        this.handleChangeDestination
                                    }
                                    data={this.state.destinationList}
                                    onChoose={
                                        this.state.changeDeparture
                                            ? this.onChooseDeparture
                                            : this.onChooseDestination
                                    }
                                    title={
                                        this.state.changeDeparture
                                            ? "Chọn điểm khởi hành"
                                            : "Chọn điểm đến"
                                    }
                                    inputLabel={
                                        this.state.changeDeparture
                                            ? "Nhập điểm khởi hành"
                                            : "Nhập điểm đến"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
