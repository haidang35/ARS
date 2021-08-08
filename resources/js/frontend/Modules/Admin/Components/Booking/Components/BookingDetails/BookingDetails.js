import React, {Component} from "react";
import "../BookingDetails.scss";
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
                        <div className="card card-default" style={{marginBottom:"2px"}}>
                                    <div className="card-body detail-info">
                                        <div className="row">
                                            <div className="col-sm-6 col-12" style={{ marginBottom: "35px" }}></div>
                                            <div
                                                className="col-sm-6 col-12"
                                                style={{ marginBottom: "5px"}}
                                            >
                                                {/* {!onEdit ? ( */}
                                                    {/* <button
                                                        style={{marginTop:"-20px", marginLeft:"510px",marginBottom:"40px"}}
                                                        // onClick={this.onEditInfo}
                                                        className=" btn btn-primary"
                                                    >
                                                        Edit
                                                    </button> */}
                                                {/* ) : ( */}
                                                    <div>
                                                        <button
                                                             style={{marginLeft: "400px",marginTop:"-45px"}}
                                                            className=" btn btn-success"
                                                            // onClick={this.onSaveChangeInfo}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            style={{marginLeft: "488px",marginTop: "-90px"}}
                                                            // onClick={this.onCancelEditInfo}
                                                            className=" btn btn-warning"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                        <div className="introduduce-airline">
                             <h5 style={{ fontSize:"16px",marginLeft: "55px", marginTop:"3px"}}>Thông tin hành khách</h5>
                             
                            <section id="multiple-column-form">
                                <div className="row match-height">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form">
                                                        <div className="row">
                                                            <div className="col-md-6" >
                                                                <div className="form-group"> 
                                                                    <label htmlFor="first-name-column">Tên hành khách</label>
                                                                    <input
                                                                    type="text"
                                                                    id="first-name-column"
                                                                    className="form-control"
                                                                    placeholder="Nguyễn Văn An"
                                                                    name="fname-column"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="country-floating">Số điện thoại</label>
                                                                    <input
                                                                    type="text"
                                                                    id="country-floating"
                                                                    className="form-control"
                                                                    name="country-floating"
                                                                    placeholder="0987654321"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="introduduce-airline">
                             <h5 style={{ fontSize:"16px",marginLeft: "55px", marginTop:"-25px"}}>Thông tin chuyến bay</h5>
                            <section id="multiple-column-form">
                            <div className="row match-height">
                                <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                    <div className="card-body">
                                        <form className="form">
                                        <div className="row">
                                            <div className="col-md-6" >
                                            <div className="form-group"> 
                                                <label htmlFor="first-name-column">Chuyến bay</label>
                                                <input
                                                type="text"
                                                id="first-name-column"
                                                className="form-control"
                                                placeholder="Khứ hồi"
                                                name="fname-column"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="country-floating">Trạng thái</label>
                                                <input
                                                type="text"
                                                id="country-floating"
                                                className="form-control"
                                                name="country-floating"
                                                placeholder="Chưa xác nhận"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="city-column">Số hành khách</label>
                                                <input
                                                type="text"
                                                id="city-column"
                                                className="form-control"
                                                placeholder="1 người lớn"
                                                name="city-column"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="country-floating">Ngày đi</label>
                                                <input
                                                type="text"
                                                id="country-floating"
                                                className="form-control"
                                                name="country-floating"
                                                placeholder="10/08/2021"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="company-column">Ngày về</label>
                                                <input
                                                type="text"
                                                id="company-column"
                                                className="form-control"
                                                name="company-column"
                                                placeholder="12/08/2021"
                                                />
                                            </div>
                                            </div>
                                         
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>

                             <div className="card-content">
                                 <h6 style={{marginLeft:"55px", marginTop:"-30px"}}>Khởi hành từ Hà Nội</h6>
                                <section id="multiple-column-form"  style={{ marginLeft:"10px", marginTop:"30px"}}>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <form className="form">
                                                    <div className="row">
                                                        <div className="col-md-4" >
                                                            <div className="form-group"> 
                                                                <label htmlFor="first-name-column">Điểm khởi hành</label>
                                                                <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                                placeholder="Hà Nội (HAN)"
                                                                name="fname-column"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Điểm đến</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder="Đà Nẵng (DAN)"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="city-column">Mã chuyến bay</label>
                                                                <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                placeholder="QH1064"
                                                                name="city-column"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Thời gian khởi hành</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder="10/08/2021, 13:00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="company-column">Thời gian đến</label>
                                                                <input
                                                                type="text"
                                                                id="company-column"
                                                                className="form-control"
                                                                name="company-column"
                                                                placeholder="10/08/2021, 15:00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="company-column">Loại vé</label>
                                                                <input
                                                                type="text"
                                                                id="company-column"
                                                                className="form-control"
                                                                name="company-column"
                                                                placeholder="Economy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            
                            <div className="card-content">
                                 <h6 style={{marginLeft:"55px"}}>Khởi hành từ Đà Nẵng</h6>
                                 
                                <section id="multiple-column-form"  style={{marginLeft:"10px", marginTop:"30px"}}> 
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <form className="form">
                                                    <div className="row">
                                                        <div className="col-md-4" >
                                                            <div className="form-group"> 
                                                                <label htmlFor="first-name-column">Điểm khởi hành</label>
                                                                <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                                placeholder="Đà Nẵng (DAN)"
                                                                name="fname-column"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Điểm đến</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder="Hà Nội (HAN)"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="city-column">Mã chuyến bay</label>
                                                                <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                placeholder="QH1063"
                                                                name="city-column"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Thời gian khởi hành</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder="12/08/2021, 13:00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="company-column">Thời gian đến</label>
                                                                <input
                                                                type="text"
                                                                id="company-column"
                                                                className="form-control"
                                                                name="company-column"
                                                                placeholder="12/08/2021, 15:00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="company-column">Loại vé</label>
                                                                <input
                                                                type="text"
                                                                id="company-column"
                                                                className="form-control"
                                                                name="company-column"
                                                                placeholder="Economy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="card-content">
                                 <h6 style={{marginLeft:"55px",marginTop: "-10px"}}>Thanh toán</h6>
                                            
                                <section id="multiple-column-form"  style={{marginLeft:"10px", marginTop:"30px"}}>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <form className="form">
                                                    <div className="row">
                                                        <div className="col-md-6" >
                                                            <div className="form-group"> 
                                                                <label htmlFor="first-name-column">Tổng tiền</label>
                                                                <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                                placeholder="3,000,000"
                                                                name="fname-column"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Trạng thái</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder="Chưa thanh toán"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
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
export default BookingDetails;