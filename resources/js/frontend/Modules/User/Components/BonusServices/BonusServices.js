import React from "react";
import { Component } from "react";
import "./BonusServices.scss";
import SubNavbar from "../../Shared/Components/SubNavbar/SubNavbar";
import StepListBar from "../ChooseFlight/Components/StepList/StepList";
import FlightSeatSelection from "./Components/FlightSeatSelection/FlightSeatSelection";
import UserService from "../../Shared/UserService/UserService";

class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightInfo: {},
            seatsReserved: [],
        };
    }

    componentDidMount() {
        this.getSeatsFlightInfo();
        this.getFlightSeatReserved();
    }

    getFlightSeatReserved = () => {
        const bookingInfo = this.props.location.state;
        UserService.getFlightSeats(bookingInfo.ticket_id).then((res) => {
            this.setState({
                seatsReserved: res.data,
            });
        });
    };

    getSeatsFlightInfo = () => {
        const data = this.props.location.state;
        UserService.getSeatAndPriceFlightInfo(data.ticket_id).then((res) => {
            this.setState({
                flightInfo: res.data,
            });
        });
    };

    render() {
        const bookingInfo = this.props.location.state;
        const { flightInfo, seatsReserved } = this.state;
        return (
            <div>
                <SubNavbar />
                <div className="bonus-services">
                    <div className="wrap-container">
                        <StepListBar step={3} />
                        <FlightSeatSelection
                            flightInfo={flightInfo}
                            bookingInfo={bookingInfo}
                            seatsReserved={seatsReserved}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default BonusServices;
