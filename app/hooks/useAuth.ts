'use client';

import { useState } from 'react';
import { User, AuthProvider } from '../types';
import { ALL_USERS, ORGANIZATION } from '../constants';

export function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(ALL_USERS[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleLogin = () => {
    const user = ALL_USERS.find((u) => u.userId === selectedUserId);
    if (!user) return;

    setLoggedInUser(user);
    setShowModal(false);
  };

  const authProvider: AuthProvider | undefined = loggedInUser
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

  return {
    loggedInUser,
    showModal,
    setShowModal,
    selectedUserId,
    setSelectedUserId,
    handleLogin,
    authProvider,
  };
}
