import {
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_FOR_POST
} from '../actions/commentsAction.js'

const initialCommentState = []

export default function commentReducer (state = initialCommentState, action) {
  const { id, title, body, author, timestamp, parentId, vote, comment, comments } = action

  switch (action.type) {
    case ADD_COMMENT :
      return [
        ...state, comment
      ]
    case VOTE_COMMENT :
      return {
        state
      }
    case EDIT_COMMENT :
      {
        let newState = [...state]
        newState.filter((c) => (c.id === id))
                .map((c) => { c.timestamp = timestamp; c.body = body; })
        return newState
      }
    case DELETE_COMMENT :
      return [
        ...state
      ].filter((c) => (c.id !== id))
    case GET_COMMENT_FOR_POST :
      return [
        ...state,
        ...comments
      ]
    default :
      return state
  }
}
