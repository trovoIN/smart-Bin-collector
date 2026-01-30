// Basic configuration for API
// REPLACE with your computer's IP address if testing on physical device
// For Android Emulator, use 'http://10.0.2.2:3000/api'
export const API_BASE_URL = 'http://192.168.0.105:3000/api';

export const endpoints = {
    auth: {
        requestOtp: '/auth/request-otp',
        verifyOtp: '/auth/verify-otp',
    },
    collector: {
        profile: '/collector/profile',
        resolveQr: '/collector/qr/resolve',
        markCollection: '/collector/collection/mark',
        register: '/collector/unit/register',
    }
};
