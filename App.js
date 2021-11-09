import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Home from './Home';
import AddListModal from './components/AddListModal';
import TodoList from './components/TodoList';
import TodoModal from './components/TodoModal';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddListModal" component={AddListModal} />
        <Stack.Screen name="TodoModal" component={TodoModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
