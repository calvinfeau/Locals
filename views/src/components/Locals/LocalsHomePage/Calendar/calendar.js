import React from "react";
import DateContainer from "./DateContainer/DateContainer";
import "./style.css";
import API from "../../../../controller";
import Moment from "react-moment";

class Availability extends React.Component {
  state = {
    date: [new Date(), new Date()],
    availability: JSON.parse(localStorage.getItem("userDates"))
  };

  // componentDidMount() {
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   console.log(user.availability);
  //   this.setState({ availability: user.availability });
  // }

  handleSubmit = () => {
    console.log(this.props.user._id);
    API.pushDates(this.props.user._id, this.state.date).then(result => {
      console.log(result);
      this.setState({ availability: result.data.availability });
    });
  };

  handleChange = date => {
    this.setState({ date });
  };
  render() {
    console.log(this.state);
    return (
      <div className="calendar-body">
        <div className="calendar">
          <DateContainer
            handleDates={this.handleChange}
            value={this.state.date}
          />
          <button onClick={this.handleSubmit} className="btn calendar-button">
            Submit
          </button>
        </div>
        <div className="container-below-datecontainer">
          <div className="available-title">
            <h3>Availability</h3>
          </div>
          <div className="availability-container">
            <div className="availability">
              {this.state.availability.map((dates, i) => {
                return (
                  <div className="available-dates" key={i}>
                    <p>
                      Available from <span> </span>
                      <Moment format="MM/DD/YYYY">{dates.dateStart}</Moment>
                      <span> </span> to{" "}
                      <Moment format="MM/DD/YYYY">{dates.dateEnd}</Moment>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Availability;
