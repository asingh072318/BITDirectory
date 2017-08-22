import React, { Component } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import Search from "react-native-search-box";
import { Button } from "react-native-elements";
import firebase from "firebase";
import * as FirebaseUtils from "../Services/Firebase";
import Actions from "jumpstate";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/LaunchScreenStyles";
class LaunchScreen extends Component {
  render() {
    return (
      <View>
        <Search />
        <Text>Hello </Text>
        <Button
          raised
          icon={{ name: "home", size: 32 }}
          buttonStyle={{ backgroundColor: "red", borderRadius: 10 }}
          textStyle={{ textAlign: "center" }}
          title={`Welcome to\nReact Native Elements`}
        />
        <Text>{this.props.vajra.apiStatus}</Text>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    vajra: state.vajra
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
