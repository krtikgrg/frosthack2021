import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";


class Reset extends Component {
    resetCall = e => {
        e.preventDefault();
        const info = {
            email: this.props.auth.user.email
        }
        axios.post("/eventManager/addProvider/reset", info).then(res =>{
            this.props.history.push("/emdashboard");    
        })
    }
    render() {
        var { user } = this.props.auth;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <div className="container">
                        <div>
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}
                                <p className="flow-text grey-text text-darken-1">
                                    Want to reset all your choices that you have made for the next event? If yes press the button below...
                        </p>
                            </h4>
                            <div>
                                <button onClick={this.resetCall} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable black accent-3">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Reset.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {  }
)(Reset);