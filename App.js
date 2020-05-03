import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ResultScreen from './src/screens/ResultScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import Foundation from '@expo/vector-icons/Foundation';
import IonIcons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info.componentStack)
  }

  render() {
    return this.state.hasError
      ? <FallbackComponent />
      : this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: 'easyKU' }}
          >
            {() => <Tabs.Navigator
              initialRouteName="Result"
            >
              <Tabs.Screen
                name="Result"
                component={ResultScreen}
                options={{ title: 'Results', tabBarIcon: ({ focused }) => <Foundation name="results" size={30} color={focused ? "lightblue": "black"} /> }}
              />
              <Tabs.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ title: 'Notifications', tabBarIcon: ({ focused }) => <IonIcons name="md-information-circle" size={30} color={focused ? "lightblue": "black"} /> }}
              />
            </Tabs.Navigator>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
