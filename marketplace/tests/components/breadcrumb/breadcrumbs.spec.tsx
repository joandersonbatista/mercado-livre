import { Breadcrumbs } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Breadcrumbs Component', () => {
  it('should render breadcrumbs items correctly', () => {
    const items = [{ name: 'Home' }, { name: 'Category' }, { name: 'Product' }];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  it('should display chevron icon between breadcrumbs items', () => {
    const items = [{ name: 'Home' }, { name: 'Category' }, { name: 'Product' }];

    render(<Breadcrumbs items={items} />);

    const chevrons = screen.getAllByAltText('icone chevron');
    expect(chevrons.length).toBe(2);
  });

  it('should not display chevron after the last breadcrumbs item', () => {
    const items = [{ name: 'Home' }, { name: 'Product' }];

    render(<Breadcrumbs items={items} />);

    const chevrons = screen.queryAllByAltText('icone chevron');
    expect(chevrons.length).toBe(1);
  });

  it('should render correct link for each breadcrumbs item', () => {
    const items = [{ name: 'Home' }, { name: 'Category' }, { name: 'Product' }];

    render(<Breadcrumbs items={items} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('Category');
    expect(links[2]).toHaveTextContent('Product');
  });

  it('should match the snapshot', () => {
    const items = [{ name: 'Home' }, { name: 'Category' }, { name: 'Product' }];

    const { container } = render(<Breadcrumbs items={items} />);
    expect(container).toMatchSnapshot();
  });
});
