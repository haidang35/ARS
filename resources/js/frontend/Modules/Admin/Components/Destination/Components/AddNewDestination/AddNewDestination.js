import React, { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
class AddNewDestination extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                city:"",
                province:"",
                airport_code:"",
                airport_name:"",
                country_code:"",
                country:""
            })
        };
    }

    
    onSubmitInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                city:form.city.value,
                province:form.province.value,
                airport_code:form.airport_code.value,
                airport_name:form.airport_name.value,
                country_code:form.country_code.value,
                country:form.country.value
            };
            this.props.onSubmit(data);
            this._fillForm({
                city:"",
                province:"",
                airport_code:"",
                airport_name:"",
                country_code:"",
                country:"",
                dirty:false
            })
        }
      
    };

    onCloseAdd=()=>{
        this.props.onClose();
    }

    render() {
        const {
            city,
            province,
            airport_code,
            airport_name,
            country_code,
            country,
            dirty
        } = this.state.form;
        return (
            <div>
                <div
                    className="modal fade"
                    id="addNewDestination"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalFormTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalFormTitle"
                                >
                                    Add new destination
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={this.onCloseAdd}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Thành phố
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            className="form-control"
                                            value={city.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "city")
                                            }
                                        />
                                        {city.err === "*" && dirty ? (
                                            <FormError err="City cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Tỉnh
                                        </label>
                                        <input
                                            type="text"
                                            name="province"
                                            className="form-control"
                                            required
                                            value={province.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "province")
                                            }
                                        />
                                        {province.err == "*" && dirty ? (
                                            <FormError err="Province cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Mã sân bay
                                        </label>
                                        <input
                                            type="text"
                                            name="airport_code"
                                            className="form-control"
                                            required
                                            value={airport_code.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "airport_code")
                                            }
                                        />
                                         {airport_code.err == "*" && dirty ? (
                                            <FormError err="Airport code cannot be empty" />
                                        ) :(
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Tên sân bay
                                        </label>
                                        <input
                                            name="airport_name"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            value={airport_name.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "airport_name")
                                            }
                                        ></input>
                                         {airport_name.err == "*" && dirty ? (
                                            <FormError err="Airport name cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Mã quốc gia
                                        </label>
                                        <input
                                            name="country_code"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            value={country_code.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "country_code")
                                            }
                                        ></input>
                                         {country_code.err =="*" && dirty ? (
                                            <FormError err="Country code cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Quốc gia
                                        </label>
                                        <input
                                            name="country"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            value={country.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "country")
                                            }
                                        ></input>
                                         {country.err == "*" && dirty ? (
                                            <FormError err="Country cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-pill"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-pill"
                                    onClick={this.onSubmitInfo}
                                    data-dismiss=
                                    {this._isFormValid ? "modal" : ""}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewDestination;
