import React from "react";
import { Component } from "react";
import "../../../../../../../public/assets/vendors/apexcharts/apexcharts";
import { FaPaperPlane } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { RiPlaneFill, RiReservedFill } from "react-icons/ri";
import AdminService from "../../../../Shared/Service/AdminService";

import { Line } from "react-chartjs-2";
import { typeOf } from "react-is";

const data = {
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
    ],
    datasets: [
        {
            label: "Vietnam Airline",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 65, 60],
        },
        {
            label: "Bamboo Airways",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#00FF33",
            borderColor: "#00FF00",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#00FF00",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#00FF00",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [20, 30, 60, 51, 58, 70, 80, 60, 55],
        },
        {
            label: "Vietjet Air",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#FF3333",
            borderColor: "#CC3300",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#CC3300",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#CC3300",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [33, 55, 44, 62, 30, 44, 60, 40, 33],
        },
        {
            label: "Pacific Airline",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#D59B00",
            borderColor: "#F1AF00",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#F1AF00",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#F1AF00",
            pointHoverBorderColor: "#D59B00",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [30, 44, 35, 48, 52, 50, 43, 59, 45],
        },
    ],
};
class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overviewInfo: {},
        };
    }

    componentDidMount() {
        this.getOverviewInfo();
    }

    getOverviewInfo = () => {
        AdminService.getOverView().then((res) => {
            this.setState({
                overviewInfo: res.data,
            });
        });
    };
    render() {
        const { overviewInfo } = this.state;
        const airlines = overviewInfo.airlines;
        const destinations = overviewInfo.destinations;
        const flights = overviewInfo.flights;
        const bookings = overviewInfo.bookings;
        let hasData = false;
        if (Object.keys(overviewInfo).length !== 0) {
            hasData = true;
        }
        return (
            <div>
                <div className="page-heading">
                    <h3>FlightHi Overview</h3>
                </div>
                <div className="page-content">
                    <section className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body px-3 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="stats-icon purple">
                                                <FaPaperPlane
                                                    style={{
                                                        color: "#ffff",
                                                        fontSize: "1.5rem",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <h6 className="text-muted font-semibold">
                                                Airlines
                                            </h6>
                                            <h6 className="font-extrabold mb-0">
                                                {hasData ? airlines.length : ""}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body px-3 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="stats-icon blue">
                                                <MdLocationOn
                                                    style={{
                                                        color: "#ffff",
                                                        fontSize: "1.5rem",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <h6 className="text-muted font-semibold">
                                                Destinations
                                            </h6>
                                            <h6 className="font-extrabold mb-0">
                                                {hasData
                                                    ? destinations.length
                                                    : ""}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body px-3 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="stats-icon green">
                                                <RiPlaneFill
                                                    style={{
                                                        color: "#ffff",
                                                        fontSize: "1.5rem",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <h6 className="text-muted font-semibold">
                                                Flight
                                            </h6>
                                            <h6 className="font-extrabold mb-0">
                                                {hasData ? flights.length : ""}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body px-3 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="stats-icon red">
                                                <RiReservedFill
                                                    style={{
                                                        color: "#ffff",
                                                        fontSize: "1.5rem",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <h6 className="text-muted font-semibold">
                                                Booking
                                            </h6>
                                            <h6 className="font-extrabold mb-0">
                                                {hasData ? bookings.length : ""}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <Line ref="chart" data={data} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <footer>
                    <div
                        className="footer clearfix mb-0 text-muted"
                        style={{ marginTop: "2rem" }}
                    >
                        <div className="float-start">
                            <p>2021 © FlightHi</p>
                        </div>
                        <div className="float-end">
                            <p>
                                Developed{" "}
                                <span className="text-danger">
                                    <i className="bi bi-heart" />
                                </span>{" "}
                                by YodaTeam T2009M
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default DashBoard;
