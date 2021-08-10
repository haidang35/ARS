import React from "react";
import { Component } from "react";
import { BiErrorCircle } from "react-icons/bi";

class AlertDanger extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message } = this.props;
        return (
            <div>
                {message.length > 0 ? (
                    <div className="alert alert-danger">
                        <BiErrorCircle
                            style={{
                                color: "#ffff",
                                marginRight: "1rem",
                                fontSize: "2rem",
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
export default AlertDanger;
