import React, { Component } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import Search from "react-native-search-box";
import { Button } from "react-native-elements";
import firebase from "firebase";
import * as FirebaseUtils from "../Services/Firebase";
import Actions from "jumpstate";
import { connect } from "react-redux";
import { List, ListItem, Avatar } from "react-native-elements";
// Styles
import styles from "./Styles/LaunchScreenStyles";
class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    FirebaseUtils.initializeFirebase();
  }
  componentWillMount() {
    FirebaseUtils.readContact();
  }
  renderList = () => {
    var contact = this.props.vajra.contact;
    return contact.map((l, i) => {
      let color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      let abc = (
        <Avatar
          medium
          rounded
          title={l.name[0]}
          overlayContainerStyle={{ backgroundColor: color }}
        />
      );
      return (
        <ListItem
          key={i}
          title={l.name}
          hideChevron
          leftIcon={abc}
          titleStyle={{ marginLeft: 15 }}
        />
      );
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Search backgroundColor="red" />
        <ScrollView style={{ backgroundColor: "white" }}>
          <List style={{ marginTop: 0 }}>
            {this.renderList()}
          </List>
        </ScrollView>
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
