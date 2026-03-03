'use client';

import { ALL_USERS, FILTERED_USER_IDS } from '../constants';
import { UserCard } from './UserCard';

export function UserOverviewPanel() {
  return (
    <div className="panel">
      <div className="panel-title">All 10 Users (each adds a comment)</div>
      <div className="panel-description">
        Green = included in filter (5 users) | Red = excluded from filter (5 users). After login,
        filters are automatically applied to show only comments from the green users plus yourself.
      </div>
      <div className="user-grid">
        {ALL_USERS.map((user) => (
          <UserCard
            key={user.userId}
            user={user}
            inFilter={FILTERED_USER_IDS.has(user.userId)}
          />
        ))}
      </div>
    </div>
  );
}
