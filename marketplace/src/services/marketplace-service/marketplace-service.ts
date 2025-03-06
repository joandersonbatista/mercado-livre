import { HttpClient } from '@/services/http-client/http-client';
import { ApiResponse } from '@/services/http-client/http-client-types';

import { type ListItems, type GetItem } from './marketplace-service-types';

export class MarketplaceService extends HttpClient {
  static async listItems(search: string): Promise<ApiResponse<ListItems>> {
    return await MarketplaceService.fetchRequest<ListItems>(`items?q=${search}`);
  }

  static async getItem(id: string): Promise<ApiResponse<GetItem>> {
    return await MarketplaceService.fetchRequest<GetItem>(`items/${id}`);
  }

  static async listPopularKeywords(): Promise<ApiResponse<string[]>> {
    return await MarketplaceService.fetchRequest<string[]>('keywords');
  }
}
