import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  NetInfo
} from "react-native";
import Search from "react-native-search-box";
import * as FirebaseUtils from "../Services/Firebase";
import { Actions } from "jumpstate";
import { connect } from "react-redux";
import { List, ListItem, Avatar, Icon } from "react-native-elements";
import Communications from "react-native-communications";
import Modal from "react-native-modalbox";
import randomColor from "randomcolor";
import ActionButton from "react-native-action-button";
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
  },
  text1: {
    color: "white",
    fontSize: 20
  }
});
class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    FirebaseUtils.initializeFirebase();
    this.state = {
      search: "",
      number: [],
      status: true
    };
  }
  componentWillMount() {
    FirebaseUtils.readContact();
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener("change", this.handleConnectionChange);
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "change",
      this.handleConnectionChange
    );
  }
  handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
  };
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
              fontSize: 15
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
  renderContacts = () => {
    if (this.state.status === true) {
      if (this.props.vajra.loader === 0) {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
            <Text style={{ color: "#8e1516", fontWeight: "bold" }}>
              Powered by www.hobdev.com{" "}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <ScrollView style={{ backgroundColor: "white" }}>
              <List style={{ marginTop: 0 }}>
                {this.renderList()}
              </List>
            </ScrollView>
            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => {
                this.refreshContact();
              }}
              icon={<Icon color="white" name="cached" />}
            />
          </View>
        );
      }
    } else {
      alert("No Internet,Connect to Internet!!!!");
      return <View />;
    }
  };
  refreshContact = () => {
    Actions.VajraApp.setLoader();
    FirebaseUtils.readContact();
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
            backgroundColor: "black"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={style.text1}>BITDirectory</Text>
          </View>
          <Search
            backgroundColor="#8e1516"
            onChangeText={text => this.setSearch(text)}
            onCancel={() => this.setSearch("")}
            onDelete={() => this.setSearch("")}
          />
        </View>
        <View style={{ flex: 7 }}>
          {this.renderContacts()}
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
