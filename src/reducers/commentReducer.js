import {
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_FOR_POST
} from '../actions/commentsAction.js'

const initialCommentState = []

export default function commentReducer (state = initialCommentState, action) {
  const { id, title, body, author, parentId, vote, comments } = action

  switch (action.type) {
    case ADD_COMMENT :
      return {
        state
      }
    case VOTE_COMMENT :
      return {
        state
      }
    case EDIT_COMMENT :
      return {
        state
      }
    case DELETE_COMMENT :
      return {
        state
      }
    case GET_COMMENT_FOR_POST :
      return {
        ...state,
        ...comments
      }
    default :
      return state
  }
}
