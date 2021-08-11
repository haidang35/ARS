import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import FlightService from "./Shared/FlightService";
import AirlineService from "../Airline/Shared/AirlineService";

class Flight extends Form {
    constructor(props) {
        super(props);
        this.state = {
            destinationList:[],
            flightList: [],
            airlineList:[],
            form:this._getInitFormData({
                flight_code:"",
                departure_datetime:"",
                arrival_datetime:"",
                aircraft:"",
                airlineName:"",
                departureCity:"",
                destinationCity:"",
                capacity:"",
                seats_reserved:"",
                seats_available:""
            }),
            onAdd:false
        };
    }

    componentDidMount() {
        this.getFlightList();
    }

    getFlightList = () => {
        FlightService.getFlightList()
            .then((res) => {
                this.setState({
                    flightList: res.data,
                });
            })
            .catch((err) => {});
    };

    getAirlineList = ()=>{

    }
    addFlight=(data)=>{
        FlightService.addNewFlight(data)
            .then((res)=>{
                this.getFlightList();
            })
    }

    render() {
        const { flightList } = this.state;
        console.log(flightList);
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Danh sách các chuyến bay
                            </h4>
                            <div className="float-right">
                                <button 
                                    className="btn btn-primary"
                                >Add new flight</button>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên chuyến bay</th>
                                                <th>Thời gian khởi hành</th>
                                                <th>Ngày khởi hành</th>
                                                <th>Điểm khởi hành</th>
                                                <th>Điểm đến</th>
                                                <th>Loại máy bay</th>
                                                <th>Hãng hàng không</th>
                                                <th>Sức chứa</th>
                                                <th>Chỗ ngồi đã được đặt</th>
                                                <th>Chỗ ngồi trống</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flightList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.flight_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.departure_datetime
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.arrival_datetime
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.departure.city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.destination.city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.aircraft}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airline.airline_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.capacity}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.seats_reserved}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.seats_available}
                                                        </td>
                                                        <td>
                                                            <Link 
                                                                to={`/admin/flights/${item.id}`}
                                                            >
                                                                <button className="btn btn-primary">
                                                                    View
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
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

export default Flight;
