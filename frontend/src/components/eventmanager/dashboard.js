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
    sendToVP = e => {
        e.preventDefault();
        this.props.history.push("/selectvenueprovider")
    }
    sendToCS = e => {
        e.preventDefault();
        this.props.history.push("/selectcateringservice")
    }
    sendToTD = e => {
        e.preventDefault();
        this.props.history.push("/selecttentanddecor")
    }
    sendToPG = e => {
        e.preventDefault();
        this.props.history.push("/selectphotographer")
    }
    sendToDJ = e => {
        e.preventDefault();
        this.props.history.push("/selectdj")
    }
    sendToReset = e => {
        e.preventDefault();
        this.props.history.push("/resetselections")
    }
    sendToCE = e => {
        e.preventDefault();
        this.props.history.push("/createevent")
    }
    sendToAE = e => {
        e.preventDefault();
        this.props.history.push("/viewallevents")
    }
    render() {
        const { user } = this.props.auth;
        const str = "&";
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
                            <div style={{display:"flex",flexDirection:"row",marginBottom:"10px"}}>
                                <button onClick={this.sendToVP} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#FF0000", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Venue Providers(loc)</h4>
                                </button>
                                <button onClick={this.sendToCS} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#00FF00", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Catering Services</h4>
                                </button>
                                <button onClick={this.sendToTD} style={{width:"30%",marginLeft:"2.5%",marginRight:"2.5%", backgroundColor:"#87CEEB", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Tent {str} Decor Providers</h4>
                                </button>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",marginBottom:"10px"}}>
                                <button onClick={this.sendToPG} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#FFFF00", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Photographers</h4>
                                </button>
                                <button onClick={this.sendToDJ} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#FFA500", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>DJs available</h4>
                                </button>
                                <button onClick={this.sendToReset} style={{width:"30%",marginLeft:"2.5%",marginRight:"2.5%", backgroundColor:"#FFFF00", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Reset</h4>
                                </button>
                            </div>
                            <div style={{display:"flex",flexDirection:"row"}}>
                                <button onClick={this.sendToCE} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#FF0000", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>Create Event</h4>
                                </button>
                                <button onClick={this.sendToAE} style={{width:"30%",marginLeft:"2.5%", backgroundColor:"#00FF00", borderStyle:"solid",borderRadius:"10px",height:"20%"}}>
                                    <h4 style={{paddingTop:"20%",paddingBottom:"20%"}}>View All Events</h4>
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