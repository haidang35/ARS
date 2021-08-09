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
                             <h5 style={{ fontSize:"1rem", marginLeft:"25px"}}>Giới thiệu về hãng hàng không</h5>
                            <section id="multiple-column-form">
                                <div className="row match-height">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6" >
                                                                <div className="form-group"> 
                                                                    <label htmlFor="first-name-column">Tên hãng hàng không</label>
                                                                    <input
                                                                    type="text"
                                                                 
                                                                    className="form-control"
                                                                 
                                                                    name="fname-column"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6" >
                                                                <div className="form-group"> 
                                                                    <label htmlFor="first-name-column">Mã hãng hàng không</label>
                                                                    <input
                                                                        type="text"
                                                                        id="first-name-column"
                                                                        className="form-control"
                                                                       
                                                                        name="fname-column"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="country-floating">Quốc gia</label>
                                                                    <input
                                                                        type="text"
                                                                    
                                                                        className="form-control"
                                                                      
                                                                        name="fname-column"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>   
                        <div className="introduduce-airline">
                             <h5 style={{ fontSize:"1rem", marginLeft:"25px"}}>Liên hệ Vietnam Airlines</h5>
                            <section id="multiple-column-form">
                                <div className="row match-height">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6" >
                                                            <div className="form-group"> 
                                                                <label htmlFor="first-name-column">Website</label>
                                                                <input
                                                                    type="text"
                                                                    id="country-floating"
                                                                    className="form-control"
                                                                    name="country-floating"
                                                                    placeholder="0987654321"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
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
     
        )
    }
}

export default AirlineDetails;