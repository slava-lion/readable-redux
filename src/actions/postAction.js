export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_LIST = 'UPDATE_POST_LIST'

export function addPost (post) {
  return {
    type : ADD_POST,
    post
  }
}

export function votePost ({ id, vote }) {
  return {
    type : VOTE_POST,
    id,
    vote
  }
}

export function editPost (id, title, body) {
  return {
    type : EDIT_POST,
    id,
    title,
    body
  }
}

export function deletePost (post) {
  return {
    type : DELETE_POST,
    post
  }
}

export function udpatePostsList ({ posts }) {
  return {
    type : UPDATE_POST_LIST,
    posts
  }
}
