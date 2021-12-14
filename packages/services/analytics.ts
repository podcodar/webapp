import { Analytics, getAnalytics } from '@firebase/analytics';

import { app } from '@packages/repositories/firebase';

// Analytics
let analytics: Analytics | undefined;
export function getAnalyticsInstance() {
  if (analytics != null) return analytics;

  analytics = getAnalytics(app);
  return analytics;
}

export type { Analytics };
