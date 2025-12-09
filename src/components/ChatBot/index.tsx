import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'ai', text: 'Hello! I am your Physical AI Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Add User Message
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // Fetch response from backend
            const response = await fetch('http://localhost:8001/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMessage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Network response was not ok');
            }

            const data = await response.json();
            const aiText = data.answer || "I'm having trouble processing that right now.";

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: aiText }]);
        } catch (error: any) {
            console.error('Chat error:', error);
            let errorMessage = "Sorry, I'm unable to connect to the server. Please ensure the backend is running.";

            if (error.message.includes("Rate limit") || error.message.includes("429")) {
                errorMessage = "I'm receiving too many requests right now. Please wait a minute and try again.";
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Toggle Button */}
            {!isOpen && (
                <button className={styles.toggleButton} onClick={toggleChat} aria-label="Open Chat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1c3.87 0 7 3.13 7 7 0 2.21-.89 4.21-2.34 5.66l-1.42-1.42C18.15 17.34 19 15.76 19 14c0-2.76-2.24-5-5-5h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                                <path d="M8 14H5v-2h3v2zm9 0h-3v-2h3v2z"></path>
                            </svg>
                            <span>Physical AI Tutor</span>
                        </div>
                        <button className={styles.closeButton} onClick={toggleChat} aria-label="Close Chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={clsx(styles.messageRow, msg.role === 'user' ? styles.userRow : styles.aiRow)}>
                                <div className={clsx(styles.avatar, msg.role === 'user' ? styles.userAvatar : styles.aiAvatar)}>
                                    {msg.role === 'user' ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2a10 10 0 0 1 10 10v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9a10 10 0 0 1 10-10z"></path>
                                            <circle cx="8" cy="13" r="1.5"></circle>
                                            <circle cx="16" cy="13" r="1.5"></circle>
                                            <path d="M10 17h4"></path>
                                        </svg>
                                    )}
                                </div>
                                <div className={clsx(styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble)}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className={styles.messageRow}>
                                <div className={clsx(styles.avatar, styles.aiAvatar)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2a10 10 0 0 1 10 10v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9a10 10 0 0 1 10-10z"></path>
                                    </svg>
                                </div>
                                <div className={styles.typing}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form className={styles.inputArea} onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ask a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className={styles.sendButton} disabled={!input.trim() || isLoading}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
