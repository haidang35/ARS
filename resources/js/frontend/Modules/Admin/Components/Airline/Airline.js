import React from "react";
import { Component } from "react";
import AirlineService from "./Shared/AirlineService";

class Airline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airlineList: [],
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

    render() {
        const { airlineList } = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Danh sách các hãng hàng không đang hợp tác
                            </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên hãng hàng không</th>
                                                <th>Mã hãng hàng không</th>
                                                <th>Quốc gia</th>
                                                <th>Website</th>
                                                <th>Đường dây nóng</th>
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
                                                            {/* <Link to="/admin/airlines/:id"></Link> */}
                                                            <button className="btn btn-btn-primary">View</button>
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

export default Airline;
