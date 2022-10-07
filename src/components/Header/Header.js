import { React, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      //eslint-disable-next-line no-console
      console.error(e.message);     
    }
  };
  console.log(user);
  return (
    <header>
      <nav>
        Hi, welcome to Chilis!
        <div>
          <Link to="/auth/sign-in">
            Sign in
          </Link>
        </div>
        <div>
          <Link to="/auth/sign-up">
            Sign up
          </Link>
        </div>
        <div>
          <Link to="/auth/sign-in" onClick={handleLogout}>
            Sign out
          </Link>
        </div>
      </nav>
    </header>
  );
}
