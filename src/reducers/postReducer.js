import {
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POST_LIST
} from '../actions/postAction.js'

const initialPostState = []

export default function postReducer (state = initialPostState, action) {
  const { id, title, body, author, category, vote, posts, post } = action

  switch (action.type) {
    case ADD_POST :
      return [
        ...state, post
      ]
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
    case UPDATE_POST_LIST :
      return [
        ...posts
      ]
    default :
      return state
  }
}
