import {
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENTS_FOR_POST,
  GET_COMMENT_FOR_POST
} from '../actions/commentsAction.js'

const initialCommentState = []

export default function commentReducer (state = initialCommentState, action) {
  const { id, body, timestamp, comment, comments, post } = action

  switch (action.type) {
    case ADD_COMMENT :
      return [
        ...state, comment
      ]
    case VOTE_COMMENT :
      {
        let newState = [...state]
        newState.filter((c) => (c.id === comment.id))
                .forEach((c) => {c.voteScore = comment.voteScore; })
        return newState
      }
    case EDIT_COMMENT :
      {
        let newState = [...state]
        newState.filter((c) => (c.id === id))
                .forEach((c) => { c.timestamp = timestamp; c.body = body; })
        return newState
      }
    case DELETE_COMMENT :
      return [
        ...state
      ].filter((c) => (c.id !== id))
    case DELETE_COMMENTS_FOR_POST:
      return [
        ...state
      ].filter((c) => (c.parentId !== post.id))
    case GET_COMMENT_FOR_POST :
      {
        let newState = [...state]
        comments.forEach(item =>  {
          if (newState.filter((c) => (c.id === item.id)).length === 0) {
            newState.push(item)
          }
        })
        return newState
      }
    default :
      return state
  }
}
