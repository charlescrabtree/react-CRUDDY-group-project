import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostCard from './PostCard';


export default function Posts() {
  const { loading, error, posts } = usePosts();
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
