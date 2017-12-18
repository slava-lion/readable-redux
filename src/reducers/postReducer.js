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
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
             .map((p) => {p.voteScore = post.voteScore; })
        return newState
      }
    case EDIT_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === id))
                .map((p) => {p.title = title; p.body = body; })
        return newState
      }
    case DELETE_POST :
      {
        let newState = [...state]
        newState.filter((p) => (p.id === post.id))
                .map((p) => {p.deleted = true;})
        return newState.filter((p) => (p.id !== post.id))
      }
    case UPDATE_POST_LIST :
      return [
        ...posts
      ]
    default :
      return state
  }
}
