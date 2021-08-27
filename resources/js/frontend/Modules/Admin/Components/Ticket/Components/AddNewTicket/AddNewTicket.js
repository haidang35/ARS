import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import FlightService from "../../../Flight/Shared/FlightService";

class AddNewTicket extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                flight_id: "",
                ticket_type: "",
                available_class: "",
                status: 1,
                carbin_bag: "",
                checkin_bag: "",
                price: "",
                tax: "",
            }),
            classesFlight: [],
            classChoosed: {},
        };
    }

    componentDidMount() {}

    handleChangeFlight = (ev) => {
        let { form } = this.state;
        form["dirty"] = false;
        if (ev.target.value !== "") {
            form["flight_id"].value = ev.target.value;
            this.getClassAndPriceFlight(ev.target.value);
        } else {
            form["flight_id"].value = ev.target.value;
            form["flight_id"].err = "*";
        }
        this.setState({ form });
    };

    handleChangeClassFlight = (ev) => {
        const { value } = ev.target;
        let { form } = this.state;
        if (value !== "") {
            form["available_class"].value = parseInt(value);
        }
        this.setState({ form });
        this.setPriceForClass(value);
    };

    setPriceForClass = (classId) => {
        let { form } = this.state;
        const { classesFlight } = this.state;
        classesFlight.forEach((item) => {
            if (item.class == classId) {
                form["price"].value = item.price;
            }
        });
        this.setState({ form });
    };

    getClassAndPriceFlight = (flightId) => {
        FlightService.getClassAndPrice(flightId).then((res) => {
            this.setState({
                classesFlight: res.data,
            });
        });
    };

    onSubmitInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            let classFlight = "";
            switch (form["available_class"].value) {
                case 1:
                    classFlight = "Business";
                    break;
                case 2:
                    classFlight = "Deluxe Economy";
                    break;
                case 3:
                    classFLight = "Economy";
                    break;
                case 4:
                    classFlight = "Economy";
                    break;
            }
            const data = {
                flight_id: form.flight_id.value,
                ticket_type: form.ticket_type.value,
                available_class: classFlight,
                status: form.status.value,
                carbin_bag: form.carbin_bag.value,
                checkin_bag: form.checkin_bag.value,
                price: form.price.value,
                tax: form.tax.value,
            };
            this.props.onSubmitInfo(data);
        }
    };

    render() {
        const { flightList } = this.props;
        const {
            flight_id,
            ticket_type,
            available_class,
            status,
            carbin_bag,
            checkin_bag,
            price,
            tax,
            dirty,
        } = this.state.form;
        const { classesFlight } = this.state;

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">
                            Thêm vé máy bay
                            <div className="float-right">
                                <div>
                                    <button
                                        className="btn btn-success"
                                        onClick={this.onSubmitInfo}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        style={{
                                            marginLeft: "15px",
                                        }}
                                        className="btn btn-warning"
                                        onClick={() => this.props.onCancelAdd()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <div className="add-new-ticket">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Chuyến bay</label>
                                                <select
                                                    name="flight_id"
                                                    required
                                                    className="form-control"
                                                    value={flight_id.value}
                                                    onChange={(ev) =>
                                                        this.handleChangeFlight(
                                                            ev
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select flight code
                                                    </option>
                                                    {flightList.map((item) => {
                                                        return (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {
                                                                    item.flight_code
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                {dirty &&
                                                flight_id.err === "*" ? (
                                                    <FormError err="Flight cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Hạng ghế có sẵn</label>
                                                <select
                                                    required
                                                    className="form-control form-select"
                                                    name="available_class"
                                                    value={
                                                        available_class.value
                                                    }
                                                    onChange={(ev) =>
                                                        this.handleChangeClassFlight(
                                                            ev
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn hạng ghế
                                                    </option>
                                                    {classesFlight.map(
                                                        (item) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.class
                                                                    }
                                                                >
                                                                    {item.class ===
                                                                    1
                                                                        ? "Hạng thương gia"
                                                                        : item.class ===
                                                                          2
                                                                        ? "Hạng phổ thông ưu tiên"
                                                                        : item.class ===
                                                                          3
                                                                        ? "Hạng phổ thông"
                                                                        : item.class ===
                                                                          4
                                                                        ? "Hạng phổ thông đặc biệt"
                                                                        : ""}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                                {dirty &&
                                                available_class.err === "*" ? (
                                                    <FormError err="Available class cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Loại vé</label>
                                                <input
                                                    type="text"
                                                    name="ticket_type"
                                                    required
                                                    className="form-control"
                                                    value={ticket_type.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "ticket_type"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                ticket_type.err === "*" ? (
                                                    <FormError err="Ticket type cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div>
                                                <label>Trạng thái</label>
                                                <select
                                                    name="status"
                                                    required
                                                    className="form-control form-select"
                                                    value={status.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "status"
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn trạng thái
                                                    </option>
                                                    <option value={1}>
                                                        Khởi hành đúng giờ
                                                    </option>
                                                    <option value={2}>
                                                        Bị delay
                                                    </option>
                                                </select>
                                                {dirty && status.err === "*" ? (
                                                    <FormError err="Status cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Hành lý xách tay</label>
                                                <input
                                                    required
                                                    name="carbin_bag"
                                                    className="form-control"
                                                    value={carbin_bag.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "carbin_bag"
                                                        )
                                                    }
                                                ></input>
                                                {dirty &&
                                                carbin_bag.err === "*" ? (
                                                    <FormError err="Carbin baggage cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Hành lý ký gửi</label>
                                                <input
                                                    required
                                                    name="checkin_bag"
                                                    className="form-control"
                                                    value={checkin_bag.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "checkin_bag"
                                                        )
                                                    }
                                                ></input>
                                                {dirty &&
                                                checkin_bag.err === "*" ? (
                                                    <FormError err="Checkin baggage cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Giá vé</label>
                                                <input
                                                    required
                                                    name="price"
                                                    className="form-control"
                                                    value={price.value}
                                                ></input>
                                                {dirty && price.err === "*" ? (
                                                    <FormError err="Price cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Thuế phí</label>
                                                <input
                                                    required
                                                    name="tax"
                                                    className="form-control"
                                                    value={tax.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "tax"
                                                        )
                                                    }
                                                ></input>
                                                {dirty && tax.err === "*" ? (
                                                    <FormError err="Tax cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
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
export default AddNewTicket;
