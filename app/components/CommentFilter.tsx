'use client';

/**
 * CommentFilter - Core component showing how to filter comments on DOM
 *
 * This component demonstrates two key Velt APIs:
 * 1. setCommentSidebarFilters({ people: [...] }) - Filters the sidebar by users
 * 2. enableFilterCommentsOnDom() - Syncs DOM comment visibility with sidebar filter
 *
 * When both are used together, comments are filtered both in the sidebar AND on the DOM.
 */

import { useEffect, useRef } from 'react';
import { useVeltClient, useCurrentUser } from '@veltdev/react';
import { FILTERED_USERS } from '../constants';

export function CommentFilter() {
  const { client } = useVeltClient();
  const currentUser = useCurrentUser();
  const hasAppliedFilter = useRef(false);

  const isLoggedIn = !!currentUser;

  // Apply filters automatically when user logs in
  useEffect(() => {
    if (!client || !currentUser || hasAppliedFilter.current) return;

    const commentElement = client.getCommentElement();
    if (!commentElement) return;

    // Step 2: Build the people filter array (only userId is needed)
    const baseFilter = FILTERED_USERS.map((user) => ({ userId: user.userId }));

    // Include current user in filter if not already in the list
    const isCurrentUserInFilter = baseFilter.some((u) => u.userId === currentUser.userId);
    const peopleFilter = !isCurrentUserInFilter
      ? [...baseFilter, { userId: currentUser.userId }]
      : baseFilter;

    // Step 3: Apply the sidebar filter
    console.log('peopleFilter', peopleFilter);
    commentElement.setCommentSidebarFilters({ people: peopleFilter });

    // Step 4: Enable DOM filtering to sync with sidebar
    commentElement.enableFilterCommentsOnDom();

    hasAppliedFilter.current = true;
  }, [client, currentUser]);

  // Clear all filters
  const handleClearFilters = () => {
    if (!isLoggedIn || !client) return;

    const commentElement = client.getCommentElement();
    if (!commentElement) return;

    // Clear sidebar filters
    commentElement.setCommentSidebarFilters({});

    // Disable DOM filtering
    commentElement.disableFilterCommentsOnDom();
  };

  return (
    <button
      className="header-button danger"
      disabled={!isLoggedIn}
      onClick={handleClearFilters}
    >
      Clear Filter
    </button>
  );
}
