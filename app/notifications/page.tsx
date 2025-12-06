'use client';

import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-profile';
import { getRelativeTime } from '@/lib/demo-community';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  const filteredNotifications = notifications.filter((notif) =>
    filter === 'all' ? true : !notif.read
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100';
      case 'price':
        return 'bg-yellow-100';
      case 'disease':
        return 'bg-red-100';
      case 'community':
        return 'bg-green-100';
      case 'system':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-[#16A34A] to-[#92400E] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold font-hind">নোটিফিকেশন</h1>
              {unreadCount > 0 && (
                <p className="text-white/80 text-sm mt-1">
                  {unreadCount}টি অপঠিত বার্তা
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={markAllRead}
              >
                <Check className="h-4 w-4 mr-2" />
                সব পড়া হয়েছে
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className={
              filter === 'all'
                ? 'bg-[#16A34A] hover:bg-[#15803D]'
                : 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
            }
            onClick={() => setFilter('all')}
          >
            সব
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            className={
              filter === 'unread'
                ? 'bg-[#16A34A] hover:bg-[#15803D]'
                : 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
            }
            onClick={() => setFilter('unread')}
          >
            অপঠিত {unreadCount > 0 && `(${unreadCount})`}
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`p-4 hover:shadow-md transition-shadow ${
                !notif.read ? 'border-l-4 border-l-[#16A34A] bg-[#16A34A]/5' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${getIconBg(notif.type)} rounded-full p-3 text-2xl`}>
                  {notif.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold font-hind">{notif.titleBn}</h3>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notif.messageBn}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {notif.typeBn}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {getRelativeTime(notif.time)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRead(notif.id)}
                        className="text-[#16A34A] hover:bg-[#16A34A]/10"
                      >
                        {notif.read ? 'অপঠিত' : 'পড়া হয়েছে'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notif.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <p className="text-gray-500 mb-2">
              {filter === 'all'
                ? 'কোনো নোটিফিকেশন নেই'
                : 'কোনো অপঠিত নোটিফিকেশন নেই'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
