import React from "react";
import { Component } from "react";
import { BiErrorCircle } from "react-icons/bi";

class AlertWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message } = this.props;
        return (
            <div>
                {message.length > 0 ? (
                    <div className="alert alert-warning">
                        {" "}
                        <BiErrorCircle
                            style={{
                                color: "#ffff",
                                marginRight: "1rem",
                                fontSize: "23px",
                            }}
                        />
                        {message}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default AlertWarning;
