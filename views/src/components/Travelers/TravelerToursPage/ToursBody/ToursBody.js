import React from "react";
import "./ToursBody.css";
import Accordion from "../Accordion/Accordion";
import Moment from "react-moment";
import API from "../../../../controller";

class ToursBody extends React.Component {
  state = {
    booking: JSON.parse(localStorage.getItem("userBooking")),
    check: false
  };

  componentDidMount() {
    this.setBooking();
  }

  setCheck = () => {
    this.setState({ check: true });
    console.log(this.state.booking);
  };

  setBooking = () => {
    console.log("I Run");
    const duplicate = [];
    const bookedLocals = [];
    for (let i = 0; i < this.state.booking.length; i++) {
      API.getLocalById(this.state.booking[i].id).then(result => {
        for (let i = 0; i < result.data.length; i++) {
          if (duplicate.indexOf(result.data[i]) !== 0) {
            bookedLocals.push(result.data[i]);
            duplicate.push(result.data[i]);
            console.log(result.data[i]);
          } else {
            console.log("I don't know");
            console.log(this.state);
          }
        }
      });
    }
    this.setState({ bookedLocals, check: true });
    this.handleBooking();
  };

  handleBooking = () => {};
  render() {
    let localsBooked;
    this.state.check
      ? (localsBooked = this.state.bookedLocals.map((local, i) => {
          return (
            <Accordion
              bio={local.bio}
              name={`${local.firstname} ${local.lastname}`}
              rate={local.rate}
              key={i}
              rating={local.rating}
              tourInfo={local.tourInfo}
              startDate={
                <Moment format="MM/DD/YYYY">
                  {local.availability[0].dateStart}
                </Moment>
              }
              endDate={
                <Moment format="MM/DD/YYYY">
                  {local.availability[0].dateEnd}
                </Moment>
              }
            />
          );
        }))
      : console.log(this.state.bookedLocals);

    console.log(this.state);

    return (
      <div className="traveler-body-container">
        <div className="traveler-next-tour">Next Tour</div>
        <div className="traveler-next-tour-accordion">
          <Accordion content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </div>
        <div className="traveler-upcoming-tours">Upcoming Tours</div>
        <div className="traveler-upcoming-tours-accordions">
          {localsBooked}
          {/* <Accordion content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
          <Accordion content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." /> */}
        </div>
      </div>
    );
  }
}

export default ToursBody;
