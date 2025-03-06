import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  getDecimals(currency: string, localeCode?: string): number {
    const formatter = new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currency,
    });

    const parts = formatter.formatToParts(1.01);

    const decimalPart = parts.find((part) => part.type === 'fraction');

    return decimalPart ? decimalPart.value.length : 0;
  }
}
