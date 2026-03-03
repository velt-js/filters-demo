'use client';

import { useSetDocument } from '@veltdev/react';
import { DOCUMENT } from '../constants';

export function VeltDocumentSetup() {
  useSetDocument(DOCUMENT.documentId, { documentName: DOCUMENT.name });
  return null;
}
