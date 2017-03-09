
import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Fetch,
  ListView,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

import { StackNavigator } from 'react-navigation';


export class ColoradoSki extends React.Component {
  static navigationOptions = {
    title: 'Colorado Forecast',
  };

  constructor(props){
    super(props);
    this.state = {
      vailData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      keystoneData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      cameras: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })


    };
  }

  componentDidMount() {
    this.getForecastForColorado('CO/Vail');
    this.getForecastForColorado('CO/Keystone');
    this.getWebcamForColorado();
  }

  getForecastForColorado(mountain) {
    return fetch(`https://api.wunderground.com/api/ea9af234390ace66/forecast/q/${mountain}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.forecast.simpleforecast.forecastday
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        if(mountain === 'CO/Vail') {
          this.setState({vailData: ds.cloneWithRows(response)})
        } else if (mountain === 'CO/Keystone') {
          this.setState({keystoneData: ds.cloneWithRows(response)})
        }
      })
      .catch((error) => {
        console.error(error);
      }).done();
  }
  

  getWebcamForColorado() {
    return fetch(`https://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountaincams.ashx`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.mountainCameras
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({cameras: ds.cloneWithRows(response)})

      })
      .catch((error) => {
        console.error(error);
      }).done();
  }

  render() {
    return (
      <ScrollView>
      <Text>Vail, CO</Text>
      <Image source={{ uri: 'https://common.snow.com/Mtncams/midvail.jpg'}} style={{width: 300, height: 200}}/>
        <ListView
          dataSource={this.state.vailData}
          renderRow={(rowData) => <Text>{rowData.snow_allday.cm}</Text>}
          style={styles.listView}
        />
        <ListView
          dataSource={this.state.cameras}
          renderRow={(rowData) => {
            rowData.resortID === 1 
              ? <Image source={{uri: `https${rowData.imageURLString.substring(4)}`}} style={{width: 300, height: 200}}/>
              : <Text></Text>
            }}
          style={styles.listView}
        />
      <Text>Keystone, CO</Text>
        <ListView
          dataSource={this.state.keystoneData}
          renderRow={(rowData) => <Text>{rowData.snow_allday.cm}</Text>}
          style={styles.listView}
        />
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({

});
