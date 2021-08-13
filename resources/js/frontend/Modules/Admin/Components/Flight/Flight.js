import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import FlightService from "./Shared/FlightService";
import AirlineService from "../Airline/Shared/AirlineService";
import DestinationService from "../Destination/Shared/DestinationService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess"; 
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
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
                airline_id:"",
                departure_id:"",
                destination_id:"",
                capacity:"",
                seats_reserved:"",
                seats_available:""
            }),
            onAdd:false,
            message:"",
            errorMessage:""
        };
    }

    componentDidMount() {
        this.getFlightList();
        this.getDestinationList();
        this.getAirlineList();
       
    }

    getFlightList = () => {
        FlightService.getFlightList()
            .then((res) => {
                this.setState({
                    flightList: res.data
                });
            })
            .catch((err) => {});
    };

    getAirlineList = ()=>{
        AirlineService.getAirlineList()
            .then((res)=>{
                this.setState({
                    airlineList:res.data
                })
            })
    }

    getDestinationList=()=>{
        DestinationService.getDestinationList()
            .then((res)=>{
                this.setState({
                    destinationList:res.data
                })
            })
    }


    onCancelAdd=()=>{
        this.setState({
            onAdd:false
        })
        this._fillForm({
            flight_code:"",
            departure_datetime:"",
            arrival_datetime:"",
            aircraft:"",
            airline_id:"",
            departure_id:"",
            destination_id:"",
            capacity:"",
            seats_reserved:"",
            seats_available:"",
            dirty:false
        })
        this.getFlightList();
    }

    onAddFlight=()=>{
        this.setState({
            onAdd:true
        })
    }

    onSubmitInfo=()=>{
        this._validateForm();
        this.state.form["dirty"] = true;
        if(this._isFormValid()){
            const {form} = this.state;
            const data = {
                flight_code:form.flight_code.value,
                departure_datetime:form.departure_datetime.value,
                arrival_datetime:form.arrival_datetime.value,
                aircraft:form.aircraft.value,
                airline_id:form.airline_id.value,
                departure_id:form.departure_id.value,
                destination_id:form.destination_id.value,
                capacity:form.capacity.value,
                seats_reserved:form.seats_reserved.value,
                seats_available:form.seats_available.value

            }
            FlightService.addNewFlight(data)
                .then((res)=>{
                    this.getFlightList();
                    this._fillForm({
                        flight_code:"",
                        departure_datetime:"",
                        arrival_datetime:"",
                        aircraft:"",
                        airline_id:"",
                        departure_id:"",
                        destination_id:"",
                        capacity:"",
                        seats_reserved:"",
                        seats_available:"",
                        dirty:false
                    })
                    this.setState({
                        message:`Create successfully flight with code ${res.data.flight_code}`
                    })
                })
                .catch((err)=>{
                    this.setState({
                        errorMessage:"Create flight failed"
                    })
                })
                this.setState({
                    onAdd:false
                })
        }
    }

    render() {
        const { flightList, airlineList, destinationList,message,errorMessage} = this.state;
        const {
            flight_code,
            departure_datetime,
            arrival_datetime,
            aircraft,
            airline_id,
            departure_id,
            destination_id,
            capacity,
            seats_reserved,
            seats_available,
            dirty
        } = this.state.form;
        const {onAdd} = this.state;
        
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
                <AlertSuccess message={this.state.message}/>
                <AlertDanger message={this.state.errorMessage}/>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            {!onAdd ? (
                                <h4 className="card-title">
                                    Danh sách các chuyến bay
                                </h4>
                            ):(
                                <h4 className="card-title" style={{marginLeft:"20px"}}>
                                    Thêm chuyến bay
                                </h4>
                            )}
                           
                            <div className="float-right">
                                {!onAdd ? (
                                     <button 
                                        style={{marginRight:"20px"}}
                                        onClick={this.onAddFlight}
                                        className="btn btn-primary"
                                    >Add new flight</button>
                                ):(
                                    <div>
                                        <button className="btn btn-success"
                                            style={{marginRight:"40px"}}
                                            onClick={this.onSubmitInfo}
                                        >Submit</button>
                                        <button className="btn btn-warning"
                                            style={{marginRight:"20px"}}
                                            onClick={this.onCancelAdd}
                                        >Cancel</button>
                                    </div>
                                )}
                               
                            </div>
                        </div>
                        {!onAdd ? (
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
                                                <th></th>
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
                                                                <button
                                                                    className="btn btn-primary"
                                                                    style={{float:"right"}}
                                                                >
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
                        ):(
                            ""
                        )}
                        

                        {onAdd ? (
                            <div style={{padding:"40px"}}>
                                <div className="row">
                                    <div className="col-sm-6" style={{paddingRight:"20px"}}>
                                        <div>
                                            <label>Điểm khởi hành</label>
                                            <select
                                                name="departure_id"
                                                required
                                                className="form-control"
                                                value={departure_id.value}
                                                onChange={(ev) => this._setValue(ev, "departure_id")}
                                            >
                                                <option>Select departure city</option>
                                                {destinationList.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {item.city}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty && departure_id.err === "*" ? (
                                                <FormError err="Departure city cannot be empty" />
                                            ) : dirty? (
                                                <FormError err="Departure city cannot be empty" />
                                            ):(
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-6" style={{paddingLeft:"20px"}}>
                                        <div>
                                            <label>Thời gian khởi hành</label>
                                            <input
                                                type="date"
                                                name="departure_datetime"
                                                required
                                                className="form-control"
                                                value={departure_datetime.value}
                                                onChange={(ev) =>
                                                    this._setValue(ev, "departure_datetime")
                                                }
                                            />
                                            {dirty && departure_datetime.err === "*" ? (
                                                <FormError err="Departure time cannot be empty" />
                                            ) : dirty ?(
                                                <FormError err="Departure time cannot be empty" />
                                            ):(
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop:"20px"}}>
                                    <div className="col-sm-6" style={{paddingRight:"20px"}}>
                                        <div>
                                            <label>Điểm đến</label>
                                        
                                            <select
                                                type="text"
                                                required
                                                className="form-control"
                                                name="destination_id"
                                                value={destination_id.value}
                                                onChange={(ev) =>
                                                    this._setValue(ev, "destination_id")
                                                }
                                            >
                                                <option>Select destination city</option>
                                                {destinationList.map((item)=> {
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {item.city}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {dirty && destination_id.err === "*" ? (
                                                <FormError err="Destination city cannot be empty" />
                                            ) : dirty?(
                                                <FormError err="Destination city cannot be empty" />
                                            ):(
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-6" style={{paddingLeft:"20px"}}>
                                        <div>
                                            <label>Thời gian đến</label>
                                            <input
                                                type="date"
                                                name="arrival_datetime"
                                                required
                                                className="form-control"
                                                value={arrival_datetime.value}
                                                onChange={(ev) => this._setValue(ev, "arrival_datetime")}
                                            ></input>
                                            {dirty && arrival_datetime.err === "*" ? (
                                                <FormError err="Arrival time cannot be empty" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-sm-6" style={{paddingRight:"20px"}}>
                                <div>
                                    <label>Tên hãng</label>
                                    <select
                                        required
                                        name="airline_id"
                                        className="form-control"
                                        value={airline_id.value}
                                        onChange={(ev) => this._setValue(ev, "airline_id")}
                                    >
                                        <option>Select airline name</option>
                                        {airlineList.map((item)=>{
                                            return (
                                                 <option key={item.id} value={item.id}>
                                                    {item.airline_name}
                                                </option>
                                            );
                                               
                                        })}
                                    </select>
                                     {dirty && airline_id.err === "*" ? (
                                        <FormError err="Airline name cannot be empty" />
                                    ) : dirty ?(
                                        <FormError err="Airline name cannot be empty" />
                                    ):(
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6" style={{paddingLeft:"20px"}}>
                                <div>
                                    <label>Mã chuyến</label>
                                    <input
                                       required
                                        name="flight_code"
                                        className="form-control"
                                        value={flight_code.value}
                                        onChange={(ev) => this._setValue(ev, "flight_code")}
                                    ></input>
                                     {dirty && flight_code.err === "*" ? (
                                        <FormError err="Flight code cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            </div>

                            <div className="row" style={{marginTop:"20px"}}>
                                <div className="col-sm-6" style={{paddingRightt:"20px"}}>
                                    <div>
                                        <label>Loại máy bay</label>
                                        <input
                                        required
                                            name="aircraft"
                                            className="form-control"
                                            value={aircraft.value}
                                            onChange={(ev) => this._setValue(ev, "aircraft")}
                                        ></input>
                                        {dirty && aircraft.err === "*" ? (
                                            <FormError err="Aircraft cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6" style={{paddingLeft:"20px"}}>
                                    <div>
                                        <label>Sức chứa</label>
                                        <input
                                        required
                                            name="capacity"
                                            className="form-control"
                                            value={capacity.value}
                                            onChange={(ev) => this._setValue(ev, "capacity")}
                                        ></input>
                                        {dirty && capacity.err === "*" ? (
                                            <FormError err="Capacity cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                           <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-sm-6" style={{paddingRight:"20px"}}>
                                    <div>
                                        <label>Chỗ ngồi đã đặt trước</label>
                                        <input
                                        required
                                            name="seats_reserved"
                                            className="form-control"
                                            value={seats_reserved.value}
                                            onChange={(ev) => this._setValue(ev, "seats_reserved")}
                                        ></input>
                                        {dirty && seats_reserved.err === "*" ? (
                                            <FormError err="Seats reserved cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6" style={{paddingLeft:"20px"}}>
                                    <div>
                                        <label>Chỗ ngồi trống</label>
                                        <input
                                        required
                                            name="seats_available"
                                            className="form-control"
                                            value={seats_available.value}
                                            onChange={(ev) => this._setValue(ev, "seats_available")}
                                        ></input>
                                        {dirty && seats_available.err === "*" ? (
                                            <FormError err="Seats available cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        ):(
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Flight;
