import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function PostCard({ title, description, user_id, id }) {
//   const { user } = useContext(UserContext);

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>only renders if user is detected</button>
    </div>
  );
}
