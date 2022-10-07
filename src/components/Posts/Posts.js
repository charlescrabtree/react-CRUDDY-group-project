import React, { useContext } from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostCard from './PostCard';
import { deletePost } from '../../services/posts';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';

export default function Posts() {
  const { loading, error, posts, setPosts } = usePosts();
  const { user } = useContext(UserContext);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleDelete = async (id) => {
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
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} handleDelete={handleDelete} {...post} />
      ))}
    </div>
  );
}
