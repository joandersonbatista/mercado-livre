import { IconButton } from '@/components';
import { render, fireEvent } from '@testing-library/react';

describe('IconButton Component', () => {
  it('should render the button with the given icon', () => {
    const { getByTestId } = render(<IconButton icon={<span>🔍</span>} />);
    const buttonElement = getByTestId('icon-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toContainHTML('🔍');
  });

  it('should apply the className correctly', () => {
    const { getByTestId } = render(
      <IconButton icon={<span>🔍</span>} className="custom-class" />,
    );
    const buttonElement = getByTestId('icon-button');

    expect(buttonElement).toHaveClass('icon-button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('should forward additional props to the button element', () => {
    const { getByTestId } = render(<IconButton icon={<span>🔍</span>} disabled />);
    const buttonElement = getByTestId('icon-button');

    expect(buttonElement).toBeDisabled();
  });

  it('should match the snapshot', () => {
    const { container } = render(<IconButton icon={<span>🔍</span>} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <IconButton icon={<span>🔍</span>} onClick={handleClick} />,
    );

    const buttonElement = getByTestId('icon-button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when the button is disabled', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <IconButton icon={<span>🔍</span>} onClick={handleClick} disabled />,
    );

    const buttonElement = getByTestId('icon-button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
