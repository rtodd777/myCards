// -------------------------------------------------------------------
// Object Name.... app.js
// Description.... Main App Module
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Constants from 'expo-constants';

import { View, StatusBar } from 'react-native';

// Local Imports
import { purple } from './src/utils/colors';
import reducer from './src/reducers/index';
import { MainNavigator  } from './src/components/Tabs';


// Customized Status Bar
// -------------------------------------------------------------------
function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


// Rendor the Code
// -------------------------------------------------------------------
export default class App extends React.Component {
  render() {
    const store = createStore(reducer,{}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

