import React, { Component } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import Search from "react-native-search-box";
import firebase from "firebase";
import * as FirebaseUtils from "../Services/Firebase";
import Actions from "jumpstate";
import { connect } from "react-redux";
import { List, ListItem, Avatar } from "react-native-elements";
import Communications from "react-native-communications";
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
  checkCall = name => {
    var contact = this.props.vajra.contact;
    var num = [];
    contact.map((l, i) => {
      if (l.name === name) num = l.number;
    });
    if (num.length === 1) {
      Communications.phonecall(num[0], false);
    }
  };
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
            onPress={() => this.checkCall(l.name)}
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
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "#1a237e"
          }}
        >
          <Search
            backgroundColor="#1a237e"
            onChangeText={text => this.setSearch(text)}
            onCancel={() => this.setSearch("")}
            onDelete={() => this.setSearch("")}
          />
        </View>
        <View style={{ flex: 7 }}>
          <ScrollView style={{ backgroundColor: "white" }}>
            <List style={{ marginTop: 0 }}>
              {this.renderList()}
            </List>
          </ScrollView>
        </View>
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
