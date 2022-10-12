import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Posts.css';


export default function PostCard({ title, description, user_id, id, handleDelete }) {
  const { user } = useContext(UserContext);
  const owner = user.id === user_id;

  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{description}</p>
      {owner && (
        <p>
          <Link className="edit" to={`/posts/edit/${id}`}>Edit </Link>
          <button className="delete" onClick={()=>handleDelete(id) }>Delete</button>
        </p>
      )}
    </div>
  );
}
