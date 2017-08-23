import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import Search from "react-native-search-box";
import firebase from "firebase";
import * as FirebaseUtils from "../Services/Firebase";
import Actions from "jumpstate";
import { connect } from "react-redux";
import { List, ListItem, Avatar } from "react-native-elements";
import Communications from "react-native-communications";
import Modal from "react-native-modalbox";
import randomColor from "randomcolor";
// Styles
import styles from "./Styles/LaunchScreenStyles";
const style = StyleSheet.create({
  modal: {
    justifyContent: "center"
  },

  modal3: {
    height: 200,
    width: 300
  },

  text: {
    color: "black",
    fontSize: 22
  }
});
class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    FirebaseUtils.initializeFirebase();
    this.state = {
      search: "",
      number: []
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
    } else {
      this.setState({ number: num });
      this.refs.modal3.open();
    }
  };
  call = l => {
    Communications.phonecall(l, false);
  };
  renderList = () => {
    var contact = this.props.vajra.contact;
    return contact.map((l, i) => {
      if (l.name.toLowerCase().indexOf(this.state.search) !== -1) {
        let color = randomColor();
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
  renderContent = () => {
    var num = this.state.number;
    return num.map((l, i) => {
      return (
        <ListItem
          key={i}
          title={l}
          hideChevron
          leftIcon={{ name: "call" }}
          titleStyle={{
            marginLeft: 15,
            fontSize: 17
          }}
          onPress={() => this.call(l)}
        />
      );
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Modal
          style={[style.modal, style.modal3]}
          position={"center"}
          ref={"modal3"}
        >
          <View style={{ flex: 1, justifyContent: "flex-end", padding: 15 }}>
            <Text style={style.text}>Choose Number </Text>
          </View>
          <View style={{ flex: 3 }}>
            {this.renderContent()}
          </View>
        </Modal>
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
