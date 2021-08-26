import React from "react";
import { Component } from "react";
import "./BonusServices.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import FlightSeatSelection from "./Components/FlightSeatSelection/FlightSeatSelection";

class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <SubNavbar />
                <div className="bonus-services">
                    <div className="wrap-container">
                        <StepListBar step={3} />
                        <FlightSeatSelection />
                    </div>
                </div>
            </div>
        );
    }
}
export default BonusServices;
