import { combineReducers } from 'redux'
import commentReducer from './commentReducer.js'
import postReducer from './postReducer.js'
import categoryReducer from './categoryReducer.js'

export default combineReducers({
  posts : postReducer,
  comments : commentReducer,
  categoryTree : categoryReducer
})
