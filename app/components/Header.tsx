'use client';

import { User } from '../types';
import { CommentFilter } from './CommentFilter';

interface HeaderProps {
  isLoggedIn: boolean;
  currentUser: User | null;
  onLoginClick: () => void;
}

export function Header({ isLoggedIn, currentUser, onLoginClick }: HeaderProps) {
  return (
    <div className="header-bar">
      <div className="header-title">Comment User Filter Demo</div>
      <div className="header-actions">
        <CommentFilter
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
        <button className="header-button" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
}
