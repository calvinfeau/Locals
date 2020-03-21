import React from "react";
import { travellerArray, localArray } from "../components/General/images/index";
import BackgroundSlideshow from "react-background-slideshow";
import API from "../controller";
import Registration from "../components/General/Registration";

class Login extends React.Component {
  state = {
    user: this.props.user,
    travelers: "",
    locals: "",
    username: "",
    password: "",
    showComponent: false,
    incorrect: "Incorrect Username or Password",
    showMessage: false
  };

  componentDidMount() {
    const user = localStorage.getItem("type");
    this.setState({ user });
  }

  closeRegistration = input => {
    this.setState({ showComponent: input });
  };
  handleClick = () => {
    this.setState({ showComponent: true });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.state.user === "local") {
      API.loginSearchLocal(user).then(result => {
        if (result.data.length <= 0) {
          this.setState({ showMessage: true });
        } else if (user.password !== result.data[0].password) {
          this.setState({ showMessage: true });
        } else {
          for (let i = 0; i < result.data.length; i++) {
            console.log(result.data[i]);
            API.getLocalById(result.data[i]._id).then(result => {
              this.props.currentUser(result.data[0]);
              console.log(this.props.history);
              this.props.history.push("/localhome");
            });
          }
        }
      });
    } else if (this.state.user === "traveler") {
      API.loginSearchTraveler(user).then(result => {
        console.log(result.data);
        if (result.data.length <= 0) {
          this.setState({ showMessage: true });
        } else if (user.password !== result.data[0].password) {
          this.setState({ showMessage: true });
        } else {
          for (let i = 0; i < result.data.length; i++) {
            console.log(result.data[i]);
            API.getTravelerById(result.data[i]._id).then(result => {
              this.props.currentUser(result.data[0]);
              this.props.history.push("/travelerhome");
            });
          }
        }
      });
    }
  };
  render() {
    let pictures;
    let title;

    if (this.state.user === "local") {
      title = "Welcome Local";
      pictures = <BackgroundSlideshow images={localArray} />;
    } else {
      title = "Welcome Traveler";
      pictures = <BackgroundSlideshow images={travellerArray} />;
    }

    return (
      <div className="background">
        {pictures}
        <div className="body">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="logincontainer">
            <h2 className="login-text">Login</h2>
            <p className="incorrect-info-text">
              {this.state.showMessage
                ? this.state.incorrect
                : console.log("you're good")}
            </p>
            <form className="form">
              <input
                className="username"
                name="username"
                type="text"
                onChange={this.handleChange}
                placeholder="Username"
              />
              <br />
              <br />
              <input
                className="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
              <br />
              <br />
              <button
                className="login-btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <br />
              <div className="registration-text">
                If this is your first time visiting: <br />
                <button
                  type="button"
                  onClick={this.handleClick}
                  className="registration-btn"
                >
                  Register Here
                </button>
              </div>
            </form>
          </div>
        </div>

        {this.state.showComponent ? (
          <Registration close={this.closeRegistration} user={this.state.user} />
        ) : null}
      </div>
    );
  }
}

export default Login;
