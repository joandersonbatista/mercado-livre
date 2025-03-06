import * as React from 'react';

import { Skeleton } from '@/components';
import { render } from '@testing-library/react';

describe('Skeleton Component', () => {
  it('should render with default width and height', () => {
    const { getByTestId } = render(<Skeleton />);
    const divElement = getByTestId('skeleton');

    expect(divElement).toHaveStyle('width: undefined');
    expect(divElement).toHaveStyle('height: undefined');
  });

  it('should apply custom width and height when provided', () => {
    const { getByTestId } = render(<Skeleton width="100px" height="50px" />);
    const divElement = getByTestId('skeleton');

    expect(divElement).toHaveStyle('width: 100px');
    expect(divElement).toHaveStyle('height: 50px');
  });

  it('should render with the skeleton class', () => {
    const { getByTestId } = render(<Skeleton />);
    const divElement = getByTestId('skeleton');

    expect(divElement).toHaveClass('skeleton');
  });

  it('should match the snapshot', () => {
    const { container } = render(<Skeleton />);
    expect(container).toMatchSnapshot();
  });
});
