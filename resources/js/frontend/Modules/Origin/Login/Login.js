import React, { Component } from "react";
class Login extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div className="img js-fullheight">
              <img className="centered" src="background-register.jpg" width="100%" height="750px" style={{filter:"brightness(0.5)"}}/>
              <section className="ftco-section">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                      <h2 className="heading-section">Login</h2>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                      <div className="login-wrap p-0">
                        <h3 className="mb-4 text-center">Have an account?</h3>
                        <form action="#" className="signin-form">
                          <div className="form-group">
                            <input
                            style={{outline:"none"}}
                              type="text"
                              className="form-control"
                              placeholder="Username"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              style={{marginTop: "-10px", outline:"none"}}
                              id="password-field"
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              required
                            />
                            <span
                              toggle="#password-field"
                              className="fa fa-fw fa-eye field-icon toggle-password"
                            />
                          </div>
                          <div className="form-group">
                            <button 
                              type="submit"
                              className="form-control btn btn-primary submit px-3"
                            >
                              LOG IN
                            </button>
                          </div>
                          <div className="form-group d-md-flex" style={{display:"-webkit-box"}}>
                            <div className="w-50">
                              <label className="checkbox-wrap checkbox-primary">
                              <input type="checkbox" defaultChecked />
                                Remember Me
                                <span className="checkmark" />
                              </label>
                            </div>
                            <div className="w-50 text-md-right">
                              <a href="#" style={{ color: "#fff" , marginLeft: "160px"}}>
                                Forgot Password
                              </a>
                            </div>
                          </div>
                        </form>
                        <p className="w-100 text-center">— Or Sign In With —</p>
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

export default Login;