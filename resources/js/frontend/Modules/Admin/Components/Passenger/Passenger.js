import React from "react";
import { Component } from "react";
import PassengerService from "./Shared/PassengerService";

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
                                                <th>Quý danh</th>
                                                <th>Địa chỉ </th>
                                                <th>Loại hành khách </th>
                                                <th>Mã chuyến bay </th>
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
                                                            {item.vocative}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.address}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.passenger_type == 1 ? "Người lớn" : item.passenger_type == 2 ? "Trẻ em" : "Em bé sơ sinh" } 
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight.flight_code}
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
