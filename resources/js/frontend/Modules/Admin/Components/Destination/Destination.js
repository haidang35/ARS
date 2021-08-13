import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import AddNewDestination from "./Components/AddNewDestination/AddNewDestination";
import DestinationService from "./Shared/DestinationService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";    
class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationList: [],
            message:"",
            errorMessage:"",
           
        };
    }

    componentDidMount() {
        this.getDestinationList();
    }

    getDestinationList = () => {
        DestinationService.getDestinationList()
            .then((res) => {
                this.setState({
                    destinationList: res.data,
                });
            })
           
    };
    addDestination=(data)=>{
        DestinationService.addNewDestination(data)
            .then((res)=>{
                this.getDestinationList();
                console.log(res.data);
                this.setState({
                    message:"Create destination successfully"
                })
            })   
           
            .catch((err)=>{
                this.setState({
                    errorMessage:"Create destination failed"
                })
            })
           
    }

    onCloseAdd=()=>{
        this.getDestinationList();
    }

    render() {
        
        const { destinationList} = this.state;
        const {message,errorMessage} = this.state;
        if (message.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    message: "",
                    errorMessage: "",
                });
            }, 5000);
        }
        return (
            <div>
                <AlertSuccess message={this.state.message}/>
                <AlertDanger message={this.state.errorMessage}/>
               
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Điểm đến</h4>
                            <div className="float-right" style={{marginRight:"20px"}}>
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#addNewDestination"
                                >
                                    Add new destination
                                </button>
                        </div>
                        </div>
                       <AddNewDestination onSubmit = {this.addDestination} onClose={this.onCloseAdd}/>
                       
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tỉnh/Thành phố</th>
                                                <th>Mã sân bay</th>
                                                <th>Sân bay</th>
                                                <th>Quốc gia</th>
                                                <th>Mã quốc gia</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {destinationList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.province &&
                                                            item.province
                                                                .toLowerCase()
                                                                .indexOf(
                                                                    item.city.toLowerCase()
                                                                ) === 1
                                                                ? item.province +
                                                                  "/" +
                                                                  item.city
                                                                : item.city}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airport_code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airport_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.country}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.country_code}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/admin/destinations/${item.id}`}
                                                            >
                                                                <button className="btn btn-primary" style={{float:"right"}}>
                                                                    View
                                                                </button>
                                                            </Link> 
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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
