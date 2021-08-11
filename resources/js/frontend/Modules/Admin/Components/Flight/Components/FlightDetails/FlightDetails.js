
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
               airlineName:"",
               departureCity:"",
               destinationCity:"",
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
                airlineName:res.data.airline.airline_name,
                departureCity:res.data.departure.city,
                destinationCity:res.data.destination.city,
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
       this.getFlightDetails();
   }

   onSaveChangeInfo=()=>{
        const {form} = this.state;
        this._validateForm();
        this.state.form["dirty"] = true;
        const {id} = this.props.match.params;
        if(this._isFormValid()){
          
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
            console.log(data);
            FlightService.updateFlightInfo(id,data)
                .then((res)=>{
                    console.log(res.data);
                    this._fillForm({
                        flight_code:"",
                        departure_datetime:"",
                        arrival_datetime:"",
                        aircraft:"",
                        airlineName:"",
                        departureCity:"",
                        destinationCity:"",
                        capacity:"",
                        seats_reserved:"",
                        seats_available:"",
                        dirty:false
                    })
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
            airlineName,
            departureCity,
            destinationCity,
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
                                    style={{marginLeft:"1120px"}}
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
                                        style={{marginLeft:"32px"}}
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
                                                                    disabled
                                                                    value={departureCity.value}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="departure.airport_name"
                                                                    value={departure.airport_name.value}
                                                                />
                                                                 {departure.airport_name.err == "*" && dirty ? (
                                                                    <FormError
                                                                        err={"Departure airport name cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div> */}
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Thời gian khởi hành
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
                                                        {/* <div className="input-form">
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
                                                        </div> */}
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
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Điểm đến</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm đến
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    required
                                                                    disabled
                                                                    value={destinationCity.value}
                                                                  />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Thời gian đến
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
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Chuyến bay</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Tên hãng
                                                                </span>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={airlineName.value}
                                                                    disabled
                                                                />
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