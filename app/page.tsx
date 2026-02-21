'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  VeltProvider,
  VeltComments,
  VeltCommentTool,
  VeltCommentsSidebar,
  useSetDocument,
  useVeltClient,
} from '@veltdev/react';

// ──────────────────────────────────────────
// Data
// ──────────────────────────────────────────
const ALL_USERS = [
  { userId: 'user-1',  name: 'Alice Johnson',   email: 'alice@example.com',   photoUrl: 'https://placehold.co/400x400/667eea/fff?text=A', color: '#667eea' },
  { userId: 'user-2',  name: 'Bob Smith',       email: 'bob@example.com',     photoUrl: 'https://placehold.co/400x400/764ba2/fff?text=B', color: '#764ba2' },
  { userId: 'user-3',  name: 'Charlie Brown',   email: 'charlie@example.com', photoUrl: 'https://placehold.co/400x400/f093fb/fff?text=C', color: '#f093fb' },
  { userId: 'user-4',  name: 'Diana Prince',    email: 'diana@example.com',   photoUrl: 'https://placehold.co/400x400/4facfe/fff?text=D', color: '#4facfe' },
  { userId: 'user-5',  name: 'Ethan Hunt',      email: 'ethan@example.com',   photoUrl: 'https://placehold.co/400x400/43e97b/fff?text=E', color: '#43e97b' },
  { userId: 'user-6',  name: 'Fiona Gallagher', email: 'fiona@example.com',   photoUrl: 'https://placehold.co/400x400/f5576c/fff?text=F', color: '#f5576c' },
  { userId: 'user-7',  name: 'George Lucas',    email: 'george@example.com',  photoUrl: 'https://placehold.co/400x400/feca57/fff?text=G', color: '#feca57' },
  { userId: 'user-8',  name: 'Hannah Montana',  email: 'hannah@example.com',  photoUrl: 'https://placehold.co/400x400/ff6b6b/fff?text=H', color: '#ff6b6b' },
  { userId: 'user-9',  name: 'Ivan Drago',      email: 'ivan@example.com',    photoUrl: 'https://placehold.co/400x400/a29bfe/fff?text=I', color: '#a29bfe' },
  { userId: 'user-10', name: 'Julia Roberts',   email: 'julia@example.com',   photoUrl: 'https://placehold.co/400x400/fd79a8/fff?text=J', color: '#fd79a8' },
];

const FILTERED_USERS = ALL_USERS.slice(0, 5);
const FILTERED_USER_IDS = new Set(FILTERED_USERS.map(u => u.userId));

const ORGANIZATION = { id: 'org-1', name: 'Acme Corporation', organizationId: 'org-1' };
const DOCUMENT = { id: 'doc-filter-test', name: 'Filter Test Doc', documentId: 'doc-filter-test' };

type LogEntry = { message: string; type: 'info' | 'success' | 'warn' | 'error'; time: string };

// ──────────────────────────────────────────
// Document setup (child component).
// Auth is handled via authProvider prop on VeltProvider.
// Document must be set in a child component, never in the
// same component that renders VeltProvider.
// ──────────────────────────────────────────
function VeltDocumentSetup() {
  useSetDocument(DOCUMENT.documentId, { documentName: DOCUMENT.name });
  return null;
}

// ──────────────────────────────────────────
// Filter controls — uses useVeltClient to
// get the comment element for filtering.
// ──────────────────────────────────────────
function FilterControls({ loggedIn, onLog }: {
  loggedIn: boolean;
  onLog: (msg: string, type: LogEntry['type']) => void;
}) {
  const { client } = useVeltClient();
  const [filterApplied, setFilterApplied] = useState(false);

  const applyUserFilter = () => {
    if (!loggedIn || !client) {
      onLog('Please login first', 'warn');
      return;
    }

    const commentElement = client.getCommentElement();
    if (!commentElement) {
      onLog('Comment element not available', 'error');
      return;
    }

    commentElement.openCommentSidebar();
    onLog('Sidebar opened (required for DOM filtering to work)', 'info');

    const peopleFilter = FILTERED_USERS.map(u => ({
      userId: u.userId,
      email: u.email,
      name: u.name,
    }));

    commentElement.setCommentSidebarFilters({ people: peopleFilter });
    onLog(`Sidebar filter set for ${peopleFilter.length} users: ${peopleFilter.map(u => u.name).join(', ')}`, 'info');

    commentElement.enableFilterCommentsOnDom();
    onLog('filterCommentsOnDom enabled - DOM now synced with sidebar filter', 'success');
    onLog('Only comments from user-1 through user-5 should be visible now', 'success');

    setFilterApplied(true);
  };

  const clearFilter = () => {
    if (!loggedIn || !client) {
      onLog('Please login first', 'warn');
      return;
    }

    const commentElement = client.getCommentElement();
    if (!commentElement) {
      onLog('Comment element not available', 'error');
      return;
    }

    commentElement.setCommentSidebarFilters({});
    commentElement.disableFilterCommentsOnDom();
    onLog('Filters cleared - all comments are now visible', 'success');
    setFilterApplied(false);
  };

  return (
    <>
      <button className="header-button" disabled={!loggedIn} onClick={applyUserFilter}>
        Apply Filter (5 users)
      </button>
      <button className="header-button danger" disabled={!loggedIn} onClick={clearFilter}>
        Clear Filter
      </button>
    </>
  );
}

