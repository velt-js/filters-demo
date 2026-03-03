import { User } from '../types';

export const VELT_API_KEY = 'Lm7A9zERsCFPT8yfUf0w';

export const ORGANIZATION = {
  id: 'org-1',
  name: 'Acme Corporation',
  organizationId: 'org-1',
};

export const DOCUMENT = {
  id: 'doc-filter-test',
  name: 'Filter Test Doc',
  documentId: 'doc-filter-test',
};

export const ALL_USERS: User[] = [
  { userId: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', photoUrl: 'https://placehold.co/400x400/667eea/fff?text=A', color: '#667eea' },
  { userId: 'user-2', name: 'Bob Smith', email: 'bob@example.com', photoUrl: 'https://placehold.co/400x400/764ba2/fff?text=B', color: '#764ba2' },
  { userId: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', photoUrl: 'https://placehold.co/400x400/f093fb/fff?text=C', color: '#f093fb' },
  { userId: 'user-4', name: 'Diana Prince', email: 'diana@example.com', photoUrl: 'https://placehold.co/400x400/4facfe/fff?text=D', color: '#4facfe' },
  { userId: 'user-5', name: 'Ethan Hunt', email: 'ethan@example.com', photoUrl: 'https://placehold.co/400x400/43e97b/fff?text=E', color: '#43e97b' },
  { userId: 'user-6', name: 'Fiona Gallagher', email: 'fiona@example.com', photoUrl: 'https://placehold.co/400x400/f5576c/fff?text=F', color: '#f5576c' },
  { userId: 'user-7', name: 'George Lucas', email: 'george@example.com', photoUrl: 'https://placehold.co/400x400/feca57/fff?text=G', color: '#feca57' },
  { userId: 'user-8', name: 'Hannah Montana', email: 'hannah@example.com', photoUrl: 'https://placehold.co/400x400/ff6b6b/fff?text=H', color: '#ff6b6b' },
  { userId: 'user-9', name: 'Ivan Drago', email: 'ivan@example.com', photoUrl: 'https://placehold.co/400x400/a29bfe/fff?text=I', color: '#a29bfe' },
  { userId: 'user-10', name: 'Julia Roberts', email: 'julia@example.com', photoUrl: 'https://placehold.co/400x400/fd79a8/fff?text=J', color: '#fd79a8' },
];

export const FILTERED_USERS = ALL_USERS.slice(0, 5);
export const FILTERED_USER_IDS = new Set(FILTERED_USERS.map((u) => u.userId));
