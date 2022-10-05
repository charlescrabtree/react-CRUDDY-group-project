import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import { Redirect } from 'react-router-dom';

export default function Auth() {
  // const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const clickHandler = async () => {
    // add in type later
    const userResp = await authUser(email, password);
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
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-controls">
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={clickHandler}>Submit</button>
    </div>
  );


}
