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
    this.state = {
      search: ""
    };
  }
  componentWillMount() {
    FirebaseUtils.readContact();
  }
  renderList = () => {
    var contact = this.props.vajra.contact;
    return contact.map((l, i) => {
      if (l.name.toLowerCase().indexOf(this.state.search) !== -1) {
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
            titleStyle={{
              marginLeft: 15,
              fontSize: 17
            }}
          />
        );
      }
    });
  };
  setSearch = text => {
    this.setState({ search: text.toLowerCase() });
  };
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Search
          backgroundColor="red"
          onChangeText={text => this.setSearch(text)}
        />
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
