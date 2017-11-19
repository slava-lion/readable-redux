export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const UPDATE_CATEGORY_LIST = 'UPDATET_CATEGORY_LIST'

export function selectCategory ({ path }) {
  return {
    type : SELECT_CATEGORY,
    path
  }
}

export function udpateCategoryList ({ categoryList }) {
  return {
    type : UPDATE_CATEGORY_LIST,
    categoryList
  }
}
