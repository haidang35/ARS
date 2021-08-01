import React from "react";
import { Component } from "react";

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Điểm đến
                            </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                               
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>RATE</th>
                                                <th>SKILL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">
                                                    Michael Right
                                                </td>
                                                <td>$15/hr</td>
                                                <td className="text-bold-500">
                                                    UI/UX
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">
                                                    Morgan Vanblum
                                                </td>
                                                <td>$13/hr</td>
                                                <td className="text-bold-500">
                                                    Graphic concepts
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">
                                                    Tiffani Blogz
                                                </td>
                                                <td>$15/hr</td>
                                                <td className="text-bold-500">
                                                    Animation
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">
                                                    Ashley Boul
                                                </td>
                                                <td>$15/hr</td>
                                                <td className="text-bold-500">
                                                    Animation
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">
                                                    Mikkey Mice
                                                </td>
                                                <td>$15/hr</td>
                                                <td className="text-bold-500">
                                                    Animation
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Destination;
