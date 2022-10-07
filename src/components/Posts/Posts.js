import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostCard from './PostCard';
import { deletePost } from '../../services/posts';

export default function Posts() {
  const { loading, error, posts, setPosts } = usePosts();
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  const handleDelete = async () => {
    try {

      await deletePost(id);
      const result = posts.filter(post => post.id !== id);
      await setPosts(result);

    } catch (e) {
      //eslint-disable-next-line no-console
      console.error(e.message);
    }
  }; 
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
