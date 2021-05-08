import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser,editProfile } from "../../actions/authActions";
import SideNavbar from "./SideNavbar";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import classnames from "classnames";
import "./profile.css"

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            price: "",
            description: "",
            id : "",
            errors: {}
        };
    }
    // async componentWillReceiveProps(nextProps) {
    //     console.log("Kartik")
    //     if (nextProps.errors) {
    //       await this.setState({
    //         errors: nextProps.errors
    //       });
    //       console.log(this.state.errors)
    //     }
    //   }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    componentDidMount() {
        const info = {
            id: this.props.auth.user.id
        }
        axios.post("/serviceProvider/profile/get", info).then(res => {
            this.setState({ name: res.data[0].name })
            this.setState({ email: res.data[0].email })
            this.setState({ price: res.data[0].price })
            this.setState({ description: res.data[0].description })
            this.setState({ id:this.props.auth.user.id })
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
        // console.log(newUser);
        // this.props.editProfile(newUser, this.props.history);
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
                    <div className="container-fluid">
                        <div className="row main-content bg-success text-center">
                            <div style={{width:"30%"}} className="col-md-4 text-center company__info">
                                <span style={{marginLeft:"auto",marginRight:"auto"}} className="company__logo"><h2><FontAwesomeIcon icon={faUser} /></h2></span>
                            </div>
                            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                                <div className="container-fluid">
                                    <div className="row">
                                        <p style={{fontSize:"28px"}}>Edit Profile(change in case you want to edit)</p>
                                    </div>
                                    <div className="row">
                                        <form control="" className="form-group" noValidate onSubmit={this.onSubmit}>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <span className="red-text">
                                                    {errors.email}
                                                    {errors.emailnotfound}
                                                </span>
                                                <input
                                                    onChange={e => (e.preventDefault())}
                                                    value={this.state.email}
                                                    error={errors.email}
                                                    id="email"
                                                    type="email"
                                                    className={classnames("form__input", {
                                                        invalid: errors.email || errors.emailnotfound
                                                    })}
                                                />
                                                
                                            </div>
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <span className="red-text">
                                                    {errors.name}
                                                </span>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.name}
                                                    error={errors.name}
                                                    id="name"
                                                    type="text"
                                                    className={classnames("form__input", {
                                                        invalid: errors.name
                                                    })}
                                                />
                                                
                                            </div>
                                            <div>
                                                <label htmlFor="price">Price</label>
                                                <span className="red-text">
                                                    {errors.price}
                                                </span>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.price}
                                                    error={errors.price}
                                                    id="price"
                                                    type="text"
                                                    className={classnames("form__input", {
                                                        invalid: errors.price
                                                    })}
                                                />
                                                
                                            </div>
                                            <div className="input-field col s12">
                                                <label htmlFor="description">Description</label>
                                                <span className="red-text">
                                                    {errors.description}
                                                </span>
                                                <textarea
                                                    onChange={this.onChange}
                                                    value={this.state.description}
                                                    error={errors.description}
                                                    id="description"
                                                    placeholder="Enter Your Description"
                                                    rows={4}
                                                    cols={12}
                                                    className={classnames("", {
                                                        invalid: errors.description
                                                    })}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    style={{
                                                        width: "150px",
                                                        borderRadius: "3px",
                                                        letterSpacing: "1.5px",
                                                        marginTop: "1rem"
                                                    }}
                                                    type="submit"
                                                    className="btn btn-large waves-effect waves-light hoverable black accent-3"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser,editProfile }
)(Profile);