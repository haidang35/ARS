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
import { Search } from "@material-ui/icons";
import ListDestination from "../ListDestination/ListDestination";

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
            endDate: "",
            onChooseStartGate: false,
        };
    }

    handleChangeStartDate = (date) => {
        this.setState({
            startDate: date,
        });
    };

    handleChangeStartGate = () => {
        this.setState({
            onChooseStartGate: !this.state.onChooseStartGate,
        });
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
                                                />
                                            }
                                            label="Nhiều chặng"
                                        />
                                        <div className="form-input">
                                            <CssTextField
                                                required
                                                onClick={
                                                    this.handleChangeStartGate
                                                }
                                                id="standard-required"
                                                label="Điểm đi"
                                                defaultValue="Nhập thành phố/mã sân bay"
                                                className="input-field"
                                                disabled
                                            />
                                            <CssTextField
                                                required
                                                id="standard-required"
                                                label="Điểm đến"
                                                defaultValue="Nhập thành phố/mã sân bay"
                                                className="input-field"
                                                disabled
                                            />
                                        </div>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <StyleDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
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
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Ngày về"
                                                value={this.state.startDate}
                                                onChange={
                                                    this.handleChangeStartDate
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                className="date-field date-field-right"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <Button
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
                                    onOpen={this.state.onChooseStartGate}
                                    handleClose={this.handleChangeStartGate}
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
