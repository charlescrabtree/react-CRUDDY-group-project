import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';


jest.mock('./services/auth');
jest.mock('./services/posts');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

//test 1
//renders headers

test('renders header', async () => {
  render(    
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const headerElem = screen.getByText(/hi, welcome to chilis/i);
  expect(headerElem).toBeInTheDocument();
  const signInElem = screen.getByText(/Sign in/i);
  expect(signInElem).toBeInTheDocument();
  const signOutElem = screen.getByText(/Sign out/i);
  expect(signOutElem).toBeInTheDocument();
});

//test 2
//log in

test('user can long in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);
  render(    
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  ); 
  
  const emailInput = screen.getByLabelText('Email:');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  });
  expect(emailInput.value).toBe('random@example.com');
  const passwordInput = screen.getByLabelText('Password:');
  act(() => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });
  });
  const button = screen.getByRole('button');
  act(() => {
    fireEvent.click(button);
  });
});

const fakePosts = [
  {
    id: 1,
    title: 'Fake Post #1',
    description: '#1 description',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
  // { id: 2, 
  //   title: 'Fake Post #2', 
  //   description: '#2 description',
  //   user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2', 
  // },
];

// test 3
// users can see all posts

test('signed in users should see a list of posts at /posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const postEl = await screen.findByText(/Fake Post #1/i);
  expect(postEl).toBeInTheDocument();

  const editEl = await screen.findByText(/Edit/i);
  expect(editEl).toBeInTheDocument();
  // await screen.findByText(/Fake Post #2/i);
});






// test 4
// user can edit post
test('signed in can edit posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const link = await screen.findByLabelText('edit');
  act(() => {
    fireEvent.click(link);
  });
  // const editEl = await screen.findByText(/Edit/i);
  // expect(editEl).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();

});










// test 5
// user can create new post
test('signed in can create new posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const link = await screen.findByRole('link', { name: 'New Post' });
  act(() => {
    fireEvent.click(link);
  });
  const addEl = await screen.findByText(/ADD/i);
  expect(addEl).toBeInTheDocument();
});

// test 6
// user can sign out of /posts
test('user can sign out of /posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const link = await screen.getByRole('link', { name: 'Sign out' });
  act(() => {
    fireEvent.click(link);
  });
  const submitEl = await screen.findByText(/Submit/i);
  expect(submitEl).toBeInTheDocument();
});

// test 7
// user can delete post
test('user can delete post', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts/edit']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  // ensure fake post 1 loads
  await screen.findByText(/Fake Post #1/i);
  // find delete button
  const button = await screen.findByRole('button', { name: 'Delete' });
  act(() => {
    fireEvent.click(button);
  });
  expect(await screen.queryByRole('link', { name: 'Edit' })).not.toBeInTheDocument();
});
