import '@testing-library/jest-dom';
import { useLocale } from 'next-intl';

import { LanguageSwitcher } from '@/components';
import { setUserLocale } from '@/services/locale/locale';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(() => (key: string) => key), // Mock da função de tradução
}));

jest.mock('@/services/locale/locale', () => ({
  setUserLocale: jest.fn(),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the language switcher with options', () => {
    (useLocale as jest.Mock).mockReturnValue('br');

    render(<LanguageSwitcher />);

    // Verifica se o select está presente
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Verifica se as opções estão presentes
    expect(screen.getByText('🇧🇷 br')).toBeInTheDocument();
    expect(screen.getByText('🇺🇸 en')).toBeInTheDocument();
    expect(screen.getByText('🇨🇴 es')).toBeInTheDocument();
  });

  it('should have the correct default selected language', () => {
    (useLocale as jest.Mock).mockReturnValue('en');

    render(<LanguageSwitcher />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('en');
  });

  it('should call setUserLocale when a language is selected', () => {
    (useLocale as jest.Mock).mockReturnValue('br');

    render(<LanguageSwitcher />);

    const select = screen.getByRole('combobox');

    // Simula a mudança para inglês
    fireEvent.change(select, { target: { value: 'en' } });

    expect(setUserLocale).toHaveBeenCalledWith('en');
  });
});
