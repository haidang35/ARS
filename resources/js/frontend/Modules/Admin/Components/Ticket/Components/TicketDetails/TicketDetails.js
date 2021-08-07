
import React, {Component} from "react";

class TicketDetails extends Component{
   constructor(props){
       super(props);
       this.state={
       }
   }
    render(){
        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">
                                Chi tiết vé máy bay
                            </h4>
                        </div>
                      <hr/>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                        <tr>
                                            <th>Khởi hành</th>
                                            <th>Điểm đến</th>
                                            <th>Chuyến bay</th>    
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">Đà Nẵng</td>
                                                <td>Nha Trang</td>
                                                <td className="text-bold-500">Vietnam Airlines</td>
                                            
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">Sân bay: Nội Bài</td>
                                                <td>Sân bay: Tân Sơn Nhất</td>
                                                <td className="text-bold-500">VN 213</td>
                                            
                                            </tr>
                                            <tr>
                                                <td className="text-bold-500">Thời gian: 13:00, 06/08/2021</td>
                                                <td>Thời gian: 16:00, 06/08/2021</td>
                                                <td className="text-bold-500">Loại vé: Economy</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th>Sức chứa</th>
                                                <th>Chỗ ngồi đã được đặt</th>
                                                <th>Chỗ ngồi trống</th>        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">Khoảng từ 180 đến 200</td>
                                                <td>80 chỗ ngồi</td>
                                                <td className="text-bold-500">100 chỗ ngồi</td>
                                            </tr>                                      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th>Trạng thái</th>
                                                <th>Hành lý xách tay tối đa</th>
                                                <th>Hành lý ký gửi tối đa</th>  
                                                <th>Giá vé</th>      
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">Đã đặt</td>
                                                <td>10kg</td>
                                                <td className="text-bold-500">32kg</td>
                                                <td>2,300,000</td>
                                            </tr>                                      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        )
    }
}

export default TicketDetails;