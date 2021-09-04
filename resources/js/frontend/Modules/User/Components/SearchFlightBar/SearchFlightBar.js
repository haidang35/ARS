import React from "react";
import { Component } from "react";
import "./SearchFlightBar.scss";
import {
    Checkbox,
    FormControlLabel,
    Radio,
    Slider,
    Typography,
    Button,
} from "@material-ui/core";
import { withStyles, TextField } from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    Search,
    AddCircleOutline,
    RemoveCircleOutline,
} from "@material-ui/icons";
import DestinationModal from "./DestinationModal/DestinationModal";
import UserService from "../../Shared/UserService/UserService";
import { goTo } from "../../../../Helpers/Redirect/Redirect";
import ModalNotice from "../../../../Shared/Components/Modal/ModalNotice";
import { getDate } from "../../../../Helpers/DateTime/ConvertDateTime";

const CssTextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "#ffff",
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
            color: "#ffff",
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

const GreenRadio = withStyles({
    root: {
        color: "#28ec28",
        "&$checked": {
            color: "#28ec28",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

class SearchFlightBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: 1,
            children: 0,
            infants: 0,
            tripType: 1,
            startDate: new Date(),
            returnDate: new Date(),
            onChangeDeparture: false,
            onChangeDestination: false,
            destinationList: [],
            departure: "",
            destination: "",
            message: "",
        };
    }

    componentDidMount() {
        this.getDestinationList();
        this.getFlightDestinationCurrent();
    }

    getFlightDestinationCurrent = () => {
        const tripType = JSON.parse(localStorage.getItem("tripType"));
        const params = new URLSearchParams(window.location.search);
        const departureId = params.get("departure");
        const destinationId = params.get("destination");
        const departureTime = params.get("time");
        const returnTime = params.get("return");
        const data = {
            departure_id: departureId,
            destination_id: destinationId,
        };
        UserService.getFlightRoute(data)
            .then((res) => {
                console.log("ress", res.data);
                this.setState({
                    departure: res.data.departure,
                    destination: res.data.destination,
                    startDate: new Date(departureTime),
                });
            })
            .catch((err) => {
                console.log(err);
            });
        if (tripType == 2) {
            this.setState({
                returnDate: new Date(returnTime),
            });
        }
    };

    getDestinationList = () => {
        UserService.getAllDestination().then((res) => {
            this.setState({
                destinationList: res.data,
            });
        });
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

    handleChangeStartDate = (value) => {
        this.setState({
            startDate: value,
        });
    };

    handleChangeReturnDate = (value) => {
        this.setState({
            returnDate: value,
        });
    };

    handleChangeTripType = (ev) => {
        this.setState({
            tripType: ev.target.value,
        });
    };

    handleChangeDeparture = () => {
        this.setState({
            onChangeDeparture: !this.state.onChangeDeparture,
            onChangeDestination: false,
        });
    };

    handleChangeDestination = () => {
        this.setState({
            onChangeDestination: !this.state.onChangeDestination,
            onChangeDeparture: false,
        });
    };

    onChooseDeparture = (data) => {
        this.setState({
            departure: data,
        });
        this.handleChangeDeparture();
    };

    onChooseDestination = (data) => {
        this.setState({
            destination: data,
        });
        this.handleChangeDestination();
    };

    onSearchFlight = () => {
        const {
            departure,
            destination,
            tripType,
            adults,
            children,
            infants,
            startDate,
            returnDate,
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
                message: "Please enter full flight search information  !!",
            });
        }
    };

    render() {
        const { startDate, returnDate, tripType } = this.state;

        return (
            <div className="wrap-container">
                <div className="search-flight-bar">
                    <div className="row">
                        <div className="col-md-12">
                            <FormControlLabel
                                value="price"
                                control={
                                    <GreenRadio
                                        checked={tripType == 1}
                                        value={1}
                                        onChange={this.handleChangeTripType}
                                        className="radio-check"
                                    />
                                }
                                style={{ color: "#ffff" }}
                                label="One way"
                            />
                            <FormControlLabel
                                value="price"
                                control={
                                    <GreenRadio
                                        checked={tripType == 2}
                                        value={2}
                                        onChange={this.handleChangeTripType}
                                        className="radio-check"
                                    />
                                }
                                style={{ color: "#ffff" }}
                                label="Round trip"
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="input-departure">
                                <CssTextField
                                    required
                                    onClick={this.handleChangeDeparture}
                                    id="standard-required"
                                    label="Departure"
                                    defaultValue="Choose city"
                                    className="input-field"
                                    disabled
                                    value={this.state.departure.city}
                                />
                                <div
                                    className="destination-modal-list"
                                    id="destination-modal"
                                >
                                    <DestinationModal
                                        onOpen={this.state.onChangeDeparture}
                                        onClose={() =>
                                            this.setState({
                                                onChangeDeparture: false,
                                            })
                                        }
                                        handleClose={this.handleChangeDeparture}
                                        data={this.state.destinationList}
                                        onChoose={this.onChooseDeparture}
                                        title={"Destination"}
                                        inputLabel={"City, airport code"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-destination">
                                <CssTextField
                                    required
                                    onClick={this.handleChangeDestination}
                                    id="standard-required"
                                    label="Destination"
                                    defaultValue="Choose city"
                                    className="input-field"
                                    disabled
                                    value={this.state.destination.city}
                                />
                                <div
                                    className="destination-modal-list"
                                    id="destination-modal"
                                >
                                    <DestinationModal
                                        onOpen={this.state.onChangeDestination}
                                        onClose={() =>
                                            this.setState({
                                                onChangeDestination: false,
                                            })
                                        }
                                        handleClose={
                                            this.handleChangeDestination
                                        }
                                        data={this.state.destinationList}
                                        onChoose={this.onChooseDestination}
                                        title={"Select destination"}
                                        inputLabel={"Enter destination"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                                    {this.state.adults}
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
                                                    {this.state.children}
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
                                                    {this.state.infants}
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

                        <div className="col-md-8">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <StyleDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Depart"
                                            disablePast
                                            value={startDate}
                                            onChange={
                                                this.handleChangeStartDate
                                            }
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            className="date-field"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <StyleDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Return"
                                            disablePast
                                            disabled={
                                                tripType == 2 ? false : true
                                            }
                                            value={returnDate}
                                            onChange={
                                                this.handleChangeReturnDate
                                            }
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            className="date-field date-field-right"
                                        />
                                    </div>
                                </div>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col-md-4">
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
                </div>
                <ModalNotice
                    message={this.state.message}
                    onClose={() => this.setState({ message: "" })}
                />
            </div>
        );
    }
}
export default SearchFlightBar;
