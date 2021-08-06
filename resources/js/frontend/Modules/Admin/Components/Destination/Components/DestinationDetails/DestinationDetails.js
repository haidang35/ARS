import React, {Component} from "react";
class DestinationDetails extends Component {
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
                            <h4 className="card-title">Thông tin chi tiết của điểm đến</h4>
                        </div>
                        <section id="multiple-column-form">
                            <div className="row match-height">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-body">
                                                <form className="form">
                                                    <div className="row">
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="first-name-column">Tỉnh/Thành phố</label>
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
                                                                <label htmlFor="last-name-column">Mã sân bay</label>
                                                                <input
                                                                type="text"
                                                                id="last-name-column"
                                                                className="form-control"
                                                                placeholder
                                                                name="lname-column"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="city-column">Sân bay</label>
                                                                <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                placeholder
                                                                name="city-column"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="country-floating">Quốc gia</label>
                                                                <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                name="country-floating"
                                                                placeholder
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="company-column">Mã quốc gia</label>
                                                                <input
                                                                type="text"
                                                                id="company-column"
                                                                className="form-control"
                                                                name="company-column"
                                                                placeholder
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
        )
    }
}

export default DestinationDetails;