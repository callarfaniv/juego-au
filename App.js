import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dificultad from './src/screens/Dificultad';
import Normal from './src/screens/Normal';
import Dificil from './src/screens/Dificil';
import { LogBox } from 'react-native';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
        LogBox.ignoreAllLogs();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Dificultad'>
                <Stack.Screen name='Dificultad' component={Dificultad} />
                <Stack.Screen name='Normal' component={Normal} />
                <Stack.Screen name='Dificil' component={Dificil} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
