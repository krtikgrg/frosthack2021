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
    
    async componentDidMount() {
        const info = {
            type:"v",
            email: this.props.auth.user.email
        }
        await axios.post("/eventManager/getProvider", info).then(async res => {
            var lvp = res.data;
            await axios.post("/eventManager/getProvider/all",info).then(async res => {
                if(res.data.vselected == 1){
                    for(var i=0;i<lvp.length;i++){
                        if(lvp[i]._id == res.data.vid){
                            lvp[i].hired = 1
                        }
                        else{
                            lvp[i].hired = 0
                        }
                    }
                }
                this.setState({vp:lvp});
                console.log(this.state.vp);
            })
        })
    }
    onClick(e,index){
        e.preventDefault();
    }
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