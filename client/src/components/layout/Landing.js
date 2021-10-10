import React, { Component } from "react";
import { Link } from "react-router-dom";

import './LandingPage.css';

class Landing extends Component {
  render() {
    return (
      <div className="bg">
      <div style={{ height: "75vh" }} className="container valign-wrapper ">
        <div className="row">
          <div className="col s12 center-align">
            <h3 style={{color:'white'}}>
              Order food from{" "}
              <span style={{ fontFamily: "monospace" }}>FoodHUB</span>
            </h3>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;
