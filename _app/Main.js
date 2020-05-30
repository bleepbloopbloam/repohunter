import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import Axios from 'axios';
import styles from './styles';

const url = 'https://api.github.com/search/repositories?q=';

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: null,
      refreshing: false,
    };
  }

  searchRepo = refresh => {
    const query = this.state.searchQuery;
    if (query == '' || query == null || query == undefined) {
      return;
    }

    this.setState({refreshing: true});
    if (!refresh) this.setState({searchResults: null});
    Axios.get(url + query)
      .then(res => {
        this.setState({refreshing: false});
        if (res.data != undefined && res.data != []) {
          this.setState({searchResults: res.data});
        }
      })
      .catch(err => {
        this.setState({refreshing: false});
        alert('Error! ' + err);
      });
  };

  renderTile = (item, index) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        key={index}
        onPress={() =>
          this.props.navigation.navigate('Details', {
            url: item.url,
            name: item.name,
          })
        }>
        <View
          style={{
            borderWidth: 2,
            margin: 2,
            backgroundColor: '#ddd',
          }}>
          <View style={{flexDirection: 'row', height: 100}}>
            <Image style={{flex: 1}} source={{uri: item.owner.avatar_url}} />
            <Text style={(styles.text, {flex: 3, textAlign: 'center'})}>
              Name: {item.name}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={(styles.text, {flex: 3})}>
              Description: {item.description}
            </Text>
            <Text style={(styles.text, {flex: 1})}>
              Stars:
              {item.stargazers_count}
            </Text>
            <Text style={(styles.text, {flex: 1})}>
              Watchers: {item.watchers_count}
            </Text>
            <Text style={(styles.text, {flex: 1})}>
              Forks: {item.forks_count}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={{alignContent: 'center'}}>
        <View style={{flexDirection: 'row', margin: 3}}>
          <TextInput
            style={{
              backgroundColor: 'white',
              fontSize: 24,
              flex: 9,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: 'green',
            }}
            placeholder="Type repo name here"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => this.searchRepo()}
            ref={ref => {
              this.inputText = ref;
            }}
            onChangeText={searchQuery =>
              this.setState({searchQuery: searchQuery})
            }
            value={this.state.searchQuery}
          />

          <Button
            style={{flex: 3}}
            disabled={this.state.refreshing}
            title="Hunt"
            onPress={() => this.searchRepo()}
          />
        </View>
        {!this.state.searchResults && this.state.refreshing && (
          <Text style={styles.text}>Loading...</Text>
        )}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.searchRepo(true)}
            />
          }>
          {this.state.searchResults &&
            this.state.searchResults.items.map((item, index) =>
              this.renderTile(item, index),
            )}
        </ScrollView>
      </View>
    );
  }
}

export default Main;
