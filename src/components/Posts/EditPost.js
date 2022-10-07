import React from 'react';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { usePost } from '../../hooks/usePost';
import { updatePost } from '../../services/posts';
import './Posts.css';

export default function EditPost() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { postDetail, setPostDetail, loading, error } = usePost(id);

  if (!user) {
    history.push('/posts');
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleClick = async () => {
    try {

      await updatePost(postDetail.id, postDetail.title, postDetail.description);
      history.push('/posts');
    } catch (e) {
        //eslint-disable-next-line no-console
      console.error(e.message);
    }
    
  };

  return (
    <>
      <div>
        <input className="title" placeholder="title" type="text" value={postDetail.title} onChange={(e) => setPostDetail((prevState) => ({ ...prevState, title: e.target.value }))} />
        <input className="description" placeholder="description" type="text" value={postDetail.description} onChange={(e) => setPostDetail((prevState) => ({ ...prevState, description: e.target.value }))} />
      </div>
      <div>
        <button className="add" onClick={handleClick}>EDIT</button>
      </div>
    </>
  );
}