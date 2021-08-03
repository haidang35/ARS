import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "./Components/StepList/StepList";

class ChooseFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <SubNavbar />
                <div className="choose-flight-page">
                    <div className="wrap-container">
                        <StepListBar />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseFlight;
