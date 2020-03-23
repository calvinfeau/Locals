import React from "react";
import SearchBar from "../../General/Searchbar";
import DateContainer from "../../General/DateContainer";
import { travelerArray } from "./images/backgroundImages/index";
import BackgroundSlideshow from "react-background-slideshow";
import "./TravelerHome.css";

class TravelerHome extends React.Component {
  state = {
    place: "",
    startDate: new Date(),
    endDate: new Date(),
    check: false
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ user });
  }
  showPlaceDetails(place) {
    this.setState({ place });
    this.props.handleAddress(this.state.place);
  }

  handleChange = event => {
    this.setState({ place: event.target.value });
  };

  render() {
    if (this.state.check) {
      this.handleDates();
    }
    let pictures = <BackgroundSlideshow images={travelerArray} />;
    return (
      <div className="background">
        {pictures}
        <div className="components-container">
          <SearchBar
            handleChange={this.handleChange}
            onPlaceChanged={this.showPlaceDetails.bind(this)}
            value={this.state.value}
          />
          <DateContainer
            handleStartDate={this.handleStartDate}
            handleEndDate={this.handleEndDate}
          />
        </div>
      </div>
    );
  }
}

export default TravelerHome;
