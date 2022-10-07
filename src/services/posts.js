import { checkError, client } from './client';

export async function getPosts() {
  const resp = await client.from('chilis_data').select('*');
  return checkError(resp);
}

export async function createPost(user_id, title, description) {
  const resp = await client.from('chilis_data').insert({ user_id, title, description }).single();
  return checkError(resp);
}

export async function getPostDetail(id) {
  const resp = await client.from('chilis_data').select('*').match({ id }).single();
  return checkError(resp);
}

export async function updatePost(id, title, description) {
  const resp = await client.from('chilis_data').update({ title, description }).match({ id }).single();
  return checkError(resp);
}

export async function deletePost(id) {
  const resp = await client.from('chilis_data').delete({ id }).match({ id }).single();
  return checkError(resp);
}