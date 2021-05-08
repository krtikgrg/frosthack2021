import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import classnames from "classnames";

class selecttd extends Component {
    constructor() {
        super();
        this.state = {
            td : []
        };
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    async componentDidMount() {
        const info = {
            type:"t",
            email: this.props.auth.user.email
        }
        await axios.post("/eventManager/getProvider", info).then(async res => {
            var lvp = res.data;
            await axios.post("/eventManager/addProvider/all",info).then(async res => {
                    for(var i=0;i<lvp.length;i++){
                        if(res.data.tselected == 1 && lvp[i]._id == res.data.tid){
                            lvp[i].hired = 1
                        }
                        else{
                            lvp[i].hired = 0
                        }
                    }
                this.setState({td:lvp});
                // console.log(this.state.vp);
                // phonenum, email, description
            })
        })
    }
    async onClick(e,index){
        e.preventDefault();
        var VP = this.state.td;
        const info = {
            id: VP[index]._id,
            email: this.props.auth.user.email
        }
        await axios.post("/eventManager/addProvider/t", info).then(async res => {
            window.location.reload(false);
        })
    }
    faltu = e => {
        e.preventDefault();
    }
    render() {
        const venuep = this.state.td;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <h3 className="center title" style={{marginBottom:"50px"}}>Lets Hire a decorator and Tent provider for your next event!</h3>
                    {venuep.map((venpro,index) => (
                        <div className="card" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                        <div className="card-body">
                            <h5 className="card-title center">{venpro.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted" style={{marginLeft:"12%"}}>Price(per 100 people invited): {venpro.price}</h6>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ marginLeft:"12%",width: "50%" }}>Contact Number: {venpro.phone}</div>
                                <div style={{ marginLeft:"20%",width: "50%" }}>Email: {venpro.email}</div>
                            </div>
                            <div>
                                <h6 style={{marginLeft:"12%"}}>Description: {venpro.description}</h6>
                            </div>
                            {(
                                venpro.hired == 0
                            ) ? (  
                                    <button onClick={async e => await this.onClick(e,index)} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable blue accent-3">
                                        Hire
                                    </button>    
                                ) : (
                                    <button onClick={this.faltu} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable green accent-3">
                                        Hired
                                    </button>
                                )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
}
selecttd.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(selecttd);