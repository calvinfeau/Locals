import React from "react";
import { questions } from "../../../General/InputForm/elements";
import "./style.css";
import API from "../../../../controller/index";

class Settings extends React.Component {
  state = {};

  handleClick = event => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props);
    API.updateTraveler(this.props.user._id, this.state).then(result => {
      console.log(result);
    });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div className="traveler-settings">
        <div className="traveler-setting-body">
          <form className="form-big-container">
            <p> Here you can change your existing settings.</p>
            {questions[this.props.user].map((question, i) => {
              return (
                <div className="traveler-settings-form" key={i}>
                  <label className="traveler-settings-label">
                    {question.label}
                  </label>
                  <br />
                  <input
                    type={question.type}
                    name={question.name}
                    onChange={this.handleChange}
                    placeholder={question.placeholder}
                  />
                </div>
              );
            })}
            <br />
            <button
              type="submit"
              onClick={this.handleClick}
              className="traveler-settings-btn"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
