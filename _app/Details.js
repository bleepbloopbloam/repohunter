import React, {Component} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import Axios from 'axios';
import styles from './styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {ScrollView} from 'react-native-gesture-handler';

export class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      branchesList: null,
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    Axios.get(this.props.route.params.url + '/branches')
      .then(res => {
        this.setState({loading: false});
        if (res.data != undefined) {
          this.setState({branchesList: res.data});
        }
      })
      .catch(err => {
        this.setState({loading: false});
        alert(err);
      });
  }

  backBtn = () => {
    this.props.navigation.navigate('Main');
  };

  render() {
    const brachesScreen = (
      <View style={{flex: 1}}>
        {/* <Button title="Go Back" onPress={() => this.backBtn()} /> */}

        <ScrollView>
          {this.state.branchesList && !this.state.loading ? (
            <View>
              <Text style={(styles.text, {textAlign: 'center', fontSize: 24})}>
                Branches in {this.props.route.params.name}:
              </Text>
              <View style={{margin: 4}}>
                {this.state.branchesList.map((branch, index) => {
                  return (
                    <Text key={index} style={styles.text}>
                      {branch.name}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : (
            <Text style={styles.text}>Loading branches...</Text>
          )}
        </ScrollView>
      </View>
    );

    const wrapper =
      Platform.OS !== 'ios' ? (
        <GestureRecognizer
          onSwipeRight={() => this.backBtn()}
          style={{
            flex: 1,
          }}>
          {brachesScreen}
        </GestureRecognizer>
      ) : (
        brachesScreen
      );

    return wrapper;
  }
}

export default Details;
