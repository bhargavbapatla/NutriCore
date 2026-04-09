import { BASE_URL } from './apiClient';
import { dashboardInitUrl } from './urls';

export const streamDashboardInit = async (
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}${dashboardInitUrl}`, {
    credentials: 'include',
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value, { stream: true }));
    }
  } finally {
    reader.releaseLock();
  }
};
