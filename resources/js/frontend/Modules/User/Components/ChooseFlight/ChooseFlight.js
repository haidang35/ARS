import React from "react";
import { Component } from "react";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import SideBarFilter from "./Components/SideBarFilter/SideBarFilter";
import StepListBar from "./Components/StepList/StepList";
import "./ChooseFlight.scss";
import BookingTicketList from "./Components/BookingTicketList/BookingTicketList";

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
                        <div className="main-content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <SideBarFilter />
                                </div>
                                <div className="col-sm-8">
                                    <BookingTicketList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseFlight;
