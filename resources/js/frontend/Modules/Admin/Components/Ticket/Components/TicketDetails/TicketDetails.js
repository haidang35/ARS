import React, {Component} from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import TicketService from "../../Shared/TicketService";
class TicketDetails extends Form{
   constructor(props){
       super(props);
       this.state={
           form:this._getInitFormData({
                flightCode:"",
                ticket_type:"",
                available_class:"",
                status:"",
                carbin_bag:"",
                checkin_bag:"",
                price:"",
                tax:""
           }),
           onEdit:false
       }
   }

   componentDidMount(){
       this.getTicketDetails();
   }

   getTicketDetails = () =>{
       const {id} = this.props.match.params;
        TicketService.getTicketDetails(id)
            .then((res)=>{
                this._fillForm({
                    flightCode:res.data.flight.flight_code,
                    ticket_type:res.data.ticket_type,
                    available_class:res.data.available_class,
                    status:res.data.status,
                    carbin_bag:res.data.carbin_bag,
                    checkin_bag:res.data.checkin_bag,
                    price:res.data.price,
                    tax:res.data.tax
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
       this.getTicketDetails();
   }

   onSaveChangeInfo=()=>{
        this._validateForm();
        this.state.form["dirty"] = true;
        const {id} = this.props.match.params;
        if(this._isFormValid()){
            const {form} = this.state;
            const data = {
                flightCode:form.flightCode.value,
                ticket_type:form.ticket_type.value,
                available_class:form.available_class.value,
                status:form.status.value,
                carbin_bag:form.carbin_bag.value,
                checkin_bag:form.checkin_bag.value,
                price:form.price.value,
                tax:form.tax.value
            }
            TicketService.updateTicketInfo(id,data)
                .then((res)=>{
                    this._fillForm({
                        flightCode:"",
                        ticket_type:"",
                        available_class:"",
                        status:"",
                        carbin_bag:"",
                        checkin_bag,
                        price:"",
                        tax:"",
                        dirty:false
                    })
                    console.log(res.data);
                })
                this.setState({
                onEdit:false
                }) 
            } 
   }

    render(){
        const {
            flightCode,
            ticket_type,
            available_class,
            status,
            carbin_bag,
            checkin_bag,
            price,
            tax,
            dirty
        } = this.state.form;
        const {onEdit} =this.state;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">
                            Thông tin chi tiết của vé máy bay
                        </h4>
                        <div className="float-right">
                            {!onEdit ? (
                                <button
                                    onClick={this.onEditInfo}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={this.onSaveChangeInfo}
                                        className="btn btn-success"
                                        style={{
                                            marginLeft: "1rem",
                                            marginRight: "1rem",
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={this.onCancelEdit}
                                        className="btn btn-warning"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <section id="multiple-column-form">
                        <div className="row match-height">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form className="form">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="first-name-column">
                                                                Chuyến bay
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                disabled
                                                                value={
                                                                    flightCode.value
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="first-name-column">
                                                                Loại vé máy bay
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="ticket_type"
                                                                value={
                                                                    ticket_type.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "ticket_type"
                                                                    )
                                                                }
                                                            />
                                                             {ticket_type.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Ticket type cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="last-name-column">
                                                                Hạng ghế có sẵn
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="last-name-column"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="available_class"
                                                                value={
                                                                    available_class.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "available_class"
                                                                    )
                                                                }
                                                            />
                                                            {available_class.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Available class cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="city-column">
                                                                Trạng thái
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="status"
                                                                value={
                                                                    status.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "status"
                                                                    )
                                                                }
                                                            />
                                                            {status.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Status cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="country-floating">
                                                                Hành lý xách tay
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="carbin_bag"
                                                                value={
                                                                    carbin_bag.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "carbin_bag"
                                                                    )
                                                                }
                                                            />
                                                            {carbin_bag.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Carbin baggage cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="company-column">
                                                                Hành lý ký gửi
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="company-column"
                                                                required
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="checkin_bag"
                                                                value={
                                                                    checkin_bag.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "checkin_bag"
                                                                    )
                                                                }
                                                            />
                                                            {checkin_bag.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Checkin baggage cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="company-column">
                                                                Giá vé
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="company-column"
                                                                required
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="price"
                                                                value={
                                                                    price.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "price"
                                                                    )
                                                                }
                                                            />
                                                            {price.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Price cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="company-column">
                                                                Thuế phí
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="company-column"
                                                                required
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="tax"
                                                                value={
                                                                    tax.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "tax"
                                                                    )
                                                                }
                                                            />
                                                            {tax.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Tax cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>     
        )
    }
}

export default TicketDetails;