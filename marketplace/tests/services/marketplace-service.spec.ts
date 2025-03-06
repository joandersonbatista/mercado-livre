import { mockFetch } from 'tests/helpers';

import { SuccessResponse } from '@/services/http-client/http-client-types';
import { MarketplaceService } from '@/services/marketplace-service/marketplace-service';

import { MarketplaceServiceBuilder } from './marketplace-service-builder';

global.fetch = jest.fn();

describe('MarketplaceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('should fetch and return a list of marketplace items', async () => {
    const mockResponse = MarketplaceServiceBuilder.listItems(4);

    mockFetch({ ok: true, data: mockResponse });

    const result = (await MarketplaceService.listItems('iphone')) as SuccessResponse<
      typeof mockResponse
    >;

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual(mockResponse);
  });

  it('should fetch and return a single marketplace item by ID', async () => {
    const mockResponse = MarketplaceServiceBuilder.getItem();

    mockFetch({ ok: true, data: mockResponse });

    const result = (await MarketplaceService.getItem('test123')) as SuccessResponse<
      typeof mockResponse
    >;

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual(mockResponse);
  });

  it('should fetch and return a list of popular keywords', async () => {
    const mockResponse = ['iphone', 'samsung', 'xiaomi'];

    mockFetch({ ok: true, data: mockResponse });

    const result = (await MarketplaceService.listPopularKeywords()) as SuccessResponse<
      typeof mockResponse
    >;

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual(mockResponse);
  });
});
