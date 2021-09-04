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
import Navbar from "../../../../Shared/Components/Navbar/Navbar";
import "./BookingHeader.scss";
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
import ListDestination from "../../../ListDestination/ListDestination";
import UserService from "../../../../Shared/UserService/UserService";
import { Link, Redirect } from "react-router-dom";
import { getDate } from "../../../../../../Helpers/DateTime/ConvertDateTime";
import ModalNotice from "../../../../../../Shared/Components/Modal/ModalNotice";
import { goTo } from "../../../../../../Helpers/Redirect/Redirect";
import FavouriteDestination from "../../../FavouriteDestination/FavouriteDestination";

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
        "& .MuiInputBase-input.Mui-disabled": {
            color: "#292828",
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

class BookingHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            returnDate: new Date(),
            changeDeparture: false,
            changeDestination: false,
            destinationList: [],
            tripType: 1,
            departure: "",
            destination: "",
            adults: 1,
            children: 0,
            infants: 0,
            message: "",
            location: {},
        };
    }

    componentDidMount() {}

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            destination: nextProps.destination,
            departure: nextProps.departure,
            location: nextProps.location,
            destinationList: nextProps.destinationList,
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
        this.props.onChangeDeparture(data);
        this.handleChangeDeparture();
    };

    handleChangeDestination = () => {
        this.setState({
            changeDestination: !this.state.changeDestination,
        });
    };

    onChooseDestination = (data) => {
        this.props.onChangeDestination(data);
        this.handleChangeDestination();
    };

    changeQuantityPassenger = (passengerType, action) => {
        switch (passengerType) {
            case 1:
                this.setQuantityPassenger(action, "adults", this.state.adults);
                break;
            case 2:
                this.setQuantityPassenger(
                    action,
                    "children",
                    this.state.children
                );
                break;
            case 3:
                this.setQuantityPassenger(
                    action,
                    "infants",
                    this.state.infants
                );
                break;
            default:
                break;
        }
    };

    setQuantityPassenger = (action, stateName, stateValue) => {
        if (action == 1) {
            this.setState({
                [stateName]: stateValue + 1,
            });
        } else if (action == 0 && stateValue > 0 && stateName !== "adults") {
            this.setState({
                [stateName]: stateValue - 1,
            });
        } else if (action == 0 && stateValue >= 2 && stateName == "adults") {
            this.setState({
                [stateName]: stateValue - 1,
            });
        }
    };

    onSearchFlight = () => {
        const {
            tripType,
            departure,
            destination,
            startDate,
            returnDate,
            adults,
            infants,
            children,
        } = this.state;
        const passengers = {
            adults,
            infants,
            children,
        };
        if (departure !== "" && destination !== "") {
            localStorage.setItem("tripType", JSON.stringify(tripType));
            localStorage.setItem("passengers", JSON.stringify(passengers));
            if (tripType == 1) {
                goTo(
                    `search-flight?departure=${departure.id}&destination=${
                        destination.id
                    }&time=${getDate(startDate)}`
                );
            } else if (tripType == 2) {
                goTo(
                    `search-flight?departure=${departure.id}&destination=${
                        destination.id
                    }&time=${getDate(startDate)}&return=${getDate(returnDate)}`
                );
            }
        } else {
            this.setState({
                message: "Please enter full flight search information !!",
            });
        }
    };

    render() {
        const { tripType, departure, destination, startDate } = this.state;

        return (
            <div className="user-header">
                <Navbar />
                <div className="wrap-container">
                    <div className="header-content">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="header-left">
                                    <Typography variant="h2" className="title">
                                        WHERE WOULD YOU LIKE TO GO ?
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
                                            label="One way"
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
                                            label="Round trip"
                                        />

                                        <div className="form-input">
                                            <CssTextField
                                                required
                                                onClick={
                                                    this.handleChangeDeparture
                                                }
                                                id="standard-required"
                                                label="From"
                                                defaultValue="Choose city"
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
                                                label="To"
                                                defaultValue="Choose city"
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
                                                disablePast
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Departure"
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
                                                disablePast
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Return"
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
                                                            Adults
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
                                                            Children
                                                        </label>
                                                        <div className="content">
                                                            <RemoveCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        2,
                                                                        0
                                                                    )
                                                                }
                                                                className="icon"
                                                            />
                                                            <span className="quantity">
                                                                {
                                                                    this.state
                                                                        .children
                                                                }
                                                            </span>
                                                            <AddCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        2,
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
                                                            Infants
                                                        </label>
                                                        <div className="content">
                                                            <RemoveCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        3,
                                                                        0
                                                                    )
                                                                }
                                                                className="icon"
                                                            />
                                                            <span className="quantity">
                                                                {
                                                                    this.state
                                                                        .infants
                                                                }
                                                            </span>
                                                            <AddCircleOutline
                                                                onClick={() =>
                                                                    this.changeQuantityPassenger(
                                                                        3,
                                                                        1
                                                                    )
                                                                }
                                                                className="icon"
                                                            />
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
                                        Search flights
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="header-right"></div>
                                <ListDestination
                                    onOpen={this.state.changeDeparture}
                                    handleClose={this.handleChangeDeparture}
                                    data={this.state.destinationList}
                                    onChoose={this.onChooseDeparture}
                                    title={"Select departure"}
                                    inputLabel={"City, airport code"}
                                />
                                <ListDestination
                                    onOpen={this.state.changeDestination}
                                    handleClose={this.handleChangeDestination}
                                    data={this.state.destinationList}
                                    onChoose={this.onChooseDestination}
                                    title={"Select destination"}
                                    inputLabel={"City, airport code"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ModalNotice
                    message={this.state.message}
                    onClose={() => this.setState({ message: "" })}
                />
            </div>
        );
    }
}
export default BookingHeader;
