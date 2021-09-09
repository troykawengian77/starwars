import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(
            key, value
        );
    } catch (error) {
        // Error saving data
    }
};

export async function retrieveData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value
        }
    } catch (error) {
        // Error retrieving data
    }
};

export async function deleteData(key) {
    try {
        const value = await AsyncStorage.removeItem(key);
        if (value !== null) {
            // We have data!!
            return value
        }
    } catch (error) {
        // Error retrieving data
    }
};

export async function clearStorage() {
    try {
        AsyncStorage.clear()
    } catch (error) {
        // Error retrieving data
    }
};
