import { data } from "jquery";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Components/Form/Form";
import FormError from "../../../../Shared/Components/Form/FormError";
import AddNewAirline from "./Components/AddNewAirline/AddNewAirline";
import AirlineService from "./Shared/AirlineService";
import AlertSuccess from "../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Components/Alert/AlertDanger";
class Airline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airlineList: [],
            message:"",
            errorMessage:""
        };
    }

    componentDidMount() {
        this.getAirlineList();
    }

    getAirlineList = () => {
        AirlineService.getAirlineList()
            .then((res) => {
                this.setState({
                    airlineList: res.data,
                });
            })
            .catch((err) => {});
    };

   addAirline=(data)=>{
        AirlineService.addNewAirline(data)
        .then((res)=>{
            this.getAirlineList();
            this.setState({
                message:`Create successfully ${res.data.airline_name} airline`,
                
            })
        })
        .catch((err)=>{
            this.setState({
                errorMessage:"Create airline failed"
            })
        })
   }


    render() {
        const { airlineList } = this.state;
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
                            <h4 className="card-title">
                                Danh sách các hãng hàng không đang hợp tác
                            </h4>
                            <div className="float-right">
                                <button 
                                    style={{marginRight:"20px"}}
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#addNewAirline"
                                >
                                    Add new airline
                                </button>
                            </div>
                        </div>
                        <AddNewAirline onSubmit={this.addAirline}/>
                        
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên hãng hàng không</th>
                                                <th>Mã hãng hàng không</th>
                                                <th>Quốc gia</th>
                                                <th>Website</th>
                                                <th>Hotline</th>
                                                <th>Mô tả</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {airlineList.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-bold-500">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.airline_name}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.code}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.country}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.website}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.hotline}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.desc}
                                                        </td>
                                                        <td>
                                                            <Link 
                                                                to={`/admin/airlines/${item.id}`}
                                                            >
                                                                <button 
                                                                    className="btn btn-primary"
                                                                    style={{float:"right"}}
                                                                >
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

export default Airline;
