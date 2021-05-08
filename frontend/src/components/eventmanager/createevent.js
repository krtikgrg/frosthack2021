import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,withRouter } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

class createEvent extends Component {
    constructor() {
        super();
        this.state = {
            even: {},
            done: 0,
            eventname: "",
            expectedpeople: "",
            expectedbill: 0,
            errors: {}
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
        await axios.post("/eventManager/addProvider/all", info).then(async res => {
            if (res.data.vselected == 1 && res.data.pselected == 1 && res.data.dselected == 1 && res.data.cselected == 1 && res.data.tselected == 1) {
                this.setState({ done: 1 })
            }
            this.setState({ even: res.data })
        })

    }
    async onClick(e, index) {
        e.preventDefault();

    }
    onChangeName = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }
    onChangePeople = e => {
        e.preventDefault();
        if (e.target.value >= 0) {
            this.setState({ [e.target.id]: e.target.value })
            var people = e.target.value;
            var perfect = parseInt(people / 100);
            if (people % 100 != 0) {
                perfect = perfect + 1;
            }
            var lbill = 0;
            lbill = lbill + (perfect * this.state.even.vprice);
            lbill = lbill + (perfect * this.state.even.cprice);
            lbill = lbill + (perfect * this.state.even.tprice);
            lbill = lbill + (perfect * this.state.even.pprice);
            lbill = lbill + (perfect * this.state.even.dprice);
            this.setState({ expectedbill: lbill })
        }
    }
    onClickReset = async e => {
        e.preventDefault();
        const info = {
            email: this.props.auth.user.email
        }
        await axios.post("/eventManager/addProvider/reset", info).then(res =>{
            window.location.reload(false);    
        })
    }
    onClickCreate = async e => {
        e.preventDefault();
        const info = {
            email: this.props.auth.user.email,
            name: this.state.eventname
        }
        await axios.post("/eventManager/event/addEvent", info).then(async res =>{
            this.props.history.push("/emdashboard")    
        }).catch(async err =>
            await this.setState({errors:err.response.data})
        );
    }
    faltu = e => {
        e.preventDefault();
    }
    render() {
        const {errors} = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <h3 className="title red-text" style={{marginLeft:"30%"}}>Lets Create an Event!</h3>
                    {
                        (
                            this.state.done == 1
                        ) ? (
                                <div className="card" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                                    <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                                        <div className="card-title" style={{ display: "flex", flexDirection: "row" }}>
                                            <label htmlFor="eventname">Event Name</label>
                                            <span className="red-text">
                                                {errors.eventname}
                                            </span>
                                            <input
                                                onChange={this.onChangeName}
                                                value={this.state.eventname}
                                                error={errors.eventname}
                                                id="eventname"
                                                type="text"
                                                className={classnames("", {
                                                    invalid: errors.eventname
                                                })}
                                            />
                                            
                                        </div>
                                        <div className="card-subtitle mb-2 text-muted" style={{ display: "flex", flexDirection: "row", marginLeft: "12%" }}>
                                        <label htmlFor="expectedpeople">Expected invitations to be sent</label>
                                            <span className="red-text">
                                                {errors.expectedpeople}
                                            </span>
                                            <input
                                                onChange={this.onChangePeople}
                                                value={this.state.expectedpeople}
                                                error={errors.expectedpeople}
                                                id="expectedpeople"
                                                type="Number"
                                                className={classnames("", {
                                                    invalid: errors.expectedpeople
                                                })}
                                            />
                                            
                                        </div>
                                        <h6>Venue Details</h6>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {this.state.even.vphone}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Name: {this.state.even.vname}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Price: {this.state.even.vprice}</div>
                                        </div>
                                        <h6>Caterer Details</h6>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {this.state.even.cphone}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Name: {this.state.even.cname}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Price: {this.state.even.cprice}</div>
                                        </div>
                                        <h6>Tent and Decor Details</h6>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {this.state.even.tphone}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Name: {this.state.even.tname}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Price: {this.state.even.tprice}</div>
                                        </div>
                                        <h6>Photographer Details</h6>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {this.state.even.pphone}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Name: {this.state.even.pname}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Price: {this.state.even.pprice}</div>
                                        </div>
                                        <h6>DJ Details</h6>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ marginLeft: "4%", width: "30%" }}>Contact Number: {this.state.even.dphone}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Name: {this.state.even.dname}</div>
                                            <div style={{ marginLeft: "3%", width: "30%" }}>Price: {this.state.even.dprice}</div>
                                        </div>
                                        <h6 className="card-subtitle mb-2 text-muted">Expected Bill: {this.state.expectedbill}</h6>
                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                            <button onClick={this.onClickReset} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable black accent-3">
                                                Discard Event
                                </button>
                                            <button onClick={this.onClickCreate} style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "40%", marginBottom: "1rem" }} type="submit" className="btn  waves-effect waves-light hoverable blue accent-3">
                                                Create Event
                                </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{marginLeft:"10%"}}>
                                {
                                    (
                                        this.state.even.vselected == 0
                                    )?(
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <h5 style={{width:"50%"}}>Please Select a Venue Provider</h5>
                                            <Link classnames="btn waves-effect waves-light hoverable green accent-3" to="/selectvenueprovider" style={{ width:"15%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                                                <i className="zmdi zmdi-view-dashboard"></i> Venue Providers
                                            </Link>
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                                {
                                    (
                                        this.state.even.cselected == 0
                                    )?(
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <h5 style={{width:"50%"}}>Please Select a Catering Service</h5>
                                            <Link classnames="btn waves-effect waves-light hoverable green accent-3" to="/selectcateringservice" style={{ width:"15%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                                                <i className="zmdi zmdi-view-dashboard"></i> Catering Services
                                            </Link>
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                                {
                                    (
                                        this.state.even.tselected == 0
                                    )?(
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <h5 style={{width:"50%"}}>Please Select a Tent and Decor provider</h5>
                                            <Link classnames="btn waves-effect waves-light hoverable green accent-3" to="/selecttentanddecor" style={{ width:"15%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                                                <i className="zmdi zmdi-view-dashboard"></i> Tent and Decor Providers
                                            </Link>
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                                {
                                (
                                        this.state.even.pselected == 0
                                    )?(
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <h5 style={{width:"50%"}}>Please Select Photographer</h5>
                                            <Link classnames="btn waves-effect waves-light hoverable green accent-3" to="/selectphotographer" style={{ width:"15%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                                                <i className="zmdi zmdi-view-dashboard"></i> Photographers
                                            </Link>
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                                {
                                (
                                        this.state.even.dselected == 0
                                    )?(
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <h5 style={{width:"50%"}}>Please Select a DJ</h5>
                                            <Link classnames="btn waves-effect waves-light hoverable green accent-3" to="/selectdj" style={{ width:"15%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                                                <i className="zmdi zmdi-view-dashboard"></i> DJs Available
                                            </Link>
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                                </div>
                        )
                    }

                </div>
            </div>
        );
    }
}
createEvent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(createEvent);