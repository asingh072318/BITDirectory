import React, { Component } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import Search from "react-native-search-box";
import { Button } from "react-native-elements";
// Styles
import styles from "./Styles/LaunchScreenStyles";
export default class LaunchScreen extends Component {
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
      </View>
    );
  }
}
