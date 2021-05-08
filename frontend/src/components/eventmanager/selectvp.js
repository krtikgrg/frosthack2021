import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import classnames from "classnames";

class selectvp extends Component {
    constructor() {
        super();
        this.state = {
            vp = []
        };
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    componentDidMount() {
        const info = {
            type:"v"
        }
        axios.post("/eventManager/getProvider", info).then(res => {
            
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        const newUser = this.state;
        await axios
            .post("/serviceProvider/profile/edit", newUser)
            .then(async res => this.props.history.push("/spdashboard")) // re-direct to login on successful register
      .catch(async err =>
        await this.setState({errors:err.response.data})
      );
      };
    render() {
        const { user } = this.props.auth;
        const {errors} = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    
                </div>
            </div>
        );
    }
}
selectvp.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(selectvp);