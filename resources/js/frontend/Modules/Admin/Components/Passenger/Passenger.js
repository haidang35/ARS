import React from "react";
import { Component } from "react";
import PassengerService from "./Shared/PassengerService";
import {Link} from "react-router-dom";
class Passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passengerList: [],
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

    render() {
        const { passengerList } = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Danh sách hành khách đặt vé
                            </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên hành khách</th>
                                                <th>Giới tính</th>
                                                <th>Ngày sinh</th>
                                                <th>Số điện thoại</th>
                                                <th>Loại hành khách </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {passengerList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.passenger_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.gender}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.birthday}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.booking.contact_phone}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.passenger_type == 1 ? "Người lớn" : item.passenger_type == 2 ? "Trẻ em" : "Em bé sơ sinh" } 
                                                        </td>
                                                        <td className="text-bold-500">
                                                            <Link to={`/admin/bookings/${item.id}`}>
                                                                <button className="btn btn-primary" style={{marginRight:"-18px" , float:"right"}}>View</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
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
