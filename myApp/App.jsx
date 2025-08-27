import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, Alert } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

const App = () => {
    // State for user registration
    const [user, setUser] = useState({ email: '', fullName: '' });
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ sku: '', name: '', price: '', quantity: '' });
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Validation for user registration
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

    // Validation for product registration
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

    // Handle user registration
    const handleRegisterUser = () => {
        if (validateUser()) {
            Alert.alert('Success', `User ${user.fullName} registered!`);
            setUser({ email: '', fullName: '' });
        }
    };

    // Handle product registration
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
        }
    };

    // Adjust product stock
    const adjustStock = (sku, change) => {
        const updatedProducts = products.map(p => {
            if (p.sku === sku) {
                const newQuantity = p.quantity + change;
                if (newQuantity < 0) {
                    Alert.alert('Error', 'Stock cannot go negative');
                    return p;
                }
                return {
                    ...p,
                    quantity: newQuantity,
                    lastUpdated: new Date().toISOString(),
                };
            }
            return p;
        });
        setProducts(updatedProducts);
        const product = products.find(p => p.sku === sku);
        setTransactions([
            ...transactions,
            {
                id: Date.now(),
                type: change > 0 ? 'add' : 'remove',
                sku,
                name: product.name,
                quantity: Math.abs(change),
                timestamp: new Date().toISOString(),
            },
        ]);
    };

    // Pagination for transaction history
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    return (
        <ScrollView className="flex-1 p-4 bg-gray-100">
            {/* User Registration */}
            <View className="mb-6">
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
            </View>

            {/* Product Registration */}
            <View className="mb-6">
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
            </View>

            {/* Product List */}
            <View className="mb-6">
                <Text className="text-lg font-bold mb-2">Products</Text>
                <FlatList
                    data={products}
                    keyExtractor={item => item.sku}
                    renderItem={({ item }) => (
                        <View className="p-4 mb-2 bg-white rounded shadow">
                            <Text>SKU: {item.sku}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Price: ${item.price.toFixed(2)}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Last Updated: {new Date(item.lastUpdated).toLocaleString()}</Text>
                            <View className="flex-row mt-2">
                                <Button title="+1" onPress={() => adjustStock(item.sku, 1)} />
                                <Button title="-1" onPress={() => adjustStock(item.sku, -1)} />
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* Transaction History */}
            <View className="mb-6">
                <Text className="text-lg font-bold mb-2">Transaction History</Text>
                <FlatList
                    data={paginatedTransactions}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="p-4 mb-2 bg-white rounded shadow">
                            <Text>
                                {item.type === 'register'
                                    ? `Registered ${item.name} (SKU: ${item.sku}) with ${item.quantity} units`
                                    : `${item.type === 'add' ? 'Added' : 'Removed'} ${item.quantity} units of ${item.name} (SKU: ${item.sku})`}
                            </Text>
                            <Text>Time: {new Date(item.timestamp).toLocaleString()}</Text>
                        </View>
                    )}
                />
                <View className="flex-row justify-between mt-2">
                    <Button
                        title="Previous"
                        disabled={currentPage === 1}
                        onPress={() => setCurrentPage(currentPage - 1)}
                    />
                    <Text>Page {currentPage} of {totalPages}</Text>
                    <Button
                        title="Next"
                        disabled={currentPage === totalPages}
                        onPress={() => setCurrentPage(currentPage + 1)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default App;