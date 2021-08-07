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
                        <div className="introduduce-airline">
                            <div>
                                 <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Thông tin hành khách</h5>
                                <form className="form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group" style={{marginLeft:"55px"}}>
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
                                        <div className="col-md-6">
                                            <div className="form-group" style={{marginRight:"55px"}}>
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
                        </div>
                        <div className="introduduce-airline" style={{marginTop:"30px"}}>
                             <h5 style={{marginLeft: "55px", fontSize:"16px"}}>Thông tin chuyến bay</h5>
                             <form className="form" style={{marginBottom:"40px"}}>
                                 <div className="row">
                                    <div className="col-md-6"  style={{marginLeft:"55px"}}>
                                        <h6 style={{ color:"#798794"}}>Chuyến bay: Khứ hồi</h6>
                                        <h6 style={{ color:"#798794"}}>Trạng thái: Chưa xác nhận</h6>
                                        <h6 style={{ color:"#798794"}}>Số hành khách: 1 người lớn</h6>
                                    </div>
                                    <div className="col-md-6" style={{marginLeft:"-55px"}}>
                                        <h6 style={{ color:"#798794"}}>Ngày đi: 10/08/2021</h6>
                                        <h6 style={{ color:"#798794"}}>Ngày về: 12/08/2021</h6>
                                    </div>
                                </div>
                             </form>
                             <div className="card-content">
                                 <h6 style={{marginLeft:"55px"}}>Khởi hành từ Hà Nội</h6>
                                <div className="card-body" style={{marginLeft:"24px", marginTop:"-30px"}}>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                            <tr>
                                                <th>Hà Nội (HAN)</th>
                                                <th>Đà Nẵng (DAD)</th>
                                                <th>Mã chuyến: QH1063</th>
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
                            <div className="card-content">
                            <h6 style={{marginLeft:"55px"}}>Khởi hành từ Đà Nẵng</h6>
                                <div className="card-body"  style={{marginLeft:"24px", marginTop:"-30px"}}>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                            <tr>
                                                <th>Đà Nẵng (DAN)</th>
                                                <th>Hà Nội (HAN)</th>
                                                <th>Mã chuyến: QH1064</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-bold-500">12/08/2021, 13:00</td>
                                                    <td>12/08/2021, 16:00</td>
                                                    <td className="text-bold-500">Loại vé: Economy</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content" style={{paddingLeft:"720px"}}>
                            <h6 style={{marginLeft:"55px"}}>Tổng tiền: </h6>
                            <h6 style={{marginLeft:"55px"}}>Trạng thái thanh toán: Chưa thanh toán</h6>
                                <div className="card-body">
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