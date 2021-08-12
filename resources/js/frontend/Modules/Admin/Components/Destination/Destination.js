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
            scopeAirport:"",
            scopeCity:""
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
            .catch((err) => {});
    };
    addDestination=(data)=>{
        DestinationService.addNewDestination(data)
            .then((res)=>{
                this.getDestinationList();
            })   

            this.setState({
                message:"Create destination successfully"
            
            })
              .catch((err)=>{
                this.setState({
                    errorMessage:"Create destination failed"
                })
            })
           
    }

    render() {
        
        const { destinationList,scopeAirport,scopeCity } = this.state;
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
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="mdi mdi-magnify"></i>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="scopeCity"
                                            className="form-control"
                                            id="inlineFormInputGroupUsername2"
                                            placeholder="Search title ..."
                                            value={scopeCity.value}
                                            onChange={(ev)=> this._setValue(
                                                ev,"scopeCity"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">
                                        Airport name
                                        </label>
                                        <select 
                                            className="form-select"
                                            id="inputGroupSelect01"
                                            name="scopeAirport"
                                            value={scopeAirport.value}
                                        >
                                            <option selected>Select airport name</option>
                                            {destinationList.map((item)=>{
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.airport_name}
                                                    </option>
                                                )
                                            })}
                                        </select>                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             
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
                       <AddNewDestination onSubmit = {this.addDestination}/>
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
