import {
    Button,
    FormControlLabel,
    Radio,
    Typography,
    withStyles,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./SearchFlightBar.scss";
import { BiSearchAlt } from "react-icons/bi";
import { goTo } from "../../../../../../Helpers/Redirect/Redirect";

const GreenRadio = withStyles({
    root: {
        color: "#ffff",
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
            searchType: 1,
            searchValue: "",
        };
    }

    handleChangeSearchType = (ev) => {
        this.setState({
            searchType: ev.target.value,
        });
    };

    handleChangeSearchValue = (ev) => {
        this.setState({
            searchValue: ev.target.value,
        });
    };

    onSearch = () => {
        const { searchType, searchValue } = this.state;
        if (searchType == 1) {
            goTo(`flight-info/search?=${searchValue}`);
        }
    };

    render() {
        const { searchType, searchValue } = this.state;
        return (
            <div>
                <div className="search-flight-box">
                    <div className="wrap-container">
                        <div className="title-box">
                            <Typography className="title" variant="h5">
                                Tìm kiếm thông tin chuyến bay
                            </Typography>
                        </div>
                        <div className="select-search-info">
                            <FormControlLabel
                                value="searchType"
                                control={
                                    <GreenRadio
                                        checked={searchType == 1}
                                        value={1}
                                        onChange={this.handleChangeSearchType}
                                        className="radio-check"
                                    />
                                }
                                style={{ color: "#ffff" }}
                                label="Chuyến bay"
                            />
                            <FormControlLabel
                                value="searchType"
                                control={
                                    <GreenRadio
                                        checked={searchType == 2}
                                        value={2}
                                        onChange={this.handleChangeSearchType}
                                        className="radio-check"
                                    />
                                }
                                style={{ color: "#ffff" }}
                                label="Mã đặt vé"
                            />
                        </div>
                        <div className="search-bar">
                            <BiSearchAlt className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search flight ..."
                                value={searchValue}
                                onChange={this.handleChangeSearchValue}
                            />
                            <div>
                                <Button
                                    onClick={this.onSearch}
                                    variant="contained"
                                    className="btn-search-home"
                                >
                                    Tìm kiếm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchFlightBar;
