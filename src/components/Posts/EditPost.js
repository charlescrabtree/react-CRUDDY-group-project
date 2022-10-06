import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { createPost } from '../../services/posts';

export default function editPostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleClick = async () => {
    try { 
      await createPost(user.id, title, description);
      setTitle('');
      setDescription('');
    } catch (e) {
        //eslint-disable-next-line no-console
      console.error(e.message);
    }
    
    history.push('/posts');
  };

  return (
    <>
      <div>
        <input placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <button onClick={handleClick}>ADD</button>
      </div>
    </>
  );
}