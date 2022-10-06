import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { usePost } from '../../hooks/usePost';
import { updatePost } from '../../services/posts';

export default function EditPost() {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { postDetail, setPostDetail, loading, setLoading, error } = usePost(id);
  console.log('postDetail', postDetail);

  if (!user) {
    history.push('/posts');
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleClick = async () => {
    try {
       
      const resp = await updatePost(postDetail.id, postDetail.title, postDetail.description);
      console.log('resp', resp);
      history.push('/posts');
    } catch (e) {
        //eslint-disable-next-line no-console
      console.error(e.message);
    }
    
  };

  return (
    <>
      <div>
        <input placeholder="title" type="text" value={postDetail.title} onChange={(e) => setPostDetail((prevState) => ({ ...prevState, title: e.target.value }))} />
        <input placeholder="description" type="text" value={postDetail.description} onChange={(e) => setPostDetail((prevState) => ({ ...prevState, description: e.target.value }))} />
      </div>
      <div>
        <button onClick={handleClick}>ADD</button>
      </div>
    </>
  );
}