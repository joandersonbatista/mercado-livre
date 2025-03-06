import { headers } from 'next/headers';

import { Header } from '@/components';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    (headers as jest.Mock).mockReset();
  });

  it('should set the search input with the provided searchParams', async () => {
    const mockHeader = new Map();

    mockHeader.set('searchParams', 'search=teste');

    (headers as jest.Mock).mockResolvedValueOnce(mockHeader);

    const component = await Header();
    render(component);

    expect(screen.getByTestId('input-search-items')).toHaveValue('teste');
  });

  it('should update input value onChange', async () => {
    (headers as jest.Mock).mockResolvedValueOnce(new Map());

    const component = await Header();
    render(component);

    const input = screen.getByTestId('input-search-items');
    fireEvent.change(input, { target: { value: 'new search term' } });

    await waitFor(() => {
      expect(input).toHaveValue('new search term');
    });
  });

  it('should match the snapshot', async () => {
    const mockHeader = new Map();
    mockHeader.set('searchParams', 'search=playstation');
    (headers as jest.Mock).mockResolvedValueOnce(mockHeader);

    const component = await Header();
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });
});
