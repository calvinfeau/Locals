import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import Accordion from "./Accordion/Accordion";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import "./MapContainer.css";
import API from "../../../../controller";

const mapStyles = {
  width: "100%",
  height: "60%"
};

class MapContainer extends React.Component {
  state = {
    place: "",
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    lat:
      this.props.address.geometry && this.props.address.geometry.location.lat(),
    lng:
      this.props.address.geometry && this.props.address.geometry.location.lng(),
    bio: ""
  };

  componentDidMount() {
    this.loadLocals();
  }

  loadLocals = () => {
    let userStart = new Date(this.props.dates[0]);
    let userEnd = new Date(this.props.dates[1]);
    const info = {
      city: this.props.address.name
    };
    API.searchLocals(info).then(result => {
      console.log(result);
      result.data.forEach(function(response) {
        console.log("right there", response);
        console.log(response.availability);
        const dateId = [];
        const dates = response.availability;
        for (let i = 0; i < dates.length; i++) {
          let localStart = new Date(dates[i].dateStart);
          let localEnd = new Date(dates[i].dateEnd);
          if (localStart <= userStart && localEnd >= userEnd) {
            console.log(dates[i]._id);
            dateId.push(dates[i]._id);
          }
        }
        console.log("right here", response);
        // if (response.availability._id.indexOf(dateId) !== -1) {
        //   console.log(response);
        // }
      });
    });
  };

  showPlaceDetails(place) {
    this.setState({ place });
  }

  handleChange = event => {
    this.setState({ place: event.target.value });
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  zoomInOnMapSearch = () => {
    const lat =
      this.state.place.geometry && this.state.place.geometry.location.lat();
    const lng =
      this.state.place.geometry && this.state.place.geometry.location.lng();
    if (lat && lng) {
      this.setState({
        lat,
        lng
      });
    }
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    console.log(typeof this.props.dates[1]);

    // We get the this.state.place from the localshomepage and it renders all the info into this.props.address
    // Since this.props.address.geometry.location.lat && lng are functions they don't render anything on the page.
    const markers = (
      <Marker
        name={this.state.place.formatted_address}
        onClick={this.onMarkerClick}
        position={{ lat: this.state.lat, lng: this.state.lng }}
        key={this.state.place.formatted_address}
      />
    );
    console.log(this.state.place);
    console.log(this.state.lat, this.state.lng);
    return (
      <div>
        <div className="component-container">
          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
            center={{ lat: this.state.lat, lng: this.state.lng }}
          >
            <SearchBar
              handleChange={this.handleChange}
              onPlaceChanged={this.showPlaceDetails.bind(this)}
              value={this.state.place.formatted_address}
              searchPlace={this.zoomInOnMapSearch}
            />
            {markers}
          </Map>
        </div>
        <div className="accordion-container">
          <Accordion content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
          <Accordion content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD1yu2VLAm210up45SP2wF57FNt9m7w7hE"
})(MapContainer);
