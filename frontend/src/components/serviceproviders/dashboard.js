import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser,faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

{/* <div>
  <h1 className="logo-badge text-whitesmoke">
    <FontAwesomeIcon icon={faCar} />
  </h1>
</div> */}

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    sendToProfile = e => {
        e.preventDefault();
        this.props.history.push("/profile");
    }
    sendToEditProfile = e => {
        e.preventDefault();
        this.props.history.push("/editprofile")
    }
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <div style={{marginLeft:"20%",marginRight:"20%",width:"60%"}}>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <div style={{marginLeft:"auto",marginRight:"auto"}}>
                                <h1 className="logo-badge text-whitesmoke">
                                    <FontAwesomeIcon style={{height:"200px",width:"200px"}} icon={faUser} />
                                </h1>
                            </div>
                            <div style={{display:"flex",flexDirection:"row"}}>
                                <button onClick={this.sendToProfile} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#FF0000", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>My Profile</h4>
                                </button>
                                <button onClick={this.sendToEditProfile} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#00FF00", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Edit Profile</h4>
                                </button>
                                <button onClick={this.onLogoutClick} style={{width:"30%",marginLeft:"2.5%",marginRight:"2.5%", backgroundColor:"#87CEEB", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Logout</h4>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);