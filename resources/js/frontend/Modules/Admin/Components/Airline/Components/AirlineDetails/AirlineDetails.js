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
<<<<<<< HEAD
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
=======
>>>>>>> a94335ed1de71ff1a16897a2041999a6bae0bbfa
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
<<<<<<< HEAD
                        </div>   
                        <div className="introduduce-airline">
                             <h5 style={{ fontSize:"1rem", marginLeft:"25px"}}>Liên hệ Vietnam Airlines</h5>
=======
                        </div>  
                          
                        <div className="introduduce-airline" style={{marginTop:"-30px"}}>
                             <h5 style={{ fontSize:"16px",marginLeft: "55px", marginTop:"3px"}}>Liên hệ Vietnam Airlines</h5>
                             
>>>>>>> a94335ed1de71ff1a16897a2041999a6bae0bbfa
                            <section id="multiple-column-form">
                                <div className="row match-height">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
<<<<<<< HEAD
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
=======
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
>>>>>>> a94335ed1de71ff1a16897a2041999a6bae0bbfa
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