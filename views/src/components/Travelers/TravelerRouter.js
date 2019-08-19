import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TravelHome from "./TravelerHome/TravelerHome";
import Settings from "./TravelersSettingsPage/SettingsBody/SettingsBody";
import MapContainer from "./TravelerSearchPage/MapContainer/MapContainer";

class TravelerRouter extends React.Component {
  state = {
    user: "traveller",
    currentUser: this.props.currentUser,
    address: "",
    dates: ""
  };

  handleAddress = input => {
    this.setState({ address: input });
  };

  dateHandler = input => {
    this.setState({ dates: input });
  };
  render() {
    console.log(this.state);

    const { match } = this.props;
    return (
      <div className="travelerhome">
        <Route
          path={`${match.path}/settings`}
          render={props => {
            return <Settings {...props} user={this.state.currentUser} />;
          }}
        />
        <Route
          path={`${match.path}/search`}
          render={props => {
            return (
              <MapContainer
                {...props}
                dates={this.state.dates}
                address={this.state.address}
                user={this.state.currentUser}
              />
            );
          }}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <TravelHome
              dates={this.dateHandler}
              handleAddress={this.handleAddress}
              {...props}
              user={this.state.currentUser}
            />
          )}
        />
      </div>
    );
  }
}

export default TravelerRouter;