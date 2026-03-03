'use client';

import { User } from '../types';

interface UserCardProps {
  user: User;
  inFilter: boolean;
}

export function UserCard({ user, inFilter }: UserCardProps) {
  return (
    <div className={`user-card ${inFilter ? 'in-filter' : 'not-in-filter'}`}>
      <img className="user-avatar" src={user.photoUrl} alt={user.name} />
      <div className="user-card-name">{user.name}</div>
      <div className="user-card-id">{user.userId}</div>
      <div className="user-card-badge">{inFilter ? 'SHOW' : 'HIDE'}</div>
    </div>
  );
}
