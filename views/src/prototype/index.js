import React from "react";
import Login from "../components/LoginPage/Login";

export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h2>Welcome to Locals</h2>
        <h3>Please Login Below</h3>
        <Login />
      </div>
    );
  }
}
