import {
  SELECT_CATEGORY,
  UPDATE_CATEGORY_LIST,
} from '../actions/categoryAction.js'

const initialCategoryState = {}

export default function categoryReducer (state = initialCategoryState, action) {
  const { path , categoryList } = action

  switch (action.type) {
    case SELECT_CATEGORY :
      return {
        state
      }
    case UPDATE_CATEGORY_LIST :
      return {
        ...categoryList
      }
    default :
      return state
  }
}
