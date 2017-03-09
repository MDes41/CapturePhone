
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
      vailSnow: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      vailCameras: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })


    };
  }

  componentDidMount() {
    this.getForecastForColorado(1);
    this.getWebcamForColorado(1);
  }

  getForecastForColorado(resort) {
    return fetch(`https://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.snowconditions
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({vailSnow: ds.cloneWithRows(response.filter((snow) => snow.resortID === resort))})
      })
      .catch((error) => {
        console.error(error);
      }).done();
  }
  

  getWebcamForColorado(resort) {
    return fetch(`https://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/mountaincams.ashx`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.mountainCameras
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({vailCameras: ds.cloneWithRows(response.filter((camera) => camera.resortID === resort))})

      })
      .catch((error) => {
        console.error(error);
      }).done();
  }

  render() {
    return (
      <ScrollView>
      <Text>Vail, CO</Text> 
      <MountainInfo cameras = {this.state.vailCameras} snow={this.state.vailSnow}/>
      </ScrollView>
    );
  }
}

class MountainInfo extends React.Component {
  render() {
    return (
      <View>
        <ListView
          dataSource={this.props.snow}
          renderRow={(rowData) => 
            <Text>New Snow: {rowData.newSnow} Last 48: {rowData.last48Hours}</Text>
          }
          style={styles.listView}
        />
        <ListView
          dataSource={this.props.cameras}
          renderRow={(rowData) => 
              <Image source={{uri: `https${rowData.imageURLString.substring(4)}`}} style={{width: 300, height: 200}}/>
            }
          style={styles.listView}
        />
      </View>
    );
  }
}


var styles = StyleSheet.create({

});
