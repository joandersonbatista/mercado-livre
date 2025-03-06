import * as MarketplaceServiceTypes from './marketplace-service-types';

export abstract class MarketplaceService {
  abstract listItems(
    searchParam: string,
  ): Promise<MarketplaceServiceTypes.ListItemsResult>;
  abstract getItem(id: string): Promise<MarketplaceServiceTypes.GetItemResult>;

  abstract getCategory(
    id: string,
  ): Promise<MarketplaceServiceTypes.CategoryResult>;

  abstract getItemDescription(
    id: string,
  ): Promise<MarketplaceServiceTypes.DescriptionResult>;

  abstract popularKeywords(): string[];
}
