export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export function addPost ({ id, timestamp = Date.now(), title, body, author, category }) {
  return {
    type : ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  }
}

export function votePost ({ id, vote }) {
  return {
    type : VOTE_POST,
    id,
    vote
  }
}

export function editPost ({ id, title, body }) {
  return {
    type : EDIT_POST,
    title,
    body
  }
}

export function deletePost ({ id }) {
  return {
    type : DELETE_POST,
    id
  }
}
