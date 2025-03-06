import type { MetadataRoute } from 'next';

import { ResponseStatus } from '@/services/http-client/http-client-types';
import { MarketplaceService } from '@/services/marketplace-service/marketplace-service';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await MarketplaceService.listPopularKeywords();

  let searchPopularKeywords: MetadataRoute.Sitemap = [];

  if (response.status === ResponseStatus.SUCCESS) {
    searchPopularKeywords = response.data.map((keyword) => ({
      url: `${baseUrl}/items?search=${keyword}`,
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.8,
      /* alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          br: `${baseUrl}/br/`,
        },
      }, */
    }));
  }

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      /* alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          br: `${baseUrl}/br/`,
        },
      }, */
    },
    ...searchPopularKeywords,
  ];
}
