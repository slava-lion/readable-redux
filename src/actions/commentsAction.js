export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addComment ({ id, timestamp = Date.now(), title, body, author, parentId }) {
  return {
    type : ADD_COMMENT,
    id,
    timestamp,
    title,
    body,
    author,
    parentId
  }
}

export function voteComment ({ id, vote }) {
  return {
    type : VOTE_COMMENT,
    id,
    vote
  }
}

export function editComment ({ id, timestamp = Date.now(), body }) {
  return {
    type : EDIT_COMMENT,
    timestamp,
    body
  }
}

export function deleteComment ({ id }) {
  return {
    type : DELETE_COMMENT,
    id
  }
}
