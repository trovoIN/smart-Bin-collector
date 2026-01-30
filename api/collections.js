import { API_BASE_URL, endpoints } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const markCollection = async (unitId, location = {}) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}${endpoints.collector.markCollection}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                unitId,
                latitude: location.latitude,
                longitude: location.longitude
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error?.message || 'Failed to mark collection';
            throw new Error(errorMessage);
        }

        return data.data;
    } catch (error) {
        console.error('Mark Collection Error:', error);
        throw error;
    }
};
