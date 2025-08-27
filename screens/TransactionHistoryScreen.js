import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const TransactionHistoryScreen = ({ navigation, transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    return (
        <View className="flex-1 p-4 bg-gray-100">
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
            <Button
                title="Go to Register Product"
                onPress={() => navigation.navigate('RegisterProduct')}
            />
            <Button
                title="Go to Product List"
                onPress={() => navigation.navigate('ProductList')}
            />
            <Button
                title="Back to Register User"
                onPress={() => navigation.navigate('RegisterUser')}
            />
        </View>
    );
};

export default TransactionHistoryScreen;