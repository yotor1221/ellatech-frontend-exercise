import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const RegisterUserScreen = ({ navigation }) => {
    const [user, setUser] = useState({ email: '', fullName: '' });

    const validateUser = () => {
        if (!user.email.includes('@') || !user.email.includes('.')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }
        if (!user.fullName.trim()) {
            Alert.alert('Error', 'Full name is required');
            return false;
        }
        return true;
    };

    const handleRegisterUser = () => {
        if (validateUser()) {
            Alert.alert('Success', `User ${user.fullName} registered!`);
            setUser({ email: '', fullName: '' });
            navigation.navigate('RegisterProduct');
        }
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-lg font-bold mb-2">Register User</Text>
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="Email"
                value={user.email}
                onChangeText={text => setUser({ ...user, email: text })}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="Full Name"
                value={user.fullName}
                onChangeText={text => setUser({ ...user, fullName: text })}
            />
            <Button title="Register User" onPress={handleRegisterUser} />
            <Button
                title="Go to Register Product"
                onPress={() => navigation.navigate('RegisterProduct')}
            />
            <Button
                title="Go to Product List"
                onPress={() => navigation.navigate('ProductList')}
            />
            <Button
                title="Go to Transaction History"
                onPress={() => navigation.navigate('TransactionHistory')}
            />
        </View>
    );
};

export default RegisterUserScreen;