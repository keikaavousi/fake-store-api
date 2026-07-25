import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import { RouterProvider } from '../contexts/RouterContext';

function renderLogin() {
  return render(
    <RouterProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </RouterProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
});

test('renders an accessible sign-in form', () => {
  renderLogin();

  expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

test('accepts account credentials', () => {
  renderLogin();

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'brad@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'portfolio-demo' },
  });

  expect(screen.getByLabelText(/email address/i)).toHaveValue('brad@example.com');
  expect(screen.getByLabelText(/password/i)).toHaveValue('portfolio-demo');
});

test('stores a lightweight demo session after sign in', async () => {
  renderLogin();

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'brad@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'portfolio-demo' },
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(JSON.parse(localStorage.getItem('brads-store-user'))).toEqual({
      email: 'brad@example.com',
      name: 'brad',
    });
  });
});
