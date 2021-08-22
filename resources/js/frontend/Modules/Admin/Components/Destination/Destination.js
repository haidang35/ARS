import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import AddNewDestination from "./Components/AddNewDestination/AddNewDestination";
import DestinationService from "./Shared/DestinationService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
import { TablePagination } from "@material-ui/core";
import AddFavouriteDestination from "./Components/AddFavouriteDestination/AddFavouriteDestination";
import AlertModal from "../../../../Shared/Components/Modal/AlertModal";
class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationList: [],
            message: "",
            errorMessage: "",
            onSearch: false,
            searchValue: "",
            page: 0,
            rowsPerPage: 20,
        };
    }
    componentDidMount() {
        this.getDestinationList();
    }
    getDestinationList = () => {
        DestinationService.getDestinationList()
            .then((res) => {
                this.setState({
                    destinationList: res.data,
                });
            })
            .catch((err) => {});
    };

    addDestination = (data) => {
        DestinationService.addNewDestination(data).then((res) => {
            this.getDestinationList();
        });
        this.setState({
            message: "Create destination successfully",
        }).catch((err) => {
            this.setState({
                errorMessage: "Create destination failed",
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

    onSubmitImage = (image, destinationId) => {
        let formData = new FormData();
        formData.append("image", image, image.name);
        DestinationService.uploadImageDestination(destinationId, formData)
            .then((res) => {
                this.getDestinationList();
                this.setState({
                    message: `Thêm địa điểm yêu thích thành công`,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Thêm địa điểm yêu thích thất bại",
                });
            });
    };

    onDeleteDestination = (id) => {
        DestinationService.deleteDestination(id)
            .then((res) => {
                this.setState({
                    message: `Delete destination ${res.data.city} successful`,
                });
                this.getDestinationList();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: `Delete destination failed`,
                });
            });
    };

    render() {
        let { destinationList, onSearch, searchValue, page, rowsPerPage } =
            this.state;
        destinationList = destinationList.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        if (onSearch) {
            destinationList = destinationList.filter((item) => {
                return (
                    item.city
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.country
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.airport_name
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
                                Điểm đến
                                <div className="float-right">
                                    <button
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#addNewDestination"
                                    >
                                        Add new destination
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
                        <AddNewDestination onSubmit={this.addDestination} />
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
                                                <th>STT</th>
                                                <th>Tỉnh/Thành phố</th>
                                                <th>Mã sân bay</th>
                                                <th>Sân bay</th>
                                                <th>Mã quốc gia</th>
                                                <th>Quốc gia</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {destinationList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.province &&
                                                            item.province
                                                                .toLowerCase()
                                                                .indexOf(
                                                                    item.city.toLowerCase()
                                                                ) === 1
                                                                ? item.province +
                                                                  "/" +
                                                                  item.city
                                                                : item.city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airport_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airport_name}
                                                        </td>

                                                        <td className="text-bold-500">
                                                            {item.country_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.country}
                                                        </td>

                                                        <td>
                                                            <Link
                                                                to={`/admin/destinations/${item.id}`}
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
                                                                        .onDeleteDestination
                                                                }
                                                                title={
                                                                    "Confirm"
                                                                }
                                                                message={`Are you sure delete destination ${item.city}`}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    <TablePagination
                                        component="div"
                                        count={
                                            this.state.destinationList.length
                                        }
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
export default Destination;
