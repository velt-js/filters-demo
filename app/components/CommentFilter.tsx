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
import { useVeltClient } from '@veltdev/react';
import { User } from '../types';
import { FILTERED_USERS } from '../constants';

interface CommentFilterProps {
  isLoggedIn: boolean;
  currentUser: User | null;
}

export function CommentFilter({ isLoggedIn, currentUser }: CommentFilterProps) {
  const { client } = useVeltClient();
  const hasAppliedFilter = useRef(false);

  // Apply filters automatically when user logs in
  useEffect(() => {
    if (!client || !isLoggedIn || hasAppliedFilter.current) return;

    const commentElement = client.getCommentElement();
    if (!commentElement) return;

    // Step 1: Open sidebar (required for DOM filtering to work)
    commentElement.openCommentSidebar();

    // Step 2: Build the people filter array
    const baseFilter = FILTERED_USERS.map((user) => ({
      userId: user.userId,
      email: user.email,
      name: user.name,
    }));

    // Include current user in filter if not already in the list
    const isCurrentUserInFilter = currentUser && baseFilter.some((u) => u.userId === currentUser.userId);
    const peopleFilter = !isCurrentUserInFilter && currentUser
      ? [...baseFilter, { userId: currentUser.userId, email: currentUser.email, name: currentUser.name }]
      : baseFilter;

    // Step 3: Apply the sidebar filter
    console.log('peopleFilter', peopleFilter);
    commentElement.setCommentSidebarFilters({ people: peopleFilter });

    // Step 4: Enable DOM filtering to sync with sidebar
    commentElement.enableFilterCommentsOnDom();

    hasAppliedFilter.current = true;
  }, [client, isLoggedIn, currentUser]);

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
