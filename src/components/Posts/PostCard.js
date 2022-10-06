import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { deletePost } from '../../services/posts';
import { usePosts } from '../../hooks/usePosts';


export default function PostCard({ title, description, user_id, id }) {
  const { user } = useContext(UserContext);
  const owner = user.id === user_id;

  const { posts, setPosts } = usePosts();
  const handleDelete = async () => {
    try {

      await deletePost(id);
      const result = posts.filter(post => post.id !== id);
      setPosts(result);
    } catch (e) {
      //eslint-disable-next-line no-console
      console.error(e.message);
    }
  }; 
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{description}</p>
      {owner && (
        <p>
          <Link to={`/posts/edit/${id}`}>Edit </Link>
          <button className="delete" onClick={handleDelete} >Delete</button>
        </p>
      )}
    </div>
  );
}
