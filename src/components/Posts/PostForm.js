import React from 'react';
import { useState } from 'react';
import { createPost } from '../../services/posts';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = async () => {
    try {
      const response = await createPost(title, description);
      setTitle('');
      setDescription('');
    } catch (e) {
        //eslint-disable-next-line no-console
      console.error(e.message);
    }
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
