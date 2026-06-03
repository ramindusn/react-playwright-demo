import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Greeting } from '../components/Greeting';

describe('Greeting', () => {
  it('does not show greeting initially', () => {
    render(<Greeting />);
    expect(screen.queryByTestId('greeting')).not.toBeInTheDocument();
  });

  it('displays greeting when name is entered', () => {
    render(<Greeting />);
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Alice' } });
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, Alice!');
  });

  it('hides greeting when input is cleared', () => {
    render(<Greeting />);
    const input = screen.getByTestId('name-input');
    fireEvent.change(input, { target: { value: 'Bob' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('greeting')).not.toBeInTheDocument();
  });
});
