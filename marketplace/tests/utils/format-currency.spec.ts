import { Locale } from '@/i18n/routing';
import { Price } from '@/types/price-type';
import { formatCurrency } from '@/utils/format-currency';
import { getCurrencyDecimals } from '@/utils/get-currency-decimals';

function priceBuilder(currencyCode: string, amount: number, locale: Locale): Price {
  const decimals = getCurrencyDecimals(currencyCode, locale);

  return {
    currency: currencyCode,
    decimals,
    amount,
  };
}

describe('formatCurrency', () => {
  it('should format a valid BRL price correctly', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('BRL', 1500.36, locale);

    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toBe('R$ 1.500,36');
    expect(result.currencyCode).toBe('R$');
    expect(result.integer).toBe('1.500');
    expect(result.decimal).toBe('36');
  });

  it('should format price with different currency (USD) in pt-BR locale', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('USD', 1250, locale);

    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toContain('US$');
    expect(result.currencyCode).toBe('US$');
  });

  it('should format price with different locales with currency (COP)', () => {
    const locales: Array<{ code: Locale; expectValue: string; expectCurrencyCode: string }> = [
      { code: 'es', expectValue: '$ 1.250,00', expectCurrencyCode: '$' },
      { code: 'br', expectValue: 'COP 1.250,00', expectCurrencyCode: 'COP' },
    ];

    locales.forEach(({ code, expectValue, expectCurrencyCode }) => {
      const price: Price = priceBuilder('COP', 1250, code);
      const result = formatCurrency(price, code);
      const decimal = getCurrencyDecimals('COP', code);

      expect(result.formattedValue).toContain(expectValue);
      expect(result.currencyCode).toBe(expectCurrencyCode);
      expect(result.decimal.length).toBe(decimal);
    });
  });

  it('should format negative values correctly', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('USD', -1234.56, locale);
    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toContain('-US$');
    expect(result.currencyCode).toBe('US$');
    expect(result.integer).toBe('1.234');
    expect(result.decimal).toBe('56');
  });

  it('should format whole numbers correctly', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('EUR', 5000, locale);
    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toContain('€');
    expect(result.currencyCode).toBe('€');
    expect(result.integer).toBe('5.000');
    expect(result.decimal).toBe('00');
  });

  it('should handle zero amount correctly', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('BRL', 0, locale);

    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toBe('R$ 0,00');
    expect(result.currencyCode).toBe('R$');
    expect(result.integer).toBe('0');
    expect(result.decimal).toBe('00');
  });

  it('should format large values correctly', () => {
    const locale: Locale = 'br';
    const price: Price = priceBuilder('GBP', 1000000000.99, locale);
    const result = formatCurrency(price, locale);

    expect(result.formattedValue).toContain('£');
    expect(result.currencyCode).toBe('£');
    expect(result.integer).toBe('1.000.000.000');
    expect(result.decimal).toBe('99');
  });
});
