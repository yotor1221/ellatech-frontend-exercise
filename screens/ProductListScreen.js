import React from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';

const ProductListScreen = ({ navigation, products, setProducts, setTransactions }) => {
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

    return (
        <View className="flex-1 p-4 bg-gray-100">
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
            <Button
                title="Go to Register Product"
                onPress={() => navigation.navigate('RegisterProduct')}
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

export default ProductListScreen;