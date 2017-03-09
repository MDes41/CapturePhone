
import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Fetch,
  ListView,
  StyleSheet
} from 'react-native';

import { StackNavigator } from 'react-navigation';


export class ColoradoSki extends React.Component {
  static navigationOptions = {
    title: 'Colorado Forecast',
  };

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.getForecastForColorado();
  }

  getForecastForColorado() {
    return fetch('https://api.wunderground.com/api/edee6fe2c5e6281b/forecast/q/CA/San_Francisco.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.forecast.simpleforecast.forecastday
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.setState({dataSource: ds.cloneWithRows(response)})
      })
      .catch((error) => {
        console.error(error);
      }).done();
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.conditions}</Text>}
          style={styles.listView}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listView: {
        backgroundColor: '#F5FCFF'
      }
});
