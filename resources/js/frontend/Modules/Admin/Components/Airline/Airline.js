import { data } from "jquery";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import AddNewAirline from "./Components/AddNewAirline/AddNewAirline";
import AirlineService from "./Shared/AirlineService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
import { TablePagination } from "@material-ui/core";
import AlertModal from "../../../../Shared/Components/Modal/AlertModal";
import { URL_IMAGE_AIRLINE } from "../../../../Constances/const";
class Airline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airlineList: [],
            message: "",
            errorMessage: "",
            onSearch: false,
            searchValue: "",
            page: 0,
            rowsPerPage: 20,
        };
    }
    componentDidMount() {
        this.getAirlineList();
    }
    getAirlineList = () => {
        AirlineService.getAirlineList()
            .then((res) => {
                this.setState({
                    airlineList: res.data,
                });
            })
            .catch((err) => {});
    };
    addAirline = (data) => {
        AirlineService.addNewAirline(data)
            .then((res) => {
                this.getAirlineList();
                this.setState({
                    message: `Create successfully ${res.data.airline_name} airline`,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create airline failed",
                });
            });
    };

    handleChangeSearchValue = (ev) => {
        this.setState({
            searchValue: ev.target.value,
            onSearch: false,
        });
    };

    onSearch = () => {
        this.setState({
            onSearch: true,
        });
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

    onDeleteAirline = (id) => {
        AirlineService.deleteAirline(id)
            .then((res) => {
                this.setState({
                    message: `Delete airline ${res.data.airline_name} successfull`,
                });
                this.getAirlineList();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: `Delete airline failed`,
                });
            });
    };

    render() {
        let { airlineList, page, rowsPerPage, onSearch, searchValue } =
            this.state;
        airlineList = airlineList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        if (onSearch) {
            airlineList = airlineList.filter((item) => {
                return (
                    item.airline_name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.code
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.country
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
        }
        const { message, errorMessage } = this.state;
        if (message.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    message: "",
                    errorMessage: "",
                });
            }, 5000);
        }
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Airline list
                                <div className="float-right">
                                    <button
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#addNewAirline"
                                    >
                                        Add new airline
                                    </button>
                                </div>
                            </h4>
                            <div style={{ marginTop: "54px" }}>
                                <AlertSuccess message={this.state.message} />
                                <AlertDanger
                                    message={this.state.errorMessage}
                                />
                            </div>
                        </div>
                        <AddNewAirline onSubmit={this.addAirline} />
                        <div className="card-content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group position-relative has-icon-left">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
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
                                    <button
                                        onClick={this.onSearch}
                                        className="btn btn-primary"
                                        style={{ marginLeft: "-1rem" }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Logo</th>
                                                <th>Airline name</th>
                                                <th>Airline code</th>
                                                <th>Country</th>
                                                <th>Website</th>
                                                <th>Hotline</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {airlineList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            <img
                                                                src={`${URL_IMAGE_AIRLINE}${item.logo}`}
                                                                style={{
                                                                    width: "120px",
                                                                }}
                                                                alt="logo"
                                                            />
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airline_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.country}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.website}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.hotline}
                                                        </td>

                                                        <td>
                                                            <Link
                                                                to={`/admin/airlines/${item.id}`}
                                                            >
                                                                <button className="btn btn-primary">
                                                                    View
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                data-toggle="modal"
                                                                data-target={`#alertModal${item.id}`}
                                                                style={{
                                                                    marginLeft:
                                                                        "1rem",
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                            <AlertModal
                                                                id={item.id}
                                                                onConfirm={
                                                                    this
                                                                        .onDeleteAirline
                                                                }
                                                                title={
                                                                    "Confirm"
                                                                }
                                                                message={`Are you sure delete airline ${item.airline_name}`}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        count={this.state.airlineList.length}
                                        rowsPerPageOptions={[10, 20, 50, 100]}
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
export default Airline;
