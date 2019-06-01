import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem } from "native-base";
import { Entypo } from '@expo/vector-icons';

export default class ViewContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.sate = {
      fname: "DummyText",
      lname: "DummyText",
      phone: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key: "DummyText"
    }
  }

  static navigationOptions = {
    title: "View Contact"
  };

  componentDidMount() {
    const { navigation }= this.props;
    navigation.addListener("WillFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key)
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactjsonString => {
        var contact = JSON.parse(contactjsonString);
        contact[key] = key;
        this.setState(contact)
      })
      .catch(error => {
        console.log(error)
      });
  }

  callAction = phone => {
    let phoneNumber = phone;
    //TODO:use regex to confirm correct format
    if (Platform.OS !== "android") {
      phoneNumber= `telpromt:${phone}`
    } else {
      phoneNumber = `tel:${phone}`
    }
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if (!supported) {
          Alert.alert("Phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch( error => {
        console.log(error)
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>View Contact</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
