import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';


export default function PostCard({ title, description, user_id, id }) {
  const { user } = useContext(UserContext);
  const owner = user.id === user_id;

  const { posts, setPosts } = usePosts();

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
