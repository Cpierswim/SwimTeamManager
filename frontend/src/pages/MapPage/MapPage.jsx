import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MapPage.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../utils/Keys/keys.js";

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      let url = `${process.env.BASE_URL}/swimmer?team_id=1/`;
      let response = await axios.get(url);
      let swimmers = response.data;
      let temp_marker_locations = [];
      for (let i = 0; i < swimmers.length; i++) {
        let address = swimmers[i].address;
        let lat = address.latitude;
        let long = address.longitude;
        let markerLocation = { lat: lat, long: long };
        temp_marker_locations.push(markerLocation);
      }
      setAddresses(temp_marker_locations);

      let marker_locations = [];
      for (let i = 0; i < temp_marker_locations.length; i++) {
        let found_duplicate = false;
        for (let j = 0; j < marker_locations.length; j++) {
          if (
            marker_locations[j].lat === temp_marker_locations[i].lat &&
            marker_locations[j].long === temp_marker_locations[i].long
          ) {
            found_duplicate = true;
            break;
          }
        }
        if (!found_duplicate) marker_locations.push(temp_marker_locations[i]);
      }
      let middle_location = marker_locations.reduce(
        (coordinate, total) => {
          let lat = coordinate.lat + total.lat;
          let long = coordinate.long + total.long;
          return { lat: lat, long: long };
        },
        { lat: 0, long: 0 }
      );
      middle_location.lat = middle_location.lat / marker_locations.length;
      middle_location.long = middle_location.long / marker_locations.length;
      setCenter({ lat: middle_location.lat, lng: middle_location.long });
    };
    fetchAddresses();
  }, []);

  return (
    <div className="map">
      {!isLoaded ? (
        <h1>Map Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          {addresses.map((address, index) => {
            return (
              <Marker
                key={index}
                position={{ lat: address["lat"], lng: address["long"] }}
              />
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapPage;
