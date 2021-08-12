import React, {Component} from "react";
import AirlineService from "../../../../Components/Airline/Shared/AirlineService";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../../../Shared/Components/Alert/AlertDanger";
class AirlineDetails extends Form {
    constructor(props){
        super(props);
        this.state = {
            form:this._getInitFormData({
                airline_name: "",
                code:"",
                country:"",
                website:"",
                hotline:""
            }),
            onEdit:false,
            message:"",
            updateMessage:"",
            errorMessage:""
        }
    }

    componentDidMount(){
        this.getAirlineDetails();
    }
    getAirlineDetails=()=>{
        const {id} = this.props.match.params;
        AirlineService.getAirlineDetails(id)
            .then((res)=>{
                this._fillForm({
                    airline_name:res.data.airline_name,
                    code:res.data.code,
                    country:res.data.country,
                    website:res.data.website,
                    hotline:res.data.hotline
                })
            });
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
        this.getAirlineDetails();
    }

    onSaveChangeInfo=()=>{
        const {id} = this.props.match.params;
        this._validateForm();
        this.state.form["dirty"] = true;
        if(this._isFormValid()){
            const {form} = this.state;
            const data = {
                airline_name:form.airline_name.value,
                code:form.code.value,
                country:form.country.value,
                website:form.website.value,
                hotline:form.hotline.value
            }
            AirlineService.updateAirlineInfo(id,data)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        updateMessage:`Update successfully ${res.data.airline_name} airline`
                    })
                })
                .catch((err)=>{
                    this.setState({
                        errorMessage:"Update airline failed"
                    })
                })
            this.setState({
                onEdit:false,
            
            })
        }
      
    }

    
    render(){
        const {
            airline_name,
            code,
            country,
            website,
            hotline,
            dirty
        } = this.state.form;
        const {onEdit} = this.state;
        const {updateMessage,errorMessage} = this.state;
        if (updateMessage.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    updateMessage: "",
                    errorMessage: "",
                });
            }, 5000);
        }
        return (
            <div>
                <AlertSuccess message={this.state.updateMessage}/>
                <AlertDanger message={this.state.errorMessage}/>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title" style={{marginLeft:"20px"}}>Thông tin chi tiết của hãng hàng không</h4>
                            <div className="float-right">
                            {!onEdit ? (
                                <button
                                    style={{marginRight:"20px"}}
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
                        <div className="introduduce-airline">
                            <section id="multiple-column-form">
                                <div className="row match-height">
                                    <div className="card-content">
                                        <div className="card-body" style={{padding:"44px"}}>
                                                <div className="row">
                                                    <div className="col-md-6"  style={{paddingRight:"20px"}}>
                                                        <div> 
                                                            <label htmlFor="first-name-column">Tên hãng hàng không</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                disabled = {!onEdit}
                                                                className="form-control"
                                                                name="airline_name"
                                                                value={airline_name.value}
                                                                onChange={(ev) => this._setValue(ev,"airline_name")}
                                                            />
                                                            {airline_name.err == "*" && dirty ? (
                                                                <FormError 
                                                                    err={"Airline name cannot be empty"}
                                                                />
                                                            ):(
                                                                ""
                                                            )}
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6"  style={{paddingLeft:"20px"}}>
                                                        <div> 
                                                            <label htmlFor="first-name-column">Mã hãng hàng không</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                disabled = {!onEdit}
                                                                className="form-control"
                                                                name="code"
                                                                value={code.value}
                                                                onChange={(ev) => this._setValue(ev,"code")}
                                                            />
                                                            {code.err == "*" && dirty ? (
                                                                <FormError 
                                                                    err={"Airline code cannot be empty"}
                                                                />
                                                            ):(
                                                                ""
                                                            )}
                                                            
                                                        </div>
                                                        </div>
                                                </div>
                                                <div className="row" style={{marginTop:"20px"}}>
                                                
                                                    <div className="col-md-6" style={{paddingRight:"20px"}}>
                                                        <div>
                                                            <label htmlFor="country-floating">Quốc gia</label>
                                                            <input
                                                                required
                                                                disabled = {!onEdit}
                                                                type="text"
                                                                className="form-control"
                                                                name="country"
                                                                value={country.value}
                                                                onChange={(ev) => this._setValue(ev,"country")}
                                                            />
                                                            {country.err == "*" && dirty ? (
                                                                <FormError 
                                                                    err={"Country cannot be empty"}
                                                                />
                                                            ):(
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6"  style={{paddingLeft:"20px"}}>
                                                        <div> 
                                                            <label htmlFor="first-name-column">Website</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                disabled = {!onEdit}
                                                                className="form-control"
                                                                name="website"
                                                                value={website.value}
                                                                onChange={(ev) => this._setValue(ev,"website")}
                                                            />
                                                            {website.err == "*" && dirty ? (
                                                                <FormError 
                                                                    err={"Website cannot be empty"}
                                                                />
                                                            ):(
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{marginTop:"20px"}}>
                                                <div className="col-md-6" style={{paddingRight:"20px"}}>
                                                        <div>
                                                            <label htmlFor="country-floating">Hotline</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                disabled = {!onEdit}
                                                                className="form-control"
                                                                name="hotline"
                                                                    value={hotline.value}
                                                                    onChange={(ev) => this._setValue(ev,"hotline")}
                                                                />
                                                                {hotline.err == "*" && dirty ? (
                                                                    <FormError 
                                                                        err={"Hotline cannot be empty"}
                                                                    />
                                                                ):(
                                                                    ""
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" style={{paddingLeft:"20px"}}>
                                                        <div>
                                                            <label htmlFor="country-floating">Description</label>
                                                            <textarea
                                                                style={{overflow:"hidden"}}
                                                                type="text"
                                                                disabled = {!onEdit}
                                                                className="form-control"
                                                                
                                                            >
                                                            </textarea>
                                                                
                                                        </div>
                                                    </div>
                                                </div>
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

export default AirlineDetails;