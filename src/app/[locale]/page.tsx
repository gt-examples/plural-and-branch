'use client';

import { useState } from 'react';
import { T, Plural, Branch, Num, Var } from 'gt-next';
import { LocaleSelector } from 'gt-next/client';

type NotificationType = 'message' | 'alert' | 'update';

interface Notification {
  id: number;
  type: NotificationType;
  from: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'message', from: 'Alice' },
  { id: 2, type: 'alert', from: 'System' },
  { id: 3, type: 'message', from: 'Bob' },
  { id: 4, type: 'update', from: 'Platform' },
  { id: 5, type: 'message', from: 'Carol' },
  { id: 6, type: 'alert', from: 'Security' },
  { id: 7, type: 'update', from: 'Admin' },
];

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>(
    SAMPLE_NOTIFICATIONS
  );

  const count = notifications.length;
  const messageCount = notifications.filter((n) => n.type === 'message').length;
  const alertCount = notifications.filter((n) => n.type === 'alert').length;
  const updateCount = notifications.filter((n) => n.type === 'update').length;

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const reset = () => {
    setNotifications(SAMPLE_NOTIFICATIONS);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          <T>Notification Inbox</T>
        </h1>
        <LocaleSelector />
      </div>

      {/* Summary with Plural */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          <T>Summary</T>
        </h2>
        <p className="text-lg mb-2">
          <T>
            <Plural
              n={count}
              singular={<>You have <Num>{count}</Num> notification.</>}
              plural={<>You have <Num>{count}</Num> notifications.</>}
              zero={<>You have no notifications.</>}
            />
          </T>
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <T>
              <Plural
                n={messageCount}
                singular={<><Num>{messageCount}</Num> message</>}
                plural={<><Num>{messageCount}</Num> messages</>}
                zero={<>No messages</>}
              />
            </T>
          </p>
          <p>
            <T>
              <Plural
                n={alertCount}
                singular={<><Num>{alertCount}</Num> alert</>}
                plural={<><Num>{alertCount}</Num> alerts</>}
                zero={<>No alerts</>}
              />
            </T>
          </p>
          <p>
            <T>
              <Plural
                n={updateCount}
                singular={<><Num>{updateCount}</Num> update</>}
                plural={<><Num>{updateCount}</Num> updates</>}
                zero={<>No updates</>}
              />
            </T>
          </p>
        </div>
      </div>

      {/* Notification list with Branch */}
      <div className="space-y-3 mb-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Branch
                  branch={notification.type}
                  message={
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  }
                  alert={
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                  }
                  update={
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  }
                />
                <span className="text-sm font-medium">
                  <T>
                    <Branch
                      branch={notification.type}
                      message={<>New message from <Var>{notification.from}</Var></>}
                      alert={<>Alert from <Var>{notification.from}</Var></>}
                      update={<>Update from <Var>{notification.from}</Var></>}
                    />
                  </T>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                <T>
                  <Branch
                    branch={notification.type}
                    message="You received a direct message."
                    alert="An alert requires your attention."
                    update="A system update is available."
                  />
                </T>
              </p>
            </div>
            <button
              onClick={() => dismiss(notification.id)}
              className="text-gray-400 hover:text-gray-600 text-sm ml-4"
            >
              <T>Dismiss</T>
            </button>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="mb-4">
            <T>All caught up. No notifications remaining.</T>
          </p>
          <button
            onClick={reset}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <T>Reset notifications</T>
          </button>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <T>Reset all</T>
          </button>
        </div>
      )}

      {/* Explanation */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold mb-4">
          <T>How it works</T>
        </h2>
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            <T>
              The Plural component selects singular, plural, or zero forms
              based on the count value. This handles languages with complex
              plural rules automatically.
            </T>
          </p>
          <p>
            <T>
              The Branch component renders different content based on a string
              key. Each notification type (message, alert, update) gets its own
              translated text.
            </T>
          </p>
          <p>
            <T>
              Try switching languages with the selector above. Dismiss
              notifications to see the plural counts update in real time.
            </T>
          </p>
        </div>
      </div>
    </div>
  );
}
