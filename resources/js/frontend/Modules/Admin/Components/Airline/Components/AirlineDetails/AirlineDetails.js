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

                        <div className="card card-default" style={{marginTop:"-30px"}}>
                            <div className="card-body detail-info">
                                <div className="row">
                                    <div className="col-sm-6 col-12" style={{ marginBottom: "35px" }}></div>
                                    <div
                                        className="col-sm-6 col-12"
                                        style={{ marginBottom: "5px"}}
                                    >
                                        {/* {!onEdit ? ( */}
                                            <button
                                                style={{marginTop:"-20px",marginBottom:"40px", marginLeft:"510px"}}
                                                // onClick={this.onEditInfo}
                                                className=" btn btn-primary"
                                            >
                                                Edit
                                            </button>
                                        {/* ) : ( */}
                                            {/* <div>
                                                <button
                                                        style={{marginLeft: "400px",marginTop:"-20px"}}
                                                    className=" btn btn-success"
                                                    // onClick={this.onSaveChangeInfo}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    style={{marginLeft: "488px",marginTop: "-68px"}}
                                                    // onClick={this.onCancelEditInfo}
                                                    className=" btn btn-warning"
                                                >
                                                    Cancel
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>   
                            <div className="introduduce-airline" style={{marginTop:"-38px"}}>
                             <h5 style={{ fontSize:"16px",marginLeft: "55px", marginTop:"3px"}}>Giới thiệu về hãng hàng không</h5>
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
                                                                    <label htmlFor="first-name-column">Tên hãng hàng không</label>
                                                                    <input
                                                                    type="text"
                                                                    id="first-name-column"
                                                                    className="form-control"
                                                                    placeholder="Vietnam Airlines"
                                                                    name="fname-column"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="country-floating">Miêu tả/Giới thiệu</label>
                                                                    <textarea
                                                                        style={{overflow:"hidden"}}
                                                                        className="form-control"
                                                                        id="exampleFormControlTextarea1"
                                                                        rows={3}
                                                                        defaultValue={""}
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
                          
                        <div className="introduduce-airline" style={{marginTop:"-30px"}}>
                             <h5 style={{ fontSize:"16px",marginLeft: "55px", marginTop:"3px"}}>Liên hệ Vietnam Airlines</h5>
                             
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
                                                                    <label htmlFor="first-name-column">Văn phòng Vietnam Airlines</label>
                                                                    <textarea
                                                                        style={{overflow:"hidden"}}
                                                                        className="form-control"
                                                                        id="exampleFormControlTextarea1"
                                                                        rows={3}
                                                                        defaultValue={""}
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="country-floating">Đường dây nóng</label>
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
                    </div>
                </div>
            </div>
        // </div>
        )
    }
}

export default AirlineDetails;