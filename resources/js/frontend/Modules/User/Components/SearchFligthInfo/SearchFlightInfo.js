import React from "react";
import { Component } from "react";
import "./SearchFlightInfo.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SearchFlightBar from "../SearchFlightBar/SearchFlightBar";
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { FaSearchengin, FaPlane } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import UserService from "../../../User/Shared/UserService/UserService";
import { getTime } from "../../../../Helpers/DateTime/ConvertDateTime";
import FlightInfoDetails from "./FlightInfoDetails/FlightInfoDetails";
import FlightItem from "./FlightItem/FlightItem";
import { goTo } from "../../../../Helpers/Redirect/Redirect";
import { Redirect } from "react-router-dom";

class SearchFlightInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            results: [],
            onSearch: false,
        };
    }

    componentDidMount() {
        this.searchFlightInfo();
    }

    handleSearchValue = (ev) => {
        this.setState({ search: ev.target.value });
    };

    searchFlightInfo = () => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        UserService.searchFlightInfo({ search }).then((res) => {
            this.setState({
                results: res.data,
            });
        });
    };

    onSearchFlightInfo = () => {
        const { search } = this.state;
        this.setState({ onSearch: true });
        UserService.searchFlightInfo({ search }).then((res) => {
            this.setState({
                results: res.data,
            });
        });
        goTo(`flight-info?search=${search}`);
    };

    onKeyDownSearch = (ev) => {
        if (ev.key === "Enter") {
            this.onSearchFlightInfo();
        }
    };

    render() {
        const { results, onSearch, search } = this.state;

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
