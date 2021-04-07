import React, { Component } from "react";
import { View, Text, Switch, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

class localisation extends Component {
  state = {
    initialPosition: "unknown",
    lastPosition: "unknown",
    zoom: 0,
  };
  watchID: any;
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      const { height, width } = Dimensions.get("window");
      this.setState({ lastPosition });
    });
  };
  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Initial position:</Text>

        <Text>{this.state.initialPosition}</Text>

        <Text style={styles.boldText}>Current position:</Text>

        <Text>{this.state.lastPosition}</Text>
        <MapView
          style={styles.map}
          showsUserLocation={true}
        />
      </View>
    );
  }
}

export default localisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  boldText: {
    fontSize: 30,
    color: "red",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
