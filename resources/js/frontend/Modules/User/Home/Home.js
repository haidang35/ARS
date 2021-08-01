import React from 'react';
import { Component } from 'react';
import Header from '../Components/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        return(
            <div className="user-layout">
                <Header/>
            </div>
        )
    }
}
export default Home;