import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import editProfile from "./components/serviceproviders/editprofile";
import Profile from "./components/serviceproviders/profile";
import SpDashboard from "./components/serviceproviders/dashboard";
import EmDashboard from "./components/eventmanager/dashboard";
import SelectVP from "./components/eventmanager/selectvp";
import SelectCS from "./components/eventmanager/selectcs";
import SelectTD from "./components/eventmanager/selecttd";
import SelectPG from "./components/eventmanager/selectpg";
import SelectDJ from "./components/eventmanager/selectdj";
import Reset from "./components/eventmanager/reset";
import CreateEvent from "./components/eventmanager/createevent";
import ViewAllEvents from "./components/eventmanager/viewallevents";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/spdashboard" component={SpDashboard} />
              <PrivateRoute exact path="/editprofile" component={editProfile} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/emdashboard" component={EmDashboard} />
              <PrivateRoute exact path="/selectvenueprovider" component={SelectVP} />
              <PrivateRoute exact path="/selectcateringservice" component={SelectCS} />
              <PrivateRoute exact path="/selecttentanddecor" component={SelectTD} />
              <PrivateRoute exact path="/selectphotographer" component={SelectPG} />
              <PrivateRoute exact path="/selectdj" component={SelectDJ} />
              <PrivateRoute exact path="/resetselections" component={Reset} />
              <PrivateRoute exact path="/createevent" component={CreateEvent} />
              <PrivateRoute exact path="/viewallevents" component={ViewAllEvents} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;