import { ListItemDTO, ListItemsDTO } from 'src/dtos/list-items-dto';
import * as MarketplaceServiceTypes from '../services/marketplace-service-types';
import { CurrencyService } from '../services/currency-service';
import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../services/marketplace-service';

@Injectable()
export class ListItemsCommand {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly marketplaceService: MarketplaceService,
  ) {}

  async execute(search: string, locale?: string): Promise<ListItemsDTO> {
    const list = await this.marketplaceService.listItems(search);

    return {
      author: {
        name: String(process.env.AUTHOR_NAME),
        lastname: String(process.env.AUTHOR_LASTNAME),
      },
      categories: this.buildCategories(list.filters),
      items: this.buildItemsDTO(list.items, locale),
    };
  }

  private buildItemsDTO(
    items: MarketplaceServiceTypes.ListItem[],
    locale?: string,
  ): ListItemDTO[] {
    return items.map((item) => ({
      id: item.id,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      title: item.title,
      picture: item.thumbnail,
      price: {
        amount: item.sale_price.amount,
        currency: item.sale_price.currency_id,
        decimals: this.currencyService.getDecimals(
          item.sale_price.currency_id,
          locale,
        ),
      },
    }));
  }

  private buildCategories(
    filters: MarketplaceServiceTypes.ItemFilter[],
  ): string[] {
    const categories = filters.find(
      (filter) => filter.id === MarketplaceServiceTypes.FilterType.CATEGORY,
    );

    if (!categories) return [];

    const longestPathNames = categories.values.reduce((maxItem, item) =>
      item.path_from_root.length > maxItem.path_from_root.length
        ? item
        : maxItem,
    );

    return longestPathNames.path_from_root.map((path) => path.name);
  }
}
