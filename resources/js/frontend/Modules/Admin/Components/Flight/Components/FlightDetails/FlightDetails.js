
import React, {Component} from "react";
import "../FlightDetails.scss";
class FlightDetails extends Component{
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
                                Chi tiết chuyến bay
                            </h4>
                        </div>
                        <div>
                            <h5 style={{marginLeft:"40px", marginTop:"10px", fontSize:"16px"}}>Khứ hồi</h5>
                        </div>
                      <hr/>
                      <div className="card card-default" style={{marginBottom:"-50px"}}>
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
                    
                        <div className="row">
                            <div className="col-md-4 col-12" style={{marginLeft:"30px",width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Khởi hành</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                            {/* style={{width:"96%",marginLeft:"30px"}} */}
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm khởi hành
                                                                </span>
                                                                <input
                                                                // style={{height:"38px"}}
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày khởi hành
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ khởi hành
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                                                
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Điểm đến</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                            {/* style={{width:"96%",marginLeft:"30px"}} */}
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm đến
                                                                </span>
                                                                <input
                                                                // style={{height:"38px"}}
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày đến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ đến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Chuyến bay</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Tên hãng
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Mã chuyến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Loại vé
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <section id="multiple-column-form">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-md-4" >
                                                    <div className="form-group"> 
                                                        <label htmlFor="first-name-column">Sức chứa</label>
                                                        <input
                                                        type="text"
                                                        id="first-name-column"
                                                        className="form-control"
                                                        placeholder="200 chỗ ngồi"
                                                        name="fname-column"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi đã đặt trước</label>
                                                        <input
                                                        type="text"
                                                        id="country-floating"
                                                        className="form-control"
                                                        name="country-floating"
                                                        placeholder="120 chỗ ngồi"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi trống</label>
                                                        <input
                                                        type="text"
                                                        id="country-floating"
                                                        className="form-control"
                                                        name="country-floating"
                                                        placeholder="80 chỗ ngồi"
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
                       
                        
                        <hr/>
                        <div className="card card-default" style={{marginBottom:"-50px"}}>
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
                    
                        <div className="row">
                            <div className="col-md-4 col-12" style={{marginLeft:"30px",width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Khởi hành</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                            {/* style={{width:"96%",marginLeft:"30px"}} */}
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm khởi hành
                                                                </span>
                                                                <input
                                                                // style={{height:"38px"}}
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày khởi hành
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ khởi hành
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                                                  
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Điểm đến</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                            {/* style={{width:"96%",marginLeft:"30px"}} */}
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Điểm đến
                                                                </span>
                                                                <input
                                                                // style={{height:"38px"}}
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Sân bay
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Ngày đến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Giờ đến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <div className="col-md-4 col-12" style={{width:"32.3333333%"}}>
                                <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                {/* <div className="row"> */}  
                                                <label htmlFor="first-name-column" style={{fontWeight:"600",color:"rgba(35,28,99,.7)"}}>Chuyến bay</label>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Tên hãng
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Mã chuyến
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input-form">
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" id="inputGroup-sizing-sm">
                                                                Loại vé
                                                                </span>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                    {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <section id="multiple-column-form">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-md-4" >
                                                    <div className="form-group"> 
                                                        <label htmlFor="first-name-column">Sức chứa</label>
                                                        <input
                                                        type="text"
                                                        id="first-name-column"
                                                        className="form-control"
                                                        placeholder="200 chỗ ngồi"
                                                        name="fname-column"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi đã đặt trước</label>
                                                        <input
                                                        type="text"
                                                        id="country-floating"
                                                        className="form-control"
                                                        name="country-floating"
                                                        placeholder="120 chỗ ngồi"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">Chỗ ngồi trống</label>
                                                        <input
                                                        type="text"
                                                        id="country-floating"
                                                        className="form-control"
                                                        name="country-floating"
                                                        placeholder="80 chỗ ngồi"
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
        )
    }
}

export default FlightDetails;