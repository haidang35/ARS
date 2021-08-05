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
        };
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

    getAirlineCurrentList = () => {
        let { dataOrg } = this.props;
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
        return airlines;
    };

    handleScopeAirline = (ev) => {
        this.setState({
            scopeAirline: ev.target.value,
        });
        this.props.scopeAirline(ev.target.value);
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
        } = this.state;

        let airlines = this.getAirlineCurrentList();

        return (
            <div>
                <div className="side-bar-filter">
                    <div className="sort-flights">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">
                                Sắp xếp theo chuyến bay
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
                                    label="Giá chuyến bay (Từ thấp đến cao)"
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
                                    label="Giá chuyến bay (Từ cao đến thấp)"
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
                                    label="Giờ khởi hành"
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
                                    label="Thời gian bay"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="view-mode-filter">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">
                                Chế độ hiển thị
                            </Typography>
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
                                label="Giá vé cơ bản cho người lớn"
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
                                label="Giá vé bao gồm thuế và phí"
                            />
                        </div>
                    </div>
                    <div className="filter-flight">
                        <div className="title-bar">
                            <AiFillFilter className="icon-filter" />
                            <Typography className="title">
                                Lọc theo chuyến bay
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="filter-airline">
                                <Typography className="title-filter">
                                    Chọn hãng hàng không
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
                                        label="Chọn tất cả hãng hàng không"
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
                                    Chọn theo giờ bay
                                </Typography>
                                <div className="filter-slider">
                                    <Typography className="title">
                                        Giờ khởi hành
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
                                        Giờ hạ cánh
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
