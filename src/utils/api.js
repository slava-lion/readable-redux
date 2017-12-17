const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
// GETTERS
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getAllCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())


// CREATERS
export const createNewPost = (body) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())


// EDITORS
export const updatePost = (id, title, body) =>
    fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: {
        title : title,
        body : body
      }
    })

// DELETERS
export const removePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
