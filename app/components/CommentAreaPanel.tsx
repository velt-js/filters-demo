'use client';

import { VeltCommentTool } from '@veltdev/react';

export function CommentAreaPanel() {
  return (
    <div className="panel">
      <div className="panel-title">Comment Area</div>
      <div className="panel-description">
        This is the area where comments are placed on the DOM. Use the Velt comment tool to add
        comments. When filtering is applied, only comments from the 5 selected users and the
        currently logged-in user will be visible both on the DOM and in the sidebar.
      </div>
      <div className="comment-area" id="commentArea">
        <VeltCommentTool targetCommentElementId="commentArea" />
        <p>
          <strong>How to test:</strong>
        </p>
        <p>1. Login as each of the 10 users (one at a time) and leave a comment on this area.</p>
        <p>2. After all 10 users have commented, login as any user - filters are applied automatically.</p>
        <p>3. Comments from the 5 filtered users (user-1 through user-5) plus your own will be visible automatically.</p>
        <p>4. Click &quot;Clear Filter&quot; to show all comments again.</p>
        <p>&nbsp;</p>
        <p>The filter uses two mechanisms together:</p>
        <p>
          - <code>setCommentSidebarFilters({'{ people: [...] }'})</code> to filter the sidebar
        </p>
        <p>
          - <code>enableFilterCommentsOnDom()</code> to sync DOM visibility with sidebar filter
        </p>
      </div>
    </div>
  );
}
