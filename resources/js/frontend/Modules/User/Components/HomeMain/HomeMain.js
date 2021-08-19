import React from "react";
import { Component } from "react";
import ChatBox from "../ChatBox/ChatBox";
import FavouriteDestination from "../FavouriteDestination/FavouriteDestination";
import HomePage from "../HomePage/HomePage";

class HomeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationChoosed: "",
        };
    }

    getDestinationChoosed = (data) => {
        this.setState({ destinationChoosed: data });
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div>
                <HomePage destinationChoosed={this.state.destinationChoosed} />
                <FavouriteDestination
                    getDestinationChoosed={this.getDestinationChoosed}
                />
                <ChatBox />
            </div>
        );
    }
}
export default HomeMain;
