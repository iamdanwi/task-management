import React, { useState, useEffect } from 'react';
import { Notification } from '../../lib/websocket';
import { initializeNotifications } from '../../lib/notifications';

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const init = async () => {
            cleanup = await initializeNotifications((notification) => {
                setNotifications(prev => [notification, ...prev].slice(0, 10));
            });
        };

        init();

        return () => {
            if (cleanup) {
                cleanup();
            }
        };
    }, []);

    return (
        <div className="relative">
            <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="py-2">
                        {notifications.length === 0 ? (
                            <p className="px-4 py-2 text-gray-500">No new notifications</p>
                        ) : (
                            notifications.map((notification, index) => (
                                <div key={index} className="px-4 py-2 hover:bg-gray-50">
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
