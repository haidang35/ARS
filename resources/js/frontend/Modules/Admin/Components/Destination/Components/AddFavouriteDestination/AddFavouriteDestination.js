import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";

class AddFavouriteDestination extends Form {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        };
    }

    handleChangeFile = (ev) => {
        if (ev.target.files && ev.target.files[0]) {
            this.setState({
                image: ev.target.files[0],
            });
        }
    };

    onSubmitImage = () => {
        const { image } = this.state;
        const { destinationId } = this.props;
        this.props.onSubmitImage(image, destinationId);
    };

    render() {
        const { destinationId } = this.props;
        return (
            <div>
                <div
                    className="modal fade"
                    id={`addFavouriteDesination${destinationId}`}
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
                                    Add favourite destination
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div
                                className="modal-body"
                                style={{ marginLeft: "-29px" }}
                            >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">
                                        Thêm hình ảnh
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        required
                                        className="form-control"
                                        onChange={this.handleChangeFile}
                                    />
                                </div>
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
                                    onClick={this.onSubmitImage}
                                    // data-dismiss={
                                    //     this._isFormValid() ? "modal" : ""
                                    // }
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
export default AddFavouriteDestination;
