import React, { Component } from "react";

class FormError extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { err } = this.props;
        const elmMessage =
            err.length > 0 ? (
                <div
                    style={{
                        color: "red",
                        fontSize: "16px",
                        marginTop: "10px",
                        fontStyle: "italic",
                    }}
                >
                    {err}
                </div>
            ) : (
                ""
            );
        return <div>{elmMessage}</div>;
    }
}

export default FormError;
