import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterUserScreen from './screens/RegisterUserScreen';
import RegisterProductScreen from './screens/RegisterProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RegisterUser">
                <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
                <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
                <Stack.Screen name="ProductList" component={ProductListScreen} />
                <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}