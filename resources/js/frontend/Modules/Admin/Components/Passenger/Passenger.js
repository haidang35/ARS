import React from "react";
import { Component } from "react";
import PassengerService from "./Shared/PassengerService";
import { Link } from "react-router-dom";
import { TablePagination } from "@material-ui/core";
class Passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passengerList: [],
            search: "",
            onSearch: false,
            page: 0,
            rowsPerPage: 20,
        };
    }

    componentDidMount() {
        this.getPassengerList();
    }

    getPassengerList = () => {
        PassengerService.getAllPassenger().then((res) => {
            this.setState({
                passengerList: res.data,
            });
        });
    };

    handleChangeSearchValue = (ev) => {
        this.setState({
            search: ev.target.value,
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

    render() {
        let { passengerList, search, onSearch, page, rowsPerPage } = this.state;
        passengerList = passengerList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        if (onSearch) {
            passengerList = passengerList.filter((item) => {
                return (
                    item.passenger_name
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1 ||
                    item.booking.contact_phone
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                );
            });
        }
        let loop = 1;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Passenger List</h4>
                        </div>
                        <div className="card-content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group position-relative has-icon-left">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            value={search}
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
                                                <th>Passenger name</th>
                                                <th>Gender</th>
                                                <th>Birthday</th>
                                                <th>Phone number</th>
                                                <th>Passenger type </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {passengerList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {loop++}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.passenger_name
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.gender}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.birthday}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.booking
                                                                    .contact_phone
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.passenger_type ==
                                                            1
                                                                ? "Người lớn"
                                                                : item.passenger_type ==
                                                                  2
                                                                ? "Trẻ em"
                                                                : "Em bé sơ sinh"}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            <Link
                                                                to={`/admin/bookings/${item.id}`}
                                                            >
                                                                <button
                                                                    className="btn btn-primary"
                                                                    style={{
                                                                        marginRight:
                                                                            "-18px",
                                                                        float: "right",
                                                                    }}
                                                                >
                                                                    View
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        rowsPerPageOptions={[10, 20, 50, 100]}
                                        count={this.state.passengerList.length}
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

export default Passenger;
