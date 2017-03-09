
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
      }),
      keystoneSnow: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      keystoneCameras: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })


    };
  }

  componentDidMount() {
    this.getForecastForColorado();
    this.getWebcamForColorado();
  }

  getForecastForColorado() {
    return fetch(`https://www.epicmix.com/vailresorts/sites/epicmix/api/mobile/weather.ashx`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.snowconditions
      })
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({vailSnow: ds.cloneWithRows(response.filter((snow) => snow.resortID === 1))})
          this.setState({keystoneSnow: ds.cloneWithRows(response.filter((snow) => snow.resortID === 4))})
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
          this.setState({vailCameras: ds.cloneWithRows(response.filter((camera) => camera.resortID === 1))})
          this.setState({keystoneCameras: ds.cloneWithRows(response.filter((camera) => camera.resortID === 4))})

      })
      .catch((error) => {
        console.error(error);
      }).done();
  }

  render() {
    return (
      <ScrollView>
      <Text style={styles.heading}>Vail, CO</Text> 
      <MountainInfo cameras = {this.state.vailCameras} snow={this.state.vailSnow}/>
      <Text style={styles.heading}>Keystone, CO</Text> 
      <MountainInfo cameras = {this.state.keystoneCameras} snow={this.state.keystoneSnow}/>
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
            <Text style={styles.snowText} >New Snow: {rowData.newSnow} Last 48: {rowData.last48Hours}</Text>
          }
          style={styles.snow}
        />
        <ListView
          dataSource={this.props.cameras}
          renderRow={(rowData) => 
              <Image  source={{uri: `https${rowData.imageURLString.substring(4)}`}} style={styles.cameras}/>
            }
          style={styles.camerasList}
        />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  camerasList: {fontSize: 26,
          flex: 1,
          padding: 12,
          flexDirection: 'row',
          alignSelf: 'center',
          borderRadius: 20,
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderColor: 'white',
          borderWidth: 5,
          marginTop: 20},
  cameras: { height: 200,
              width: 300,
              borderRadius: 20,
              paddingBottom: 20,
              marginBottom: 24},
  snowText: { fontSize: 26,
              textAlign: 'center'},
  heading: {fontSize: 32,
            textAlign: 'center'}
});
