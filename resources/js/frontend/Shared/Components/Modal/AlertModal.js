import React from "react";
import { Component } from "react";

class AlertModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onAccept = () => {
        const { id } = this.props;
        this.props.onConfirm(id);
    };

    render() {
        const { title, message, id } = this.props;
        return (
            <div>
                <div
                    className="modal fade text-left"
                    id={`alertModal${id}`}
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="myModalLabel120"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header bg-danger">
                                <h5
                                    className="modal-title white"
                                    id="myModalLabel120"
                                >
                                    {title}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i data-feather="x" />
                                </button>
                            </div>
                            <div className="modal-body">{message}</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light-secondary"
                                    data-dismiss="modal"
                                >
                                    <i className="bx bx-x d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                        Close
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={this.onAccept}
                                    className="btn btn-danger ml-1"
                                    data-dismiss="modal"
                                >
                                    <i className="bx bx-check d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                        Accept
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AlertModal;
