import { API_BASE_URL, endpoints } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resolveQr = async (qrToken) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}${endpoints.collector.resolveQr}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ qrToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error?.message || 'Failed to resolve QR';
            throw new Error(errorMessage);
        }

        return data.data; // Usually returns { unit: ..., status: ... }
    } catch (error) {
        console.error('Resolve QR Error:', error);
        throw error;
    }
};

export const takeUpUnit = async (qrToken) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}${endpoints.collector.register}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ qrToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error?.message || 'Failed to take up unit';
            throw new Error(errorMessage);
        }

        return data.data;
    } catch (error) {
        console.error('Take Up Error:', error);
        throw error;
    }
};
