'use client';

import { useState } from 'react';
import { T, Plural, Branch, Num, Var } from 'gt-next';
import { useGT } from 'gt-next';
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

  const gt = useGT();

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      {/* Example app disclaimer */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-8 text-xs text-gray-500 text-center">
        <T>
          This is an example app built with{' '}
          <a
            href="https://generaltranslation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            General Translation
          </a>{' '}
          to demonstrate the <Var>{'<Plural>'}</Var> and <Var>{'<Branch>'}</Var> components.{' '}
          <a
            href="https://github.com/gt-examples/plural-and-branch"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            View source on GitHub
          </a>.
        </T>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          <T>Notification Inbox</T>
        </h1>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/gt-examples/plural-and-branch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={gt("View on GitHub")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <LocaleSelector />
        </div>
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
              The{' '}
              <a href="https://generaltranslation.com/en-US/docs/next/api/components/plural" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">Plural</a>{' '}
              component selects singular, plural, or zero forms
              based on the count value. This handles languages with complex{' '}
              <a href="https://cldr.unicode.org/index/cldr-spec/plural-rules" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">CLDR plural rules</a>{' '}
              automatically.
            </T>
          </p>
          <p>
            <T>
              The{' '}
              <a href="https://generaltranslation.com/en-US/docs/next/api/components/branch" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">Branch</a>{' '}
              component renders different content based on a string
              key. Each notification type (message, alert, update) gets its own
              translated text.
            </T>
          </p>
          <p>
            <T>
              Try switching languages with the selector above. Dismiss
              notifications to see the plural counts update in real time.
              Learn more in the{' '}
              <a href="https://generaltranslation.com/docs" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">General Translation docs</a>.
            </T>
          </p>
        </div>
      </div>
    </div>
  );
}
