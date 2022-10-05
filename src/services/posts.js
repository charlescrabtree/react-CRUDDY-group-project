import { checkError, client } from 'client';

export async function getPosts() {
  const resp = await client.from('chilis_data').select('*');
  return checkError(resp);
}

export async function getPostDetail(id) {
  const resp = await client.from('chilis_data').select('*').match({ id }).single();
  return checkError(resp);
}

export async function updatePost(id, title, description) {
  const resp = await client.from('chilis_data').update({ title, description }).match({ id });
  return checkError(resp);
}