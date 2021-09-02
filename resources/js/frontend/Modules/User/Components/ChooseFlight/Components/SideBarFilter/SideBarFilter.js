import {
    Checkbox,
    FormControlLabel,
    Radio,
    Slider,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./SideBarFilter.scss";
import { AiFillFilter } from "react-icons/ai";
import { RadioGroup } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { FaLongArrowAltRight } from "react-icons/fa";

const GreenRadio = withStyles({
    root: {
        color: "green",
        "&$checked": {
            color: "green",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const AirbnbSlider = withStyles({
    root: {
        color: "#3a8589",
        height: 3,
        padding: "13px 0",
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -12,
        marginLeft: -13,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        "& .bar": {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: "#d8d8d8",
        opacity: 1,
        height: 3,
    },
})(Slider);

class SideBarFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimeDeparture: 0,
            endTimeDeparture: 24,
            startArrivalTime: 0,
            endArrivalTime: 24,
            sortFlight: null,
            viewModePrice: 2,
            scopeAirline: 0,
            airlines: [],
            filterTripType: 1,
            flightsDataReturnOrg: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getAirlineCurrentList(nextProps.dataOrg);
        this.setState({
            flightsDataReturnOrg: nextProps.dataReturnOrg,
        });
    }

    handleChangeDepartureTime = (ev, value) => {
        this.setState({
            startTimeDeparture: value[0],
            endTimeDeparture: value[1],
        });
        const departureTime = {
            from: value[0],
            to: value[1],
        };
        this.props.filterDepartureTime(departureTime, this.state.scopeAirline);
    };

    handleChangeArrivalTime = (ev, value) => {
        this.setState({
            startArrivalTime: value[0],
            endArrivalTime: value[1],
        });
        const arrivalTime = {
            from: value[0],
            to: value[1],
        };
        this.props.filterArrivalTime(arrivalTime, this.state.scopeAirline);
    };

    handleChangeFlightPrice = (value) => {
        this.setState({
            sortFlight: value,
        });
        this.props.onSortFlight(value);
    };

    handleChangeViewModePrice = (ev) => {
        this.setState({
            viewModePrice: ev.target.value,
        });
        this.props.viewModePrice(ev.target.value);
    };

    getAirlineCurrentList = (dataOrg) => {
        let airlines = [];
        for (let i = 0; i < dataOrg.length; i++) {
            if (airlines.length > 0) {
                for (let j = 0; j < airlines.length; j++) {
                    if (dataOrg[i].flight.airline.id !== airlines[j].id) {
                        airlines.push(dataOrg[i].flight.airline);
                    }
                }
            } else {
                airlines.push(dataOrg[0].flight.airline);
            }
        }
        this.setState({ airlines });
    };

    handleScopeAirline = (ev) => {
        this.setState({
            scopeAirline: ev.target.value,
        });
        this.props.scopeAirline(ev.target.value);
    };

    handleChangeFilterTripType = (value) => {
        this.setState({
            filterTripType: value,
        });
        this.props.filterTripType(value);
    };

    render() {
        const {
            startTimeDeparture,
            endTimeDeparture,
            startArrivalTime,
            endArrivalTime,
            sortFlight,
            viewModePrice,
            scopeAirline,
            airlines,
            filterTripType,
        } = this.state;

        const { tripType } = this.props;
        return (
            <div>
                <div className="side-bar-filter">
                    <div className="sort-flights">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">
                                Sort by flight
                            </Typography>
                        </div>
                        <div className="content">
                            <RadioGroup
                                aria-label="gender"
                                name="gender1"
                                className="item-check"
                            >
                                <FormControlLabel
                                    value="price"
                                    control={
                                        <GreenRadio
                                            checked={sortFlight == 0}
                                            onChange={() =>
                                                this.handleChangeFlightPrice(0)
                                            }
                                            value={sortFlight}
                                            className="radio-check"
                                        />
                                    }
                                    label="Flight price (From low to high) "
                                />
                                <FormControlLabel
                                    value="price"
                                    control={
                                        <GreenRadio
                                            checked={sortFlight == 1}
                                            onChange={() =>
                                                this.handleChangeFlightPrice(1)
                                            }
                                            value={sortFlight}
                                            className="radio-check"
                                        />
                                    }
                                    label="Flight price (From high to low) "
                                />

                                <FormControlLabel
                                    value="price"
                                    control={
                                        <Radio
                                            className="radio-check"
                                            checked={sortFlight == 2}
                                            onChange={() =>
                                                this.handleChangeFlightPrice(2)
                                            }
                                            value={sortFlight}
                                        />
                                    }
                                    label="Depart hour"
                                />
                                <FormControlLabel
                                    value="price"
                                    control={
                                        <Radio
                                            className="radio-check"
                                            checked={sortFlight == 3}
                                            onChange={() =>
                                                this.handleChangeFlightPrice(3)
                                            }
                                            value={sortFlight}
                                        />
                                    }
                                    label="Flight time"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="view-mode-filter">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">View mode</Typography>
                        </div>
                        <div className="content">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedA"
                                        checked={viewModePrice == 1}
                                        value={1}
                                        onChange={
                                            this.handleChangeViewModePrice
                                        }
                                    />
                                }
                                label="Basic fare for adults "
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedA"
                                        checked={viewModePrice == 2}
                                        value={2}
                                        onChange={
                                            this.handleChangeViewModePrice
                                        }
                                    />
                                }
                                label="Ticket price includes taxes and fees "
                            />
                        </div>
                    </div>
                    <div className="filter-flight">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">
                                Filter by flight
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="filter-airline">
                                {tripType == 2 ? (
                                    <div className="choose-filter-trip">
                                        <FormControlLabel
                                            value="price"
                                            control={
                                                <GreenRadio
                                                    checked={
                                                        filterTripType == 1
                                                    }
                                                    onChange={() =>
                                                        this.handleChangeFilterTripType(
                                                            1
                                                        )
                                                    }
                                                    value={filterTripType}
                                                    className="radio-check"
                                                />
                                            }
                                            label="Depart"
                                        />
                                        <FormControlLabel
                                            value="price"
                                            control={
                                                <GreenRadio
                                                    checked={
                                                        filterTripType == 2
                                                    }
                                                    onChange={() =>
                                                        this.handleChangeFilterTripType(
                                                            2
                                                        )
                                                    }
                                                    value={filterTripType}
                                                    className="radio-check"
                                                />
                                            }
                                            label="Return"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}

                                <Typography className="title-filter">
                                    Select airline
                                </Typography>

                                <div className="filter-box">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={scopeAirline == 0}
                                                name="scopeAirline"
                                                value={0}
                                                onChange={
                                                    this.handleScopeAirline
                                                }
                                            />
                                        }
                                        label="Select all airlines "
                                    />
                                    {airlines.map((item) => {
                                        return (
                                            <FormControlLabel
                                                key={item.id}
                                                control={
                                                    <Checkbox
                                                        name="scopeAirline"
                                                        checked={
                                                            scopeAirline ==
                                                            item.id
                                                        }
                                                        value={item.id}
                                                        onChange={(ev) =>
                                                            this.handleScopeAirline(
                                                                ev
                                                            )
                                                        }
                                                    />
                                                }
                                                label={item.airline_name}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="filter-time">
                                <Typography className="title-filter">
                                    Filter by flight time
                                </Typography>
                                <div className="filter-slider">
                                    <Typography className="title">
                                        Depart hour
                                    </Typography>
                                    <AirbnbSlider
                                        min={0}
                                        max={24}
                                        defaultValue={[
                                            startTimeDeparture,
                                            endTimeDeparture,
                                        ]}
                                        onChange={
                                            this.handleChangeDepartureTime
                                        }
                                    />
                                    <div className="flight-time">
                                        <Typography className="time">
                                            {String(
                                                startTimeDeparture
                                            ).padStart(2, "0") +
                                                ":" +
                                                "00"}
                                        </Typography>
                                        <FaLongArrowAltRight className="icon-arrow" />
                                        <Typography className="time">
                                            {String(endTimeDeparture).padStart(
                                                2,
                                                "0"
                                            ) +
                                                ":" +
                                                "00"}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="filter-slider">
                                    <Typography className="title">
                                        Arrival hour
                                    </Typography>
                                    <AirbnbSlider
                                        min={0}
                                        max={24}
                                        defaultValue={[
                                            startArrivalTime,
                                            endArrivalTime,
                                        ]}
                                        onChange={this.handleChangeArrivalTime}
                                    />
                                    <div className="flight-time">
                                        <Typography className="time">
                                            {String(startArrivalTime).padStart(
                                                2,
                                                "0"
                                            ) +
                                                ":" +
                                                "00"}
                                        </Typography>
                                        <FaLongArrowAltRight className="icon-arrow" />
                                        <Typography className="time">
                                            {String(endArrivalTime).padStart(
                                                2,
                                                "0"
                                            ) +
                                                ":" +
                                                "00"}
                                        </Typography>
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

export default SideBarFilter;
