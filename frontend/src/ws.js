import { io } from 'socket.io-client';

export function connectWS() {
    return io('https://chat-backend-1-zh6a.onrender.com');
}
