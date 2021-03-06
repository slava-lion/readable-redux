export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENT_FOR_POST = 'GET_COMMENT_FOR_POST'
export const DELETE_COMMENTS_FOR_POST = 'DELETE_COMMENTS_FOR_POST'

export function addComment (comment) {
  return {
    type : ADD_COMMENT,
    comment
  }
}

export function voteComment (comment) {
  return {
    type : VOTE_COMMENT,
    comment
  }
}

export function editComment (id, timestamp = Date.now(), body) {
  return {
    type : EDIT_COMMENT,
    timestamp,
    body
  }
}

export function deleteComment (id) {
  return {
    type : DELETE_COMMENT,
    id
  }
}

export function deleteCommentsForPost (post) {
  return {
    type : DELETE_COMMENTS_FOR_POST,
    post
  }
}

export function updateCommentsForPost (comments) {
  return {
    type : GET_COMMENT_FOR_POST,
    comments
  }
}
