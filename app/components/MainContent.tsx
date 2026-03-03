'use client';

import { VeltCommentsSidebar } from '@veltdev/react';
import { UserOverviewPanel } from './UserOverviewPanel';
import { CommentAreaPanel } from './CommentAreaPanel';

export function MainContent() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <div className="main-content">
          <UserOverviewPanel />
          <CommentAreaPanel />
        </div>
      </div>
      <VeltCommentsSidebar embedMode={true} />
    </div>
  );
}
