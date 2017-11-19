import {
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/commentsAction.js'

const initialCommentState = []

export default function commentReducer (state = initialCommentState, action) {
  const { id, title, body, author, parentId, vote} = action

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
    default :
      return state
  }
}
