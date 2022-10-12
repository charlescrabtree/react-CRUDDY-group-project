import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { UserProvider } from './context/UserContext';
const { MemoryRouter } = require('react-router-dom');

test('renders header', () => {

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const headerElement = screen.getByText(/welcome/i);
  expect(headerElement).toBeInTheDocument();

  // const emailInput = screen.getByLabelText('Email:');
  // fireEvent.change(emailInput, { target: { value: 'me@me.com' } });
});
