import React, {Component} from "react";
class AirlineDetails extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Thông tin chi tiết của hãng hàng không</h4>
                        </div>
                        <div className="introduduce-airline">
                             <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Giới thiệu về hãng hàng không</h5>
                             <li className="media mail-read"  style={{marginLeft: "90px"}}>
                                <div className="user-action">
                                    <span className="favorite text-warning">
                                    <svg className="bi" width="1.5em" height="1.5em" fill="currentColor">
                                        <use xlinkHref="assets/vendors/bootstrap-icons/bootstrap-icons.svg#star-fill" />
                                    </svg>
                                    </span>
                                </div>
                                <div className="pr-50"  style={{marginLeft: "15px"}}>
                                    <div className="avatar">
                                        <img src="logo-vnairlines.png" alt="" style={{width:"50px", height:"50px"}}/>
                                    </div>
                                </div>
                                <div className="media-body" style={{marginLeft:"20px"}}>
                                    <div className="user-details">
                                        <div className="mail-items">
                                            <span className="list-group-item-text text-truncate">
                                            Vietname Airlines
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mail-message">
                                        <p className="list-group-item-text truncate mb-0">
                                            
                                        </p>
                                        <div className="mail-meta-item">
                                            <span className="float-right">
                                            <span className="bullet bullet-success bullet-sm" />
                                           
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <div className="introduduce-airline" style={{marginTop:"40px"}}>
                             <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Các chuyến bay phổ biến</h5>
                             <section id="list-group-icons"  style={{marginLeft: "90px"}}>
                                <div className="row match-height">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-body">
                                               
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                       
                                                        Nha Trang đến Đà Lạt
                                                    </li>
                                                    <li className="list-group-item">
                                                       
                                                        Huế đến Hội An
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                  
                                    </div>
                                </div>
                            </section> 
                        <div className="introduce-airline">
                            <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Liên hệ Vietname Airlines</h5>
                            <section className="section" style={{marginLeft: "90px"}} >
                                <div className="row" id="table-head">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="table-responsive">
                                                    <table className="table table-borderless mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Văn phòng Vietname Airlines</th>
                                                                <th>Hotline</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="text-bold-500">Vietnam Airlines</td>
                                                                <td>(844) 3873 0314</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold-500">200 Nguyen Son Str., Long Bien</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold-500">Dist.,</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold-500">Ha Noi city, Vietnam</td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AirlineDetails;