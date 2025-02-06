// src/iphone-app/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutsPage from './pages/WorkoutsPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Workouts">
        <Stack.Screen name="Workouts" component={WorkoutsPage} />
        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
