import React from "react";
import "./App.css";
import jwtDecode from "jwt-decode";

// router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// layout
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import Landing from "./components/layout/Landing";

// redux
import { Provider } from "react-redux";

// store
import store from "./store";

// private route
import PrivateRoute from "./components/common/PrivateRoute";

// auth
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import setToken from "./components/common/setToken";
import { setCurrentUser } from "./components/action/auth";
import Users from "./components/auth/users";

// profile
import CreateProfile from "./components/create-profile/CreateProfile";
import ProfileByHandle from "./components/profile/MainContent";
import EditProfile from "./components/edit-profile/Edit-profile";

// posts
import Posts from "./components/posts/Posts";

// education
import Education from "./components/profile/AddEducation";
import Location from "./components/profile/AddLocation";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // const currentTime = Date.now() / 1000;

  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());

  //   store.dispatch(clearCurrentProfile());

  //   window.location.href = "/login";
  // }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Posts} />
        <div className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />

            <PrivateRoute exact path="/posts" component={Posts} />

            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/education" component={Education} />
            <PrivateRoute exact path="/location" component={Location} />
            <PrivateRoute exact path="/users" component={Users} />
          </Switch>
        </div>
        <PrivateRoute
          exact
          path="/profile/:handle"
          component={ProfileByHandle}
        />

        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
