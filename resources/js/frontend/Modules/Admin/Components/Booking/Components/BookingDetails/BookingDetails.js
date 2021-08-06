import React, {Component} from "react";
class BookingDetails extends Component {
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
                            <h4 className="card-title">Thông tin đặt vé máy bay của hành khách</h4>
                        </div>
                        <div className="introduduce-airline" style={{marginTop:"40px"}}>
                             <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Thông tin hành khách</h5>
                             <form className="form">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-column">Tên hành khách</label>
                                            <input
                                            type="text"
                                            id="first-name-column"
                                            className="form-control"
                                            placeholder
                                            name="fname-column"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="last-name-column">Số điện thoại</label>
                                            <input
                                            type="text"
                                            id="last-name-column"
                                            className="form-control"
                                            placeholder
                                            name="lname-column"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="introduduce-airline" style={{marginTop:"40px"}}>
                             <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Thông tin chuyến bay</h5>
                             <div className="row">
                                 <div className="col-lg-6 col-12">
                                    <h4>Chuyến bay: Khứ hồi</h4>
                                    <h4>Trạng thái: Chưa xác nhận</h4>
                                    <h4>Số hành khách: 2 người lớn</h4>
                                 </div>
                                 <div className="col-lg-6 col-12">
                                    <h4>Ngày đi: </h4>
                                    <h4>Ngày về: </h4>
                                 </div>
                             </div>

                             <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                        <tr>
                                            <th>Hà Nội</th>
                                            <th>Hồ Chí Minh</th>
                                            <th>Mã chuyến</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">10/08/2021, 13:00</td>
                                                <td>10/08/2021, 16:00</td>
                                                <td className="text-bold-500">Loại vé: Economy</td>
                                            
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default BookingDetails;