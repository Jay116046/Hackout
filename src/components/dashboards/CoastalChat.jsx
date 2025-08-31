import React, { useState, useEffect, useRef } from 'react';
import './CoastalChat.css'; // Import custom styles

// --- Helper Functions ---
const generateRandomUsername = () => {
    const adjectives = ['Coastal', 'Ocean', 'Wave', 'Tide', 'Beach', 'Shore', 'Marine', 'Deep', 'Blue', 'Surf'];
    const nouns = ['Walker', 'Watcher', 'Explorer', 'Guardian', 'Resident', 'Observer', 'Friend', 'Member'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 999) + 1;
    return `${adj}${noun}${num}`;
};

// --- Main Chat Component ---
const CoastalChat = () => {
    // --- State Management ---
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState({ name: '', id: '' });
    const [usersCount, setUsersCount] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    
    // --- Refs ---
    const ws = useRef(null);
    const messagesEndRef = useRef(null);

    // --- System Message Adder ---
    const addSystemMessage = (text, isError = false) => {
        const sysMessage = {
            type: 'system',
            text,
            isError,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, sysMessage]);
    };

    // --- Auto-scrolling Effect ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // --- Initial Welcome Message ---
    useEffect(() => {
        addSystemMessage('Welcome to Coastal Community Chat! Click "Connect to Broadcast" to join the live chat.');
    }, []);

    // --- WebSocket Connection Logic ---
    const connect = () => {
        if (ws.current) return; // Already connected or connecting

        const username = generateRandomUsername();
        const wsUrl = `wss://welcometofightclub-websocket-app.hf.space/ws/broadcast?username=${encodeURIComponent(username)}`;

        addSystemMessage(`Connecting as ${username}...`);
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('🔗 WebSocket Connected');
            setIsConnected(true);
            setCurrentUser({ name: username, id: '' });
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('📨 Received:', data);

            switch (data.type) {
                case 'welcome':
                    setCurrentUser(prev => ({ ...prev, id: data.your_user_id }));
                    setUsersCount(data.connected_users.length);
                    addSystemMessage(`Successfully connected as ${data.your_username}`);
                    break;
                case 'broadcast_message':
                    setMessages(prev => [...prev, { type: 'user', sender: data.sender_username, text: data.message, timestamp: data.timestamp, isMe: false }]);
                    break;
                case 'broadcast_sent':
                     setMessages(prev => [...prev, { type: 'user', sender: 'You', text: data.your_message, timestamp: data.timestamp, isMe: true }]);
                    break;
                case 'user_list_update':
                    setUsersCount(data.users.length);
                    break;
                case 'user_left':
                    addSystemMessage(data.message);
                    setUsersCount(data.total_connections);
                    break;
                case 'error':
                    addSystemMessage(data.message, true);
                    break;
                default:
                    console.warn('Unknown message type:', data.type);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            addSystemMessage('Connection error. Please try again.', true);
        };

        ws.current.onclose = () => {
            console.log('🔌 WebSocket Disconnected');
            setIsConnected(false);
            setCurrentUser({ name: '', id: '' });
            setUsersCount(0);
            ws.current = null;
            if (isConnected) { // Only show if it was an unexpected disconnect
                addSystemMessage('Disconnected from broadcast chat.');
            }
        };
    };

    const disconnect = () => {
        if (ws.current) {
            ws.current.close();
            addSystemMessage('Disconnected from broadcast chat.');
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && isConnected && ws.current) {
            ws.current.send(JSON.stringify({ type: 'broadcast', message: newMessage.trim() }));
            setNewMessage('');
        }
    };

    return (
        <div className="bg-gray-900 flex flex-col h-screen antialiased text-white font-inter">
            {/* Header and Controls */}
            <header className="bg-gray-800 text-white p-4 shadow-lg flex items-center justify-between">
                <h1 className="text-2xl font-bold">Coastal Community Chat</h1>
                <div className="flex items-center space-x-4">
                    {isConnected ? (
                        <button onClick={disconnect} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Disconnect</button>
                    ) : (
                        <button onClick={connect} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Connect to Broadcast</button>
                    )}
                </div>
            </header>

            {/* Main Chat and Info Section */}
            <main className="flex flex-1 overflow-hidden p-4 space-x-4">
                {/* Chat Window */}
                <div className="flex flex-col flex-1 bg-gray-800 rounded-xl shadow-lg p-6 overflow-hidden">
                    <div className="message-container space-y-4 pr-2 min-h-0">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start animate-fade-in ${msg.type === 'system' ? 'justify-center' : msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-sm rounded-lg p-3 shadow-md ${
                                    msg.type === 'system' ? (msg.isError ? 'bg-red-600' : 'bg-gray-600') :
                                    msg.isMe ? 'bg-blue-500 rounded-br-none' : 'bg-gray-700 rounded-bl-none'
                                }`}>
                                    <span className={`text-xs font-semibold mb-1 ${
                                        msg.type === 'system' ? 'text-gray-300' :
                                        msg.isMe ? 'text-blue-200' : 'text-gray-400'
                                    }`}>
                                        {msg.sender || 'System'}
                                        <span className="ml-2 opacity-75">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </span>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Form */}
                    <form onSubmit={handleSendMessage} className="mt-6 flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={isConnected ? 'Type your message...' : 'Connect to broadcast first...'}
                            disabled={!isConnected}
                            className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!isConnected || !newMessage.trim()}
                            className={`text-white font-bold py-3 px-6 rounded-r-lg transition-colors shadow-md ${
                                isConnected && newMessage.trim() ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Send
                        </button>
                    </form>
                </div>

                {/* User Info Card */}
                <aside className="w-80 bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Your Profile</h2>
                    <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                            {isConnected && currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : '?'}
                        </span>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg text-center break-words w-full">
                        <p className="text-sm text-gray-400 mb-2">Your broadcast username</p>
                        <p className="font-mono text-white text-sm break-all">{isConnected ? currentUser.name : 'Not connected'}</p>
                    </div>
                    <div className="mt-4 text-center w-full">
                        <p className="text-xs text-gray-400">
                            Status: <span className={isConnected ? 'text-green-400' : 'text-red-400'}>{isConnected ? 'Connected' : 'Disconnected'}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Users online: <span>{usersCount}</span></p>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default CoastalChat;