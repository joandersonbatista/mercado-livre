import {
  ListItems,
  GetItem,
  MarketplaceItemCondition,
  MarketplaceItem,
} from '@/services/marketplace-service/marketplace-service-types';
import { getCurrencyDecimals } from '@/utils/get-currency-decimals';
import { faker } from '@faker-js/faker';

export class MarketplaceServiceBuilder {
  static listItems(length: number): ListItems {
    return {
      author: { name: faker.person.firstName(), lastname: faker.person.lastName() },
      categories: Array.from({ length: 3 }, () => faker.commerce.department()),
      items: Array.from({ length }, () => MarketplaceServiceBuilder.buildItem()),
    };
  }

  static getItem(): GetItem {
    return {
      author: { name: faker.person.firstName(), lastname: faker.person.lastName() },
      categories: Array.from({ length: 3 }, () => faker.commerce.department()),
      item: MarketplaceServiceBuilder.buildItem(),
    };
  }

  private static buildItem(): MarketplaceItem {
    const currency = faker.finance.currency();
    const decimals = getCurrencyDecimals(currency.code, 'en');

    return {
      free_shipping: faker.datatype.boolean(),
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      condition: MarketplaceItemCondition.NEW,
      picture: faker.image.urlPicsumPhotos(),
      description: faker.commerce.productDescription(),
      price: {
        amount: Number(
          faker.finance.amount({
            min: 100,
            max: 1000,
            dec: decimals,
          }),
        ),
        decimals: decimals,
        currency: currency.code,
      },
    };
  }
}
