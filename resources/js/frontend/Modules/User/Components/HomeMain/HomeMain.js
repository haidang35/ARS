import axios from "axios";
import React from "react";
import { Component } from "react";
import { URL_GET_IP_LOCATION } from "../../../../Constances/const";
import ChatBox from "../ChatBox/ChatBox";
import FavouriteDestination from "../FavouriteDestination/FavouriteDestination";
import BookingHeader from "./Components/BookingHeader/BookingHeader";
import SupportInfo from "./Components/SupportInfo/SupportInfo";
import UserService from "../../Shared/UserService/UserService";
import TicketFromLocation from "./Components/TicketFromLocation/TicketFromLocation";
import SearchFlightBar from "./Components/SearchFlightBar/SearchFlightBar";
import Footer from "../../Shared/Components/Footer/Footer";
const publicIp = require("public-ip");

class HomeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            destinationLocation: {},
            destinationList: [],
            departure: "",
            destination: "",
            ticketsWithLocation: [],
        };
    }

    componentDidMount() {
        this.getDestinationList();
    }

    getDestinationChoosed = (data) => {
        this.setState({ destination: data });
        window.scrollTo(0, 0);
    };

    getDestinationList = () => {
        UserService.getAllDestination().then((res) => {
            this.setState({
                destinationList: res.data,
            });
            this.getIpAddress(res.data);
        });
    };

    getIpAddress = async (destinationList) => {
        await axios
            .get(URL_GET_IP_LOCATION + (await publicIp.v4()).toString())
            .then((res) => {
                this.setState({
                    location: res.data,
                });
                this.getMyLocation(res.data, destinationList);
                this.getTicketWithLocationDeparture();
                this.checkMyLocationIsExist(destinationList);
            });
    };

    getTicketWithLocationDeparture = () => {
        const { departure } = this.state;
        if (Object.keys(departure).length > 0) {
            UserService.getTicketsWithLocationDeparture(departure.id).then(
                (res) => {
                    this.setState({
                        ticketsWithLocation: res.data,
                    });
                }
            );
        }
    };

    onChangeDeparture = (data) => {
        this.setState({
            departure: data,
        });
    };

    onChangeDestination = (data) => {
        this.setState({
            destination: data,
        });
    };

    getMyLocation = async (location, destinationList) => {
        const currentCity = location.city;
        destinationList.forEach((item) => {
            let city = item.city
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
            city = city.split(" ").join("");
            if (city.toLowerCase().indexOf(currentCity.toLowerCase()) !== -1) {
                this.setState({
                    departure: item,
                    destinationLocation: item,
                });
                localStorage.setItem("myLocation", JSON.stringify(item));
            }
        });
    };

    checkMyLocationIsExist = async (destinationList) => {
        if (this.state.departure == "") {
            let ipAddress = "27.67.4.231";
            await axios.get(URL_GET_IP_LOCATION + ipAddress).then((res) => {
                this.setState({
                    location: res.data,
                });
                this.getMyLocation(res.data, destinationList);
                this.getTicketWithLocationDeparture();
            });
        }
    };

    render() {
        const {
            location,
            destinationList,
            ticketsWithLocation,
            departure,
            destination,
        } = this.state;
        return (
            <div>
                <BookingHeader
                    destinationList={destinationList}
                    location={location}
                    departure={departure}
                    destination={destination}
                    onChangeDeparture={this.onChangeDeparture}
                    onChangeDestination={this.onChangeDestination}
                />

                <TicketFromLocation
                    location={location}
                    ticketList={ticketsWithLocation}
                />
                <SearchFlightBar />
                <FavouriteDestination
                    getDestinationChoosed={this.getDestinationChoosed}
                />
                <SupportInfo />
                <ChatBox />
                <Footer />
            </div>
        );
    }
}
export default HomeMain;
