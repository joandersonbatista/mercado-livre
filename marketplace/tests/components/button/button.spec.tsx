import { Button } from '@/components';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Component', () => {
  it('should render the button with the provided children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should apply the className correctly', () => {
    render(<Button className="custom-class">Click me</Button>);

    const buttonElement = screen.getByText('Click me');

    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('should forward additional props to the button element', () => {
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('should trigger onClick when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should match the snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
