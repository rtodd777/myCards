// -------------------------------------------------------------------
// Object Name.... Tabs.js
// Description.... Tab Navigation
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import { TabNavigator, StackNavigator } from 'react-navigation';

// Local Imports
import DeckList from './DeckList';
import AddNewDeck from './AddNewDeck';
import DeckDetail  from './DeckDetail';
import AddCard from './AddCard';
import QuizView from './QuizView';
import SplashScreen from './SplashScreen';
import { Platform } from 'react-native';
import { white, orange, purple } from '../utils/colors';


// Tab Navigation
// -------------------------------------------------------------------
export const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'View Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-variant" size={100} color={orange} /> 
    }
  },
  NewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-box' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    title: 'My Cards',
    headerStyle: {
      backgroundColor: purple,
      elevation: 0,
      height: 36,
      alignItems: 'center'
    },
    headerTitleStyle: { 
      color: white
    }
  },
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : orange,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? orange : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


// Stack Navigation
// -------------------------------------------------------------------
export const MainNavigator = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz View',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})