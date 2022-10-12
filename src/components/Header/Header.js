import { React, useContext } from 'react';
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
  return (
    <>
      <header>
        <nav>
          Hi, welcome to Chilis!
          {!user && (
            <>
              <div>
                <Link className="link" to="/auth/sign-in">
                  Sign in
                </Link>
              </div>
              <div>
                <Link className="link" to="/auth/sign-up">
                  Sign up
                </Link>
              </div>
            </>
          )}
          <div>
            <Link className="link" to="/auth/sign-in" onClick={handleLogout}>
              Sign out
            </Link>
          </div>
          {user && (
            <>
              <div>
                <Link aria-label="new-post" className="link" to="/posts/new">
              New Post
                </Link>
              </div>
            </>

          )}
          <div>
            <Link className="link" to="/posts">
              Posts
            </Link>
          </div>

        </nav>
      </header>
    </>
  );
}
