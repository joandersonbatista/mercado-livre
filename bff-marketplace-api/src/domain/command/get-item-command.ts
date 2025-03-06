import { MarketplaceService } from '../services/marketplace-service';
import { CurrencyService } from '../services/currency-service';
import { ItemDTO } from 'src/dtos/item-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetItemCommand {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly marketplaceService: MarketplaceService,
  ) {}

  async execute(id: string, locale?: string): Promise<ItemDTO> {
    const item = await this.marketplaceService.getItem(id);
    const description = await this.marketplaceService.getItemDescription(id);
    const itemCategories = await this.marketplaceService.getCategory(item.category_id);

    const picture = item.pictures[0]?.url ?? item.thumbnail;

    return {
      author: {
        name: String(process.env.AUTHOR_NAME),
        lastname: String(process.env.AUTHOR_LASTNAME),
      },
      categories: itemCategories.path_from_root.map((path) => path.name),
      item: {
        condition: item.condition,
        description: description.plain_text,
        free_shipping: item.shipping.free_shipping,
        id: item.id,
        picture,
        title: item.title,
        price: {
          amount: item.price,
          currency: item.currency_id,
          decimals: this.currencyService.getDecimals(item.currency_id, locale),
        },
      },
    };
  }
}
