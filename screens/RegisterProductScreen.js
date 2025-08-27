import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const RegisterProductScreen = ({ navigation, products, setProducts, setTransactions }) => {
    const [product, setProduct] = useState({ sku: '', name: '', price: '', quantity: '' });

    const validateProduct = () => {
        if (!product.sku.trim()) {
            Alert.alert('Error', 'SKU is required');
            return false;
        }
        if (products.some(p => p.sku === product.sku)) {
            Alert.alert('Error', 'SKU must be unique');
            return false;
        }
        if (!product.name.trim()) {
            Alert.alert('Error', 'Product name is required');
            return false;
        }
        if (isNaN(product.price) || product.price <= 0) {
            Alert.alert('Error', 'Price must be a positive number');
            return false;
        }
        if (isNaN(product.quantity) || product.quantity < 0) {
            Alert.alert('Error', 'Quantity must be a non-negative number');
            return false;
        }
        return true;
    };

    const handleRegisterProduct = () => {
        if (validateProduct()) {
            const newProduct = {
                ...product,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity),
                lastUpdated: new Date().toISOString(),
            };
            setProducts([...products, newProduct]);
            setTransactions([
                ...transactions,
                {
                    id: Date.now(),
                    type: 'register',
                    sku: product.sku,
                    name: product.name,
                    quantity: product.quantity,
                    timestamp: new Date().toISOString(),
                },
            ]);
            setProduct({ sku: '', name: '', price: '', quantity: '' });
            Alert.alert('Success', 'Product registered!');
            navigation.navigate('ProductList');
        }
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-lg font-bold mb-2">Register Product</Text>
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="SKU"
                value={product.sku}
                onChangeText={text => setProduct({ ...product, sku: text })}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="Product Name"
                value={product.name}
                onChangeText={text => setProduct({ ...product, name: text })}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="Price"
                keyboardType="numeric"
                value={product.price}
                onChangeText={text => setProduct({ ...product, price: text })}
            />
            <TextInput
                className="border border-gray-300 p-2 mb-2 rounded"
                placeholder="Quantity"
                keyboardType="numeric"
                value={product.quantity}
                onChangeText={text => setProduct({ ...product, quantity: text })}
            />
            <Button title="Register Product" onPress={handleRegisterProduct} />
            <Button
                title="Go to Product List"
                onPress={() => navigation.navigate('ProductList')}
            />
            <Button
                title="Go to Transaction History"
                onPress={() => navigation.navigate('TransactionHistory')}
            />
            <Button
                title="Back to Register User"
                onPress={() => navigation.navigate('RegisterUser')}
            />
        </View>
    );
};

export default RegisterProductScreen;