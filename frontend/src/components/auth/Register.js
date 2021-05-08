import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Dropdown from 'react-dropdown';

var MAPPER = {
  "Event Manager": "u",
  "Venue Provider": "v",
  "Caterer": "c",
  "Tent & Decor": "t",
  "Photographer": "p",
  "DJ provider": "d"
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      type: "u",
      description: "",
      price: "",
      phone:"",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if(this.props.auth.user.type !== 'u'){
        this.props.history.push("/spdashboard"); // push user to dashboard when they login
      }
      else{
        this.props.history.push("/emdashboard");
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onselectType = async e => {
    await this.setState({ type: MAPPER[e.value] });
  }
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      type: this.state.type,
      description: this.state.description,
      phone: this.state.phone,
      price: this.state.price
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    const types = [
      "Event Manager", "Venue Provider", "Caterer", "Tent & Decor", "Photographer", "DJ provider"
    ];
    const curtype = this.state.type;
    return (
      <div className="container">
        <div className="column" style={{marginRight:"20%",marginLeft:"20%",width:"60%"}}>
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12" style={{marginTop:"5px",marginBottom:"5px"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12" style={{marginTop:"5px",marginBottom:"5px"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12" style={{marginTop:"5px",marginBottom:"5px"}}>
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <label htmlFor="phone">Phone Number</label>
                <span className="red-text">{errors.phone}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="dropdown-menu" style={{height:"10%",marginTop:"5px",marginBottom:"5px",borderStyle:"solid",borderRadius:"5px",borderColor:"#AAAAAA"}}>
                <Dropdown options={types} id = "type"onChange={this.onselectType} placeholder="Select Your Type" />
              </div>
              {
                (curtype !== 'u')
                  ?
                  (
                    <div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.price}
                          error={errors.price}
                          id="price"
                          type="Number"
                          className={classnames("", {
                            invalid: errors.price
                          })}
                        />
                        <label htmlFor="price">Average Price for per 100 people</label>
                        <span className="red-text">{errors.price}</span>
                      </div>
                      <div className="input-field col s12">
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
                        <span className="red-text">{errors.description}</span>
                      </div>
                    </div>
                  )
                  :
                  (
                    <div>

                    </div>
                  )
              }
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));