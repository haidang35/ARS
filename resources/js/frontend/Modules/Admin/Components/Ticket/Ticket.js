import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import TicketService from "./Shared/TicketService";
import FlightService from "../Flight/Shared/FlightService";

class Ticket extends Form {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            flightList: [],
            form:this._getInitFormData({
                flightId:"",
                ticket_type:"",
                available_class:"",
                status:"",
                carbin_bag:"",
                checkin_bag:"",
                price:"",
                tax:""
            }),
            onAdd:false
        };
    }

    componentDidMount() {
        this.getTicketList();
        this.getFlightList();
    }

    getTicketList = () => {
        TicketService.getTicketList().then((res) => {
            this.setState({
                ticketList: res.data,
            });
        });
    };

    getFlightList=()=>{
        FlightService.getFlightList()
            .then((res)=>{
                this.setState({
                    flightList:res.data
                })
            })
    }

    onAddTicket=()=>{
        this.setState({
            onAdd:true
        })
    }

    onCancelAdd=()=>{
        this.setState({
            onAdd:false,
        })
        this._fillForm({
            flightId:"",
            ticket_type:"",
            available_class:"",
            status:"",
            carbin_bag:"",
            checkin_bag:"",
            price:"",
            tax:"",
            dirty:false
        });
    }

    onSubmitInfo=()=>{
        this._validateForm();
        this.state.form["dirty"] = true;
        if(this._isFormValid()){
            const {form} = this.state;
            const data = {
                flight_id:form.flightId.value,
                ticket_type:form.ticket_type.value,
                available_class:form.available_class.value,
                status:form.status.value,
                carbin_bag:form.carbin_bag.value,
                checkin_bag:form.checkin_bag.value,
                price:form.price.value,
                tax:form.tax.value
            }
            TicketService.addNewTicket(data)
                .then((res)=>{
                    this.getTicketList();
                    this._fillForm({
                        flightId:"",
                        ticket_type:"",
                        available_class:"",
                        status:"",
                        carbin_bag:"",
                        checkin_bag:"",
                        price:"",
                        tax:"",
                        dirty:false
                    })
            
                });
                this.setState({
                    onAdd:false
                })
          
        }
    }

    render() {
        const {
            flightId,
            ticket_type,
            available_class,
            status,
            carbin_bag,
            checkin_bag,
            price,
            tax,
            dirty
        } = this.state.form;
        const { ticketList } = this.state;
        const {flightList} = this.state;
        const {onAdd} = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            {!onAdd ? (
                                <h4 className="card-title">Danh sách vé máy bay</h4>
                            ):(
                                <h4 className="card-title">Thêm vé máy bay</h4>
                            )}
                           
                            <div className="float-right">
                                {!onAdd ? (
                                    <button
                                    className="btn btn-primary"
                                    onClick={this.onAddTicket}
                                    >
                                    Add new ticket
                                    </button>
                                ):(
                                    <div>
                                        <button
                                            style={{marginRight:"20px"}}
                                            className="btn btn-success"
                                            onClick={this.onSubmitInfo}

                                        >
                                            Submit
                                        </button>
                                        <button 
                                            className="btn btn-warning"
                                            onClick={this.onCancelAdd}
                                        >
                                            Cancel
                                        </button>
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
                                                <th>Chuyến bay</th>
                                                <th>Loại máy bay</th>
                                                <th>Hạng ghế có sẵn</th>
                                                <th>Trạng thái</th>
                                                <th>Hành lý xách tay tối đa</th>
                                                <th>Hành lý ký gửi tối đa</th>
                                                <th>Giá vé</th>
                                                <th>Thuế</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketList.map((item) => {
                                                return (
                                                    <tr>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.flight
                                                                    .flight_code
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.ticket_type
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.available_class
                                                            }
                                                        </td>
                
                                                        <td className="text-bold-500">
                                                            {
                                                                item.status == 1 ? "Khởi hành đúng giờ" : "Bị hoãn"
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.carbin_bag
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.checkin_bag
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.price
                                                            }
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {
                                                                item.tax
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link to={`/admin/tickets/${item.id}`}>
                                                                <button className="btn btn-primary">View</button>
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
                        ):(
                            ""
                        )}

                        {onAdd ? (
                            <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Chuyến bay</label>
                                    <select
                                        name="flightId"
                                        required
                                        className="form-control"
                                        value={flightId.value}
                                        onChange={(ev) => this._setValue(ev, "flightId")}
                                    >
                                        <option>Select flight code</option>
                                        {flightList.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.flight_code}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {dirty && flightId.err === "*" ? (
                                        <FormError err="Flight code cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Loại vé</label>
                                    <input
                                        type="text"
                                        name="ticket_type"
                                        required
                                        className="form-control"
                                        value={ticket_type.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "ticket_type")
                                        }
                                    />
                                    {dirty && ticket_type.err === "*" ? (
                                        <FormError err="Ticket type cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Hạng ghế có sẵn</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="available_class"
                                        value={available_class.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "available_class")
                                        }
                                    />
                                    {dirty && available_class.err === "*" ? (
                                        <FormError err="Available class cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Trạng thái</label>
                                    <input
                                        name="status"
                                        required
                                        className="form-control"
                                        value={status.value}
                                        onChange={(ev) => this._setValue(ev, "status")}
                                    ></input>
                                    {dirty && status.err === "*" ? (
                                        <FormError err="Status cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Hành lý xách tay</label>
                                    <input
                                       required
                                        name="carbin_bag"
                                        className="form-control"
                                        value={carbin_bag.value}
                                        onChange={(ev) => this._setValue(ev, "carbin_bag")}
                                    ></input>
                                     {dirty && carbin_bag.err === "*" ? (
                                        <FormError err="Carbin baggage cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Hành lý ký gửi</label>
                                    <input
                                       required
                                        name="checkin_bag"
                                        className="form-control"
                                        value={checkin_bag.value}
                                        onChange={(ev) => this._setValue(ev, "checkin_bag")}
                                    ></input>
                                     {dirty && checkin_bag.err === "*" ? (
                                        <FormError err="Checkin baggage cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Giá vé</label>
                                    <input
                                       required
                                        name="price"
                                        className="form-control"
                                        value={price.value}
                                        onChange={(ev) => this._setValue(ev, "price")}
                                    ></input>
                                     {dirty && price.err === "*" ? (
                                        <FormError err="Price cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Thuế phí</label>
                                    <input
                                       required
                                        name="tax"
                                        className="form-control"
                                        value={tax.value}
                                        onChange={(ev) => this._setValue(ev, "tax")}
                                    ></input>
                                     {dirty && tax.err === "*" ? (
                                        <FormError err="Tax cannot be empty" />
                                    ) : (
                                        ""
                                    )}
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

export default Ticket;
