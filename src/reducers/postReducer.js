import {
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POST_LIST,
  INCREASE_COMMENT_NUMBER_FOR_POST,
  DECREASE_COMMENT_NUMBER_FOR_POST
} from '../actions/postAction.js'

const initialPostState = []

export default function postReducer (state = initialPostState, action) {
  const { id, title, body, posts, post } = action

  switch (action.type) {
    case ADD_POST :
      return [
        ...state, post
      ]
    case VOTE_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
                .forEach((p) => {p.voteScore = post.voteScore; })
        return newState
      }
    case EDIT_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === id))
                .forEach((p) => {p.title = title; p.body = body; })
        return newState
      }
    case DELETE_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
                .forEach((p) => {p.deleted = true;})
        return newState.filter((p) => (p.id !== post.id))
      }
    case UPDATE_POST_LIST :
      return [
        ...posts
      ]
    case INCREASE_COMMENT_NUMBER_FOR_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
                .forEach((p) => { p.commentCount = post.commentCount + 1; })
        return newState
      }
    case DECREASE_COMMENT_NUMBER_FOR_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
                .forEach((p) => { p.commentCount = post.commentCount - 1; })
        return newState
      }
    default :
      return state
  }
}
