import { api } from '../lib/api';
import type { BusinessProfile } from '../types';

export const settingsApi = {
  getBusinessProfile: () => api.get<BusinessProfile>('/settings/business-profile').then((r) => r.data),
};
