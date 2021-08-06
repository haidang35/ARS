import React, { Component } from "react";
class Register extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div className="img js-fullheight">
               <img className="centered" src="bg.jpg" width="100%" height="850px"  style={{filter:"brightness(0.5)"}}/>
              <section className="ftco-section">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                      <h2 className="heading-section">Register</h2>
                    </div>
                  </div>
                  <div className="row justify-content-center"> 
                    <div className="col-md-6 col-lg-4">
                      <div className="login-wrap p-0">
                    
                        <form action="#" className="signin-form">
                          <div className="form-group">
                            <input
                            style={{outline:"none"}}
                              type="text"
                              className="form-control"
                              placeholder="Fullname"
                              required
                            />
                          </div>
                          <div className="form-group"> 
                            <input
                            style={{marginTop: "-10px",outline:"none"}}
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <div className="box-field">
                              <input
                                style={{marginTop: "-10px",outline:"none"}}
                              type="password"
                              name="registerPassword"
                              id="registerPassword"
                              className="form-control"
                              placeholder="Password"
                              />
                            </div>
                            <div className="box-field" >
                              <input
                                style={{marginTop: "-10px",outline:"none"}}
                              type="password"
                              name="registerPasswordConfirm"
                              id="registerPasswordConfirm"
                              className="form-control"
                              placeholder="Comfirm password"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="form-control btn btn-primary submit px-3"
                              
                            >
                              SIGN IN
                            </button>
                          </div>
                        </form>
                        <div className="social d-flex text-center">
                          <a href="#" className="px-2 py-2 mr-md-1 rounded">
                            <span className="ion-logo-facebook mr-2" /> Facebook
                          </a>
                          <a href="#" className="px-2 py-2 ml-md-1 rounded" style={{marginLeft: "46px"}}>
                            <span className="ion-logo-twitter mr-2" /> Google
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
           
        )
    }
}

export default Register;