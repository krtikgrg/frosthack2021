import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

class viewAllEvents extends Component {
    constructor() {
        super();
        this.state = {
            ongoing: [],
            offgoing: []
        };
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    async componentDidMount() {
        const info = {
            email: this.props.auth.user.email
        }
        await axios.post("/eventManager/event/all", info).then(async res => {
            var lon = [];
            var lof = [];
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].ongoing == 1) {
                    lon.push(res.data[i])
                }
                else {
                    lof.push(res.data[i])
                }
            }
            this.setState({ ongoing: lon })
            this.setState({ offgoing: lof })
        })
    }
    async onClick(e, index) {
        e.preventDefault();
        var events = this.state.ongoing;
        const info = {
            id: events[index]._id
        }
        await axios.post("/eventManager/event/changeEventStatus", info).then(async res => {
            window.location.reload(false);
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    {
                        (
                            this.state.ongoing.length == 0
                        ) ? (
                                <h4>You dont have any ongoing events but you can create one by navigating to Creat Event</h4>
                            ) : (
                                <div>
                                    <h4>Ongoing Events:</h4>
                                    {this.state.ongoing.map((even, index) => (
                                        <div className="card" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                                            <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                                                <div className="card-title" style={{ display: "flex", flexDirection: "row" }}>
                                                    <h4>{even.name}</h4>
                                                </div>
                                                <h6>Venue Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.vphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.vname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.vprice}</div>
                                                </div>
                                                <h6>Caterer Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.cphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.cname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.cprice}</div>
                                                </div>
                                                <h6>Tent and Decor Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.tphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.tname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.tprice}</div>
                                                </div>
                                                <h6>Photographer Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.pphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.pname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.pprice}</div>
                                                </div>
                                                <h6>DJ Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.dphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.dname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.dprice}</div>
                                                </div>
                                                <button onClick={async e => await this.onClick(e, index)} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable black accent-3">
                                                    End Event
                                        </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                    }
                    {
                        (
                            this.state.offgoing.length == 0
                        ) ? (
                                <h4>You dont have any Past events</h4>
                            ) : (
                                <div>
                                    <h4>Past Events:</h4>
                                    {this.state.offgoing.map((even, index) => (
                                        <div className="card" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                                            <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                                                <div className="card-title" style={{ display: "flex", flexDirection: "row" }}>
                                                    <h4>{even.name}</h4>
                                                </div>
                                                <h6>Venue Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.vphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.vname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.vprice}</div>
                                                </div>
                                                <h6>Caterer Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.cphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.cname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.cprice}</div>
                                                </div>
                                                <h6>Tent and Decor Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.tphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.tname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.tprice}</div>
                                                </div>
                                                <h6>Photographer Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.pphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.pname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.pprice}</div>
                                                </div>
                                                <h6>DJ Details</h6>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {even.dphone}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Name: {even.dname}</div>
                                                    <div style={{ marginLeft: "3%", width: "30%" }}>Price: {even.dprice}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                    }

                </div>
            </div>
        );
    }
}
viewAllEvents.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(viewAllEvents);