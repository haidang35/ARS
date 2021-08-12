import React from "react";
import { Component } from "react";
import { FaCheckCircle } from "react-icons/fa";

class AlertSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message } = this.props;
        return (
            <div>
                {message.length > 0 ? (
                    <div className="alert alert-success" style={{marginLeft:"17px",width:"40%"}}>
                        <FaCheckCircle
                            style={{ color: "#ffff", marginRight: "1rem" }}
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
export default AlertSuccess;
