
import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { ColoradoSki } from './colorado';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, This is a snow forecast app!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Colorado"
        />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ColoradoSki }
});

AppRegistry.registerComponent('CapturePhone', () => SimpleApp);


