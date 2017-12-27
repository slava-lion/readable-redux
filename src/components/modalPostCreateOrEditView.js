import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux'
import * as API from '../utils/api.js'
import { editPost } from '../actions/postAction.js'

class ModalPostCreateOrEditView extends React.Component {

  createNewPost = (e) => {
    const uuidv4 = require('uuid/v4');

    if (!this.authorInput.value ||
      !this.titleInput.value ||
      !this.postBodyTextarea.value) {
      return
    }

    e.preventDefault()

    let post = {}
    post['id'] = uuidv4()
    post['timestamp'] = Date.now()
    post['title'] = this.titleInput.value
    post['body'] = this.postBodyTextarea.value
    post['author'] = this.authorInput.value
    post['category'] = this.catSelect.value

    console.log(post)
    API.createNewPost(post).then( (newPost) => {
        this.closePostModal()
        console.log(newPost)
        this.props.addPost(newPost)
    })
  }

  updatePost = () => {
    if (!this.authorInput.value ||
      !this.titleInput.value ||
      !this.postBodyTextarea.value) {
      return
    }
    let id= this.props.post.id
    let title = this.titleInput.value
    let body = this.postBodyTextarea.value
    let editedPost = this.props.post
    API.updatePost(id, title, body).then(() => {
      this.props.editPost(id, title, body);
    })
    this.props.onCloseFunction()
  }

  render() {
    const post = this.props.post
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseFunction}
        contentLabel='Modal'>
        <div>
          <h3 className='subheader'>
            {post === null && (
              'Add new post'
            )}
            {post !== null && (
              'Edit post'
            )}
          </h3>
          <div className='postForm'>
            <div style={{width: '90%', padding: '10px', margin: '5px', outline: 'none',}}>
              choose category <select ref={(select) => this.catSelect = select}>
              {(typeof this.props.categoryTree !== 'undefined') &&
                (this.props.categoryTree === []) &&
                this.props.categoryTree.map((cat) => (
                <option value={cat.path} key={cat.path}>{cat.name}</option>
              ))}
            </select>
            </div>
            <input
              className='author-input'
              type='text'
              placeholder='enter your name'
              ref={(input) => this.authorInput = input}
              defaultValue={post.author}
            />
            <input
              className='title-input'
              type='text'
              placeholder='title of the post'
              ref={(input) => this.titleInput = input}
              defaultValue={post.title}
            />
            <textarea
              className='textarea-input'
              type='text'
              placeholder='text of the post'
              ref={(textarea) => this.postBodyTextarea = textarea}
              defaultValue={post.body}
            /><br />
            {post === null && (
              <button
                className=''
                onClick={this.createNewPost}>Create post
              </button>
            )}
            {post !== null && (
              <button
                className=''
                onClick={this.updatePost}>Save changes
              </button>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     editPost : (id, title, body) => dispatch(editPost(id, title, body)),
   };
};

const mapStateToProps = (state) => {
   return {
     posts: state.posts,
     categoryTree: state.categoryTree,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPostCreateOrEditView);
