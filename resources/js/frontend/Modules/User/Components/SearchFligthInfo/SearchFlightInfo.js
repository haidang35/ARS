import React from "react";
import { Component } from "react";
import "./SearchFlightInfo.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SearchFlightBar from "../SearchFlightBar/SearchFlightBar";
import {
    Button,
    FilledInput,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Radio,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { FaSearchengin, FaPlane } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import UserService from "../../../User/Shared/UserService/UserService";
import { getDate, getTime } from "../../../../Helpers/DateTime/ConvertDateTime";
import FlightInfoDetails from "./FlightInfoDetails/FlightInfoDetails";
import FlightItem from "./FlightItem/FlightItem";
import { goTo } from "../../../../Helpers/Redirect/Redirect";
import { Redirect } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
        "& .MuiInput-underline:before": {
            borderBottom: "none",
        },
        "& .MuiInput-underline:after": {
            borderBottom: "none",
        },
        "& .MuiInputBase-adornedEnd": {
            fontSize: "20px",
            padding: "6px 18px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: 0,
        },
        "& .MuiInput-formControl": {
            marginTop: "-16px",
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

class SearchFlightInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            results: [],
            searchType: 1,
            onSearch: false,
            showSelectDeparture: false,
            showSelectDestination: false,
            departureList: [],
            destinationList: [],
            scopeDeparture: "",
            scopeDestination: "",
            searchDeparture: "",
            searchDestination: "",
            scopeDepartureDate: new Date(),
        };
    }

    componentDidMount() {
        this.searchFlightInfoDidMount();
        this.getDestinationList();
    }

    getDestinationList = () => {
        UserService.getAllDestination().then((res) => {
            this.setState({
                destinationList: res.data,
                departureList: res.data,
            });
        });
    };

    handleChangeSearchType = (ev) => {
        this.setState({
            searchType: ev.target.value,
        });
    };

    handleSearchValue = (ev) => {
        this.setState({ search: ev.target.value });
    };

    searchFlightInfoDidMount = () => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        this.setState({
            search,
        });
        UserService.searchFlightInfo({
            search,
        }).then((res) => {
            this.setState({
                results: res.data,
            });
        });
    };

    onSearchFlightInfo = () => {
        let { search, scopeDeparture, scopeDestination, scopeDepartureDate } =
            this.state;
        this.setState({ onSearch: true });
        scopeDeparture = scopeDeparture.id;
        scopeDestination = scopeDestination.id;
        UserService.searchFlightInfo({
            search,
            scopeDeparture,
            scopeDestination,
            scopeDepartureDate: getDate(scopeDepartureDate),
        }).then((res) => {
            console.log("result", res.data);
            this.setState({
                results: res.data,
            });
        });
    };

    onKeyDownSearch = (ev) => {
        if (ev.key === "Enter") {
            this.onSearchFlightInfo();
        }
    };

    onShowSelectDeparture = () => {
        this.setState({
            showSelectDeparture: !this.state.showSelectDeparture,
        });
    };

    onShowSelectDestination = () => {
        this.setState({
            showSelectDestination: !this.state.showSelectDestination,
        });
    };

    setScopeDeparture = (data) => {
        this.setState({
            scopeDeparture: data,
            showSelectDeparture: false,
        });
    };

    handleSearchDestination = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    setScopeDestination = (data) => {
        this.setState({
            scopeDestination: data,
            showSelectDestination: false,
        });
    };

    handleChangeStartDate = (value) => {
        this.setState({
            scopeDepartureDate: value,
        });
    };

    render() {
        let {
            results,
            onSearch,
            search,
            showSelectDeparture,
            showSelectDestination,
            departureList,
            destinationList,
            scopeDeparture,
            scopeDestination,
            searchDeparture,
            searchDestination,
            searchType,
        } = this.state;

        departureList = departureList.filter((item) => {
            return (
                item.city
                    .toLowerCase()
                    .indexOf(searchDeparture.toLowerCase()) !== -1
            );
        });

        destinationList = destinationList.filter((item) => {
            return (
                item.city
                    .toLowerCase()
                    .indexOf(searchDestination.toLowerCase()) !== -1
            );
        });

        return (
            <div>
                <SubNavbar />
                {/* <SearchFlightBar /> */}
                <div className="search-flight-info">
                    <div className="wrap-container">
                        <div className="title-box">
                            <Typography variant="h4">
                                Tìm kiếm chuyến bay
                            </Typography>
                        </div>

                        <div className="search-form">
                            <div className="search-bar">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    name="search"
                                    className="search-input"
                                    placeholder="Search flight code ..."
                                    value={this.state.search}
                                    onChange={this.handleSearchValue}
                                    onKeyDown={this.onKeyDownSearch}
                                />
                            </div>
                            <div className="scope-bar">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="scope-departure">
                                            <div
                                                className="select-bar"
                                                onClick={
                                                    this.onShowSelectDeparture
                                                }
                                            >
                                                <Typography
                                                    variant="body1"
                                                    className="select-item-choosed"
                                                >
                                                    {scopeDeparture == ""
                                                        ? "Chọn điểm khởi hành"
                                                        : scopeDeparture.city}
                                                </Typography>
                                                {showSelectDeparture ? (
                                                    <IoIosArrowUp className="arrow-icon" />
                                                ) : (
                                                    <IoIosArrowDown className="arrow-icon" />
                                                )}
                                            </div>
                                            {showSelectDeparture ? (
                                                <div className="select-list">
                                                    <input
                                                        type="text"
                                                        name="searchDeparture"
                                                        placeholder="Search ..."
                                                        className="search-departure"
                                                        value={searchDeparture}
                                                        onChange={
                                                            this
                                                                .handleSearchDestination
                                                        }
                                                    />
                                                    <ul className="list-item">
                                                        {departureList.map(
                                                            (item) => {
                                                                return (
                                                                    <li
                                                                        onClick={() =>
                                                                            this.setScopeDeparture(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="item"
                                                                    >
                                                                        {
                                                                            item.city
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="scope-departure">
                                            <div
                                                className="select-bar"
                                                onClick={
                                                    this.onShowSelectDestination
                                                }
                                            >
                                                <Typography
                                                    variant="body1"
                                                    className="select-item-choosed"
                                                >
                                                    {scopeDestination == ""
                                                        ? "Chọn điểm đến"
                                                        : scopeDestination.city}
                                                </Typography>
                                                {showSelectDestination ? (
                                                    <IoIosArrowUp className="arrow-icon" />
                                                ) : (
                                                    <IoIosArrowDown className="arrow-icon" />
                                                )}
                                            </div>
                                            {showSelectDestination ? (
                                                <div className="select-list">
                                                    <input
                                                        type="text"
                                                        name="searchDestination"
                                                        placeholder="Search ..."
                                                        className="search-departure"
                                                        value={
                                                            searchDestination
                                                        }
                                                        onChange={
                                                            this
                                                                .handleSearchDestination
                                                        }
                                                    />
                                                    <ul className="list-item">
                                                        {destinationList.map(
                                                            (item) => {
                                                                return (
                                                                    <li
                                                                        onClick={() =>
                                                                            this.setScopeDestination(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="item"
                                                                    >
                                                                        {
                                                                            item.city
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
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
                                                value={
                                                    this.state
                                                        .scopeDepartureDate
                                                }
                                                onChange={
                                                    this.handleChangeStartDate
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                className="date-field"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3">
                                        <Button
                                            onClick={this.onSearchFlightInfo}
                                            variant="contained"
                                            className="btn-search"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-result-list">
                            {results.map((item) => {
                                return <FlightItem key={item.id} data={item} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchFlightInfo;
