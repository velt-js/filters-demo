'use client';

import { VeltProvider, VeltComments } from '@veltdev/react';
import { VELT_API_KEY } from './constants';
import { useAuth } from './hooks';
import { Header, LoginModal, MainContent, VeltDocumentSetup } from './components';

export default function Home() {
  const {
    loggedInUser,
    showModal,
    setShowModal,
    selectedUserId,
    setSelectedUserId,
    handleLogin,
    authProvider,
  } = useAuth();

  return (
    <VeltProvider apiKey={VELT_API_KEY} authProvider={authProvider}>
      <VeltComments />

      {loggedInUser && <VeltDocumentSetup />}

      <Header
        isLoggedIn={!!loggedInUser}
        currentUser={loggedInUser}
        onLoginClick={() => setShowModal(true)}
      />

      {showModal && (
        <LoginModal
          selectedUserId={selectedUserId}
          onUserChange={setSelectedUserId}
          onLogin={handleLogin}
        />
      )}

      <MainContent />
    </VeltProvider>
  );
}
