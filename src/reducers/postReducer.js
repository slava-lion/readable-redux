import {
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/postAction.js'

const initialPostState = []

export default function postReducer (state = initialPostState, action) {
  const { id, title, body, author, category, vote} = action

  switch (action.type) {
    case ADD_POST :
      return {
        state
      }
    case VOTE_POST :
      return {
        state
      }
    case EDIT_POST :
      return {
        state
      }
    case DELETE_POST :
      return {
        state
      }
    default :
      return state
  }
}
