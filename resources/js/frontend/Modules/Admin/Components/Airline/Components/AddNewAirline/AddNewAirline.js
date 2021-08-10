import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import AirlineService from "../../Shared/AirlineService";

class AddNewAirline extends Form{
    constructor(props){
        super(props);
        this.state={
            form:this._getInitFormData({
                airline_name:"",
                code:"",
                country:"",
                website:"",
                hotline:"",
            })
        }
    }

    onSubmitInfo=()=>{
        this._validateForm();
        this.state.form["dirty"] = true;
        if(this._isFormValid()){
            const {form} = this.state;
            const data = {
                airline_name:form.airline_name.value,
                code:form.code.value,
                country:form.country.value,
                website:form.website.value,
                hotline:form.hotline.value,
            }
            this.props.addAirline(data);
            this._fillForm({
                airline_name:"",
                code:"",
                country:"",
                website:"",
                hotline:"",
                dirty:""
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
        } = this.state.form;
        return (
            <div>{/**/}
                  <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">
                            Thêm điểm đến
                        </h4>
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
                                                                Thành phố
                                                            </label>
                                                            <input
                                                                type="text"
                                                                required
                                                                id="first-name-column"
                                                                className="form-control"
                                                                name="airline_name"
                                                                value={
                                                                    airline_name.value
                                                                }
                                                                
                                                            />
                                                            {airline_name.err == "*" &&
                                                            dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div>
                                                            <label htmlFor="first-name-column">
                                                                Tỉnh
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                              
                                                                name="code"
                                                                value={
                                                                    code.value
                                                                }
                                                               
                                                            />
                                                              {code.err == "*" &&
                                                            dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
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
                                                                Mã sân bay
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="last-name-column"
                                                                className="form-control"
                                                                required
                                                              
                                                                name="country"
                                                                value={
                                                                    country.value
                                                                }
                                                              
                                                            />
                                                            {country.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
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
                                                                Sân bay
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                required
                                                               
                                                                name="website"
                                                                value={
                                                                    website.value
                                                                }
                                                             
                                                            />
                                                            {website.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
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
                                                                Quốc gia
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                required
                                                                name="hotline"
                                                                value={
                                                                    hotline.value
                                                                }
                                                               
                                                            />
                                                            {hotline.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </form>
                                            <div className="float-right">
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={this.onSubmitInfo}
                                                >Submit</button>
                                            </div>
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

export default AddNewAirline;