 import { fetchAPI } from './api';
 import type { DashboardOverview } from '@/src/types/dashboard';

 export class DashboardService {

   static async getOverview(token: string): Promise<DashboardOverview> {
     return fetchAPI<DashboardOverview>('/dashboard/overview', {
       method: 'GET',
       token,
     });
   }
 }