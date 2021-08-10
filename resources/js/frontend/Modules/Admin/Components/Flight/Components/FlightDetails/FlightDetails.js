
import React, {Component} from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import FlightService from "../../Shared/FlightService";
import "../FlightDetails.scss";
class FlightDetails extends Form{
   constructor(props){
       super(props);
       this.state={
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
               seats_available:"",
           }),
           onEdit:false
       }
   }

   componentDidMount(){
       this.getFlightDetails();
   }

   getFlightDetails=()=>{
       const {id} = this.props.match.params;
       FlightService.getFlightDetails(id)
        .then((res)=>{
            this._fillForm({
                flight_code:res.data.flight_code,
                departure_datetime:res.data.departure_datetime,
                arrival_datetime:res.data.arrival_datetime,
                aircraft:res.data.aircraft,
                airline_id:res.data.airline_id,
                departure_id:res.data.departure_id,
                destination_id:res.data.destination_id,
                capacity:res.data.capacity,
                seats_reserved:res.data.seats_reserved,
                seats_available:res.data.seats_available,
            })
           
        })

   }
   onEditInfo=()=>{
        this.setState({
            onEdit:true
        })
   }

   onCancelEdit=()=>{
       this.setState({
           onEdit:false
       })
   }

   onSaveChangeInfo=()=>{
        this._validateForm();
        this.state.form["dirty"] = true;
        const {id} = this.props.match.params;
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
            FlightService.updateFlightInfo(id,data)
                .then((res)=>{
                    console.log(res.data);
                })
            this.setState({
                onEdit:false
            })
        }
       
   }
    render(){
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
        const {onEdit} = this.state;
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Chi tiết chuyến bay
                            </h4>
                        </div>
                        <div>
                            <h5 style={{marginLeft:"40px", marginTop:"10px", fontSize:"16px"}}>Khứ hồi</h5>
                        </div>
                      <hr/>
                      <div>
                            {!onEdit ? (
                                <button 
                                    style={{marginLeft:"1100px"}}
                                    className="btn btn-primary"
                                    onClick={this.onEditInfo}
                                > Edit</button>
                               
                            ):(
                                <div style={{marginBottom:"20px"}}>
                                    <button 
                                        style={{marginLeft:"1000px"}}
                                        className="btn btn-success"
                                        onClick={this.onSaveChangeInfo}
                                    > Save</button>
                                    <button 
                                        style={{marginLeft:"1rem"}}
                                        className="btn btn-warning"
                                        onClick={this.onCancelEdit}
                                    > Cancel</button>
                                </div>
                            )}
                      </div>
                        <div className="row">
                            <div className="col-md-4 col-12" style={{marginLeft:"20px",width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Khởi hành</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm khởi hành
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    required
                                                                    disabled={!onEdit}
                                                                    name="departure_id"
                                                                    value={departure_id.value}
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"departure_id"
                                                                    )}
                                                                />
                                                                {departure_id.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Departure cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="departure_id"
                                                                    value={departure_id.value}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày khởi hành
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="departure_datetime"
                                                                    value={departure_datetime.value}
                                                                    required
                                                                    disabled={!onEdit} 
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"departure_datetime"
                                                                    )}
                                                                />
                                                                {departure_datetime.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Departure datetime cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ khởi hành
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                                                
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Điểm đến</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                            {/* style={{width:"96%",marginLeft:"30px"}} */}
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm đến
                                                                </span>
                                                                <input
                                                                // style={{height:"38px"}}
                                                                    type="text"
                                                                    className="form-control"
                                                                    required
                                                                    disabled={!onEdit}
                                                                    name="destination_id"
                                                                    value={destination_id.value}
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"destination_id"
                                                                    )}
                                                                />
                                                                {destination_id.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Destination cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                              
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="departure_id"
                                                                    value={departure_id.value}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày đến
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="arrival_datetime"
                                                                    value={arrival_datetime.value}
                                                                    required
                                                                    disabled={!onEdit}
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"arrival_datetime"
                                                                    )}
                                                                />
                                                                {arrival_datetime.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Arrival datetime cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                              
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ đến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Chuyến bay</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Tên hãng
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="airline_id"
                                                                    value={airline_id.value}
                                                                    required
                                                                    disabled={!onEdit}
                                                                 
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"airline_id"
                                                                    )}
                                                                />
                                                                {airline_id.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Airline name cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                              
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Mã chuyến
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="flight_code"
                                                                    value={flight_code.value}
                                                                    required
                                                                    disabled={!onEdit}
                                                                  
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"flight_code"
                                                                    )}
                                                                />
                                                                {flight_code.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Flight code cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                            
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Aircraft
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="aircraft"
                                                                    value={aircraft.value}
                                                                    required
                                                                    disabled={!onEdit}
                                                                  
                                                                    onChange={(ev) => this._setValue(
                                                                        ev,"aircraft"
                                                                    )}
                                                                />
                                                                {aircraft.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Aircraft cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                              
                                                            </div>
                                                        </div>
                                                    
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <section id="multiple-column-form" style={{marginLeft:"-13px"}}>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-md-4" >
                                                    <div className="form-group"> 
                                                        <label htmlFor="first-name-column">Sức chứa</label>
                                                        <input
                                                            type="text"
                                                            id="first-name-column"
                                                            className="form-control"
                                                            name="capacity"
                                                            value={capacity.value}
                                                            required
                                                            disabled={!onEdit}
                                                         
                                                            onChange={(ev) => this._setValue(
                                                                ev,"capacity"
                                                            )}
                                                        />
                                                        {capacity.err == "*" && dirty ? (
                                                            <FormError
                                                                err={"Capacity cannot be empty"}
                                                            />
                                                        ):(
                                                            ""
                                                        )}
                                                      
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi đã đặt trước</label>
                                                        <input
                                                            type="text"
                                                            id="country-floating"
                                                            className="form-control"
                                                            name="seats_reserved"
                                                            value={seats_reserved.value}
                                                            required
                                                            disabled={!onEdit}
                                                          
                                                            onChange={(ev) => this._setValue(
                                                                ev,"seats_reserved"
                                                            )}
                                                        />
                                                        {seats_reserved.err == "*" && dirty ? (
                                                            <FormError
                                                                err={"Seat reserved cannot be empty"}
                                                            />
                                                        ):(
                                                            ""
                                                        )}
                                                      
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi trống</label>
                                                        <input
                                                            type="text"
                                                            id="country-floating"
                                                            className="form-control"
                                                            name="seats_available"
                                                            value={seats_available.value}
                                                            required
                                                            disabled={!onEdit}
                                                        
                                                            onChange={(ev) => this._setValue(
                                                                ev,"seats_available"
                                                            )}
                                                        />
                                                        {seats_available.err == "*" && dirty ? (
                                                            <FormError
                                                                err={"Seat available cannot be empty"}
                                                            />
                                                        ):(
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        </div>
                    </div>
                </div>
            </div>     
        )
    }
}

export default FlightDetails;