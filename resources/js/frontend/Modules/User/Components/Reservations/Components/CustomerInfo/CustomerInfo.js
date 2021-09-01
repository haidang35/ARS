import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./CustomerInfo.scss";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import { data } from "jquery";

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: [],
            children: [],
            infants: [],
            isValid: false,
            updateData: true,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.onReservation && this.state.updateData) {
            nextProps.data[0].passenger.forEach((item) => {
                if (item.passenger_type == 1 && item.quantity > 0) {
                    let { adults } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                            identity_card: { value: "", err: "" },
                        };
                        adults.push(data);
                    }
                    this.setState({ adults });
                } else if (item.passenger_type == 2 && item.quantity > 0) {
                    let { children } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                        };
                        children.push(data);
                    }
                    this.setState({ children });
                } else if (item.passenger_type == 3 && item.quantity > 0) {
                    let { infants } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                        };
                        infants.push(data);
                    }
                    this.setState({ infants });
                }
            });
            this.setState({ updateData: false });
        }

        if (nextProps.onReservation == true) {
            this.onReservation();
        }
    };

    setValue = (ev, stateKey, id) => {
        const { name, value } = ev.target;
        if (stateKey == 1) {
            let { adults } = this.state;
            adults.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ adults });
        } else if (stateKey == 2) {
            let { children } = this.state;
            children.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ children });
        } else if (stateKey == 3) {
            let { infants } = this.state;
            infants.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ infants });
        }
        this.setState({ isValid: true });
    };

    validateForm = () => {
        let { adults, children, infants } = this.state;
        adults.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                    this.setState({ isValid: false });
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        children.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                    this.setState({ isValid: false });
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        infants.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                    this.setState({ isValid: false });
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        this.setState({ adults, children, infants });
    };

    isValidForm = () => {
        let { adults, children, infants } = this.state;
        let isValid = false;
        adults.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        children.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        infants.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        return isValid;
    };

    onReservation = () => {
        this.validateForm();
        if (this.isValidForm()) {
            let { adults, children, infants } = this.state;
            let data = [];
            if (adults.length > 0) {
                adults.forEach((item) => {
                    const itemData = {
                        id: Math.floor(Math.random() * 1000000),
                        passenger_name: item.name.value,
                        gender: item.gender.value,
                        birthday: item.birthday.value,
                        identity_card: item.identity_card.value,
                        passenger_type: 1,
                    };
                    data.push(itemData);
                });
            }
            if (children.length > 0) {
                children.forEach((item) => {
                    const itemData = {
                        id: Math.floor(Math.random() * 1000000),
                        passenger_name: item.name.value,
                        gender: item.gender.value,
                        birthday: item.birthday.value,
                        passenger_type: 2,
                    };
                    data.push(itemData);
                });
            }
            if (infants.length > 0) {
                infants.forEach((item) => {
                    const itemData = {
                        id: Math.floor(Math.random() * 1000000),
                        passenger_name: item.name.value,
                        gender: item.gender.value,
                        birthday: item.birthday.value,
                        passenger_type: 3,
                    };
                    data.push(itemData);
                });
            }
            this.props.getCustomerInfo(data);
        }
    };

    render() {
        const { data, onReservation } = this.props;
        const { adults, children, infants, isValid } = this.state;
        const passenger = [];
        if (Array.isArray(data) && data.length > 0) {
            data[0].passenger.forEach((item) => {
                if (item.quantity > 0) {
                    passenger.push(item);
                }
            });
        }
        let loop = 1;

        return (
            <div>
                <div className="customer-info">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Thông tin khách hàng
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="list-sub-title">
                            <div className="row">
                                <div className="col-md-2">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Khách hàng
                                    </Typography>
                                </div>
                                <div className="col-md-2">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Giới tính
                                    </Typography>
                                </div>
                                <div className="col-md-3">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Họ và tên
                                    </Typography>
                                </div>
                                <div className="col-md-3">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Ngày sinh
                                    </Typography>
                                </div>
                                <div className="col-md-2">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        CMND/CCCD
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="list-sub-content">
                            {adults.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Người lớn
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.name.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập họ và tên hành khách"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.birthday.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập ngày sinh"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-2">
                                                <input
                                                    type="text"
                                                    name="identity_card"
                                                    required
                                                    className="form-control"
                                                    value={
                                                        item.identity_card.value
                                                    }
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.identity_card.err ==
                                                    "*" && !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập CMND/CCCD"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data[0]
                                                                    .checkin_bag +
                                                                data[0]
                                                                    .carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {children.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Trẻ em
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.name.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập họ và tên"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.birthday.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập ngày sinh"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data.checkin_bag +
                                                                data.carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {infants.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Em bé
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.name.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập họ và tên"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.name.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Vui lòng nhập ngày sinh"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data.checkin_bag +
                                                                data.carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerInfo;
