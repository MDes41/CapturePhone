
import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Button,
  Fetch
} from 'react-native';

import { StackNavigator } from 'react-navigation';


export class ColoradoSki extends React.Component {
  static navigationOptions = {
    title: 'Colorado Forecast',
  };

  getForecastForColorado() {
    return fetch('https://api.wunderground.com/api/edee6fe2c5e6281b/forecast/q/CA/San_Francisco.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.forecast.simpleforecast.forecastday[0].conditions
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error);
      }).done();
  }
  
  render() {
    var forecasts = this.getForecastForColorado()
    return (
      <View>
       <Text>{forecasts}</Text>
      </View>
    );
  }


}
