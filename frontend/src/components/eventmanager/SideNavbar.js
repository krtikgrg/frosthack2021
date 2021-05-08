import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link,withRouter } from "react-router-dom";
import "./SideNav.css"
class SideNavbar extends Component {
    onClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    onClickFaltu = e =>{
        e.preventDefault()
        // #e2dccd
    }
//     "Event Manager": "u",
//   "Venue Provider": "v",
//   "Caterer": "c",
//   "Tent & Decor": "t",
//   "Photographer": "p",
//   "DJ provider": "d"
  render() {
    return (
        <div id="viewport">
            <div id="sidebar" style={{ padding:"0", backgroundColor:"#e2dccd"}}>
              <ul className="nav">
                <li >
                    <Link to="/emdashboard" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> My Dashboard
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/selectvenueprovider" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Venue Providers
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/selectcateringservice" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Catering Services
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/selecttentanddecor" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Tent and Decor Providers
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/selectphotographer" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Photographers
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/selectdj" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> DJs available
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/resetselections" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Reset
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createevent" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Create Event
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/viewallevents" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> View All Events
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/" onClick={this.onClick} style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Logout
                    </Link>
                </li>
              </ul>
            </div>
      </div>
    );
  }
}
SideNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(withRouter(SideNavbar));