import { API_BASE_URL, endpoints } from './config';

export const requestOtp = async (phone) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoints.auth.requestOtp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: `+91${phone}`, role: 'COLLECTOR' }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to request OTP');
        }

        return data;
    } catch (error) {
        console.error('Request OTP Error:', error);
        throw error;
    }
};

export const verifyOtp = async (phone, otp) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoints.auth.verifyOtp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: `+91${phone}`, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to verify OTP');
        }

        return data;
    } catch (error) {
        console.error('Verify OTP Error:', error);
        throw error;
    }
};
