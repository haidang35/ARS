import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
class AddNewAirline extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                airline_name: "",
                code: "",
                country: "",
                website: "",
                hotline: "",
            }),
            image: "",
        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }
    onSubmitInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        let formData = new FormData();
        formData.append("image", this.state.image, this.state.image.name);
        if (this._isFormValid()) {
            const { form } = this.state;
            formData.append("airline_name", form.airline_name.value);
            formData.append("code", form.code.value);
            formData.append("country", form.country.value);
            formData.append("website", form.website.value);
            formData.append("hotline", form.hotline.value);
            this.props.onSubmit(formData);
            this._fillForm({
                airline_name: "",
                code: "",
                country: "",
                website: "",
                hotline: "",
                dirty: false,
            });
            this.setState({
                image: "",
            });
        }
    };

    onCloseAdd = () => {
        this._fillForm({
            airline_name: "",
            code: "",
            country: "",
            website: "",
            hotline: "",
            dirty: false,
        });
    };

    handleUploadImage = (ev) => {
        if (ev.target.files && ev.target.files[0]) {
            let image = ev.target.files[0];
            this.setState({
                image,
            });
        }
    };

    render() {
        const { airline_name, code, country, website, hotline, dirty } =
            this.state.form;
        return (
            <div>
                <div
                    className="modal fade"
                    id="addNewAirline"
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
                                    Add new airline
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
                            <div
                                className="modal-body"
                                style={{ marginLeft: "-29px" }}
                            >
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Airline name
                                        </label>
                                        <input
                                            type="text"
                                            name="airline_name"
                                            required
                                            className="form-control"
                                            value={airline_name.value}
                                            onChange={(ev) =>
                                                this._setValue(
                                                    ev,
                                                    "airline_name"
                                                )
                                            }
                                        />
                                        {airline_name.err === "*" && dirty ? (
                                            <FormError err="Airline name cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Airline code
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            className="form-control"
                                            required
                                            value={code.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "code")
                                            }
                                        />
                                        {code.err == "*" && dirty ? (
                                            <FormError err="Airline code cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="form-control"
                                            required
                                            value={country.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "country")
                                            }
                                        />
                                        {country.err == "*" && dirty ? (
                                            <FormError err="Country cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Website
                                        </label>
                                        <input
                                            name="website"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={website.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "website")
                                            }
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Hotline
                                        </label>
                                        <input
                                            name="hotline"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            value={hotline.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "hotline")
                                            }
                                        ></input>
                                        {hotline.err == "*" && dirty ? (
                                            <FormError err="Hotline cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Hotline
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            onChange={this.handleUploadImage}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-pill"
                                    data-dismiss="modal"
                                    onClick={this.onCloseAdd}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-pill"
                                    onClick={this.onSubmitInfo}
                                    data-dismiss={
                                        this._isFormValid() ? "modal" : ""
                                    }
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
export default AddNewAirline;