// ──────────────────────────────────────────
// Main page — VeltProvider lives here
// (not in layout.tsx per Next.js App Router best practice).
// Auth uses authProvider prop (recommended).
// No JWT / generateToken for this demo.
// ──────────────────────────────────────────
export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<typeof ALL_USERS[number] | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const log = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  }, []);

  useEffect(() => {
    log('Ready. Please login to start.', 'info');
  }, [log]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const handleLogin = () => {
    const user = ALL_USERS.find(u => u.userId === selectedUserId);
    if (!user) return;
    setLoggedInUser(user);
    setShowModal(false);
    log(`Logged in as ${user.name} (${user.userId})`, 'success');
  };

  // Build authProvider from the logged-in user.
  // Omit generateToken — no JWT needed for this demo.
  const authProvider = loggedInUser
    ? {
        user: {
          userId: loggedInUser.userId,
          organizationId: ORGANIZATION.organizationId,
          name: loggedInUser.name,
          email: loggedInUser.email,
          photoUrl: loggedInUser.photoUrl,
        },
      }
    : undefined;

  return (
    <VeltProvider apiKey="6xTcUFtlYAlCdh11zrKB" authProvider={authProvider}>
      <VeltComments />

      {/* Document setup — only rendered after login (auth is via authProvider) */}
      {loggedInUser && <VeltDocumentSetup />}

      {/* Header */}
      <div className="header-bar">
        <div className="header-title">Comment User Filter Demo</div>
        <div className="header-actions">
          <FilterControls loggedIn={!!loggedInUser} onLog={log} />
          <button className="header-button" onClick={() => setShowModal(true)}>
            Login
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Login to Velt</div>

            <div className="modal-section">
              <div className="modal-label">Login as User</div>
              <select
                className="select-box"
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
              >
                <option value="">Select a user...</option>
                {ALL_USERS.map(user => (
                  <option key={user.userId} value={user.userId}>
                    {user.name} ({user.userId})
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-section">
              <div className="modal-label">Organization</div>
              <select className="select-box" defaultValue={ORGANIZATION.id}>
                <option value={ORGANIZATION.id}>{ORGANIZATION.name}</option>
              </select>
            </div>

            <div className="modal-section">
              <div className="modal-label">Document</div>
              <select className="select-box" defaultValue={DOCUMENT.id}>
                <option value={DOCUMENT.id}>{DOCUMENT.name}</option>
              </select>
            </div>

            <button
              className="modal-button"
              disabled={!selectedUserId}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="page-wrapper">
        <div className="content-wrapper">
          <div className="main-content">

            {/* User Overview Panel */}
            <div className="panel">
              <div className="panel-title">All 10 Users (each adds a comment)</div>
              <div className="panel-description">
                Green = included in filter (5 users) | Red = excluded from filter (5 users).
                After login, click &quot;Apply Filter&quot; to filter comments by the green users only.
              </div>
              <div className="user-grid">
                {ALL_USERS.map(user => {
                  const inFilter = FILTERED_USER_IDS.has(user.userId);
                  return (
                    <div key={user.userId} className={`user-card ${inFilter ? 'in-filter' : 'not-in-filter'}`}>
                      <img className="user-avatar" src={user.photoUrl} alt={user.name} />
                      <div className="user-card-name">{user.name}</div>
                      <div className="user-card-id">{user.userId}</div>
                      <div className="user-card-badge">{inFilter ? 'SHOW' : 'HIDE'}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comment Target Area */}
            <div className="panel">
              <div className="panel-title">Comment Area</div>
              <div className="panel-description">
                This is the area where comments are placed on the DOM. Use the Velt comment tool to add comments.
                When filtering is applied, only comments from the 5 selected users will be visible both on the DOM and in the sidebar.
              </div>
              <div className="comment-area" id="commentArea">
                <VeltCommentTool targetCommentElementId="commentArea" />
                <p><strong>How to test:</strong></p>
                <p>1. Login as each of the 10 users (one at a time) and leave a comment on this area.</p>
                <p>2. After all 10 users have commented, login as any user and click &quot;Apply Filter&quot;.</p>
                <p>3. Only comments from the 5 filtered users (user-1 through user-5) will be visible.</p>
                <p>4. Click &quot;Clear Filter&quot; to show all comments again.</p>
                <p>&nbsp;</p>
                <p>The filter uses two mechanisms together:</p>
                <p>- <code>setCommentSidebarFilters({'{ people: [...] }'})</code> to filter the sidebar</p>
                <p>- <code>enableFilterCommentsOnDom()</code> to sync DOM visibility with the sidebar filter</p>
              </div>
            </div>

            {/* Status Log */}
            <div className="panel">
              <div className="panel-title">Status Log</div>
              <div className="status-log" ref={logRef}>
                {logs.map((entry, i) => (
                  <div key={i} className={`log-entry ${entry.type}`}>
                    [{entry.time}] {entry.message}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar */}
        <VeltCommentsSidebar embedMode={true} />
      </div>
    </VeltProvider>
  );
}
