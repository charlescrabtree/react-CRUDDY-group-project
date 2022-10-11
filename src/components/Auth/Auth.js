import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const clickHandler = async () => {
    const userResp = await authUser(email, password, type);
    setUser(userResp);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Redirect to="/posts" />;
  }

  return (
    <div>
      <div className="form-controls">
        <label>Email:</label>
        <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-controls">
        <label>Password:</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="submit" onClick={clickHandler}>Submit</button>
    </div>
  );
}
