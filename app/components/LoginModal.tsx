'use client';

import { ALL_USERS, ORGANIZATION, DOCUMENT } from '../constants';

interface LoginModalProps {
  selectedUserId: string;
  onUserChange: (userId: string) => void;
  onLogin: () => void;
}

export function LoginModal({ selectedUserId, onUserChange, onLogin }: LoginModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">Login to Velt</div>

        <div className="modal-section">
          <div className="modal-label">Login as User</div>
          <select
            className="select-box"
            value={selectedUserId}
            onChange={(e) => onUserChange(e.target.value)}
          >
            <option value="">Select a user...</option>
            {ALL_USERS.map((user) => (
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

        <button className="modal-button" disabled={!selectedUserId} onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
