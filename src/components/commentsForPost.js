import React from 'react';
import { connect } from 'react-redux'

import * as API from '../utils/api.js'

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaClose from 'react-icons/lib/fa/close'
import FaEdit from 'react-icons/lib/fa/edit'

import { updateCommentsForPost, addComment, deleteComment, editComment, voteComment } from '../actions/commentsAction.js'
import { increaseCommentNumberForPost, decreaseCommentNumberForPost } from '../actions/postAction.js'

class CommentsForPost extends React.Component {

  state = {
    post : null,
    isOpenEditView : false,
    edittedComment : null,
  }

  setPostIdAndGetComments = (post) => {
    if(typeof post !== "undefined" && post !== null &&
            (this.state.post === null || this.state.post.id !== post.id)) {
      this.setState(() => ({
        post: post
      }))
      this.getComments(post.id)
    }
  }

  getComments = (postId) => {
    API.getAllCommentsByPostId(postId).then( (comments) => {
      this.props.updateCommentsForPost(comments);
    })
  }

  voteComment = (comment, voteType) => {
    API.voteComment(comment.id, voteType).then( (comment) => {
      this.props.voteComment(comment)
    })
  }

  addComment = () => {
    const uuidv4 = require('uuid/v4');

    if (!this.newCommentPostBodyTextarea.value ||
      !this.newCommentAuthorInput.value) {
      return
    }

    let newComment = {}
    newComment['id'] = uuidv4()
    newComment['timestamp'] = Date.now()
    newComment['body'] = this.newCommentPostBodyTextarea.value
    newComment['author'] = this.newCommentAuthorInput.value
    newComment['parentId'] = this.state.post.id

    API.addComment(newComment).then((comment) => {
      this.props.addComment(comment)
      this.props.increaseCommentNumberForPost(this.state.post)
      this.newCommentPostBodyTextarea.value = ''
      this.newCommentAuthorInput.value = ''
    })
  }

  deleteComment = (id) => {
    API.deleteComment(id).then((comment) => {
      this.props.deleteComment(id)
      this.props.decreaseCommentNumberForPost(this.state.post)
    })
  }

  editComment = (comment) => {
    if (!this.editCommentPostBodyTextarea.value) {
      return
    }

    let newComment = this.state.edittedComment
    newComment['timestamp'] = Date.now()
    newComment['body'] = this.editCommentPostBodyTextarea.value

    API.editComment(newComment).then((comment) => {
      this.props.editComment(newComment.id, newComment.timestamp, newComment.body)
      this.setState(() => ({ edittedComment: null }))
    })
  }

  showEditCommentForm = (comment) => {
    this.setState(() => ({ edittedComment: comment }))
  }

  componentWillMount() {
    this.setPostIdAndGetComments(this.props.post)
  }

  componentWillReceiveProps(nextProps) {
    this.setPostIdAndGetComments(nextProps.post)
  }

  render() {
    //console.log(this.props)
    const post = this.props.post
    if (typeof post === 'undefined' || post === null) {
      return (
        <div>post with such id was not found</div>
      )
    } else {
      return (
          <div>
            {this.props.showComments && (
                <div className="detailedComments">
                  <div>Comments:</div>
                  {this.props.comments.length > 0 && this.props.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {(this.state.edittedComment === null ||
                          this.state.edittedComment.id !== comment.id) && (
                          <div>
                            <div className="commentBody">
                              <b>{comment.author}</b> :  {comment.body}
                            </div>
                            <div className="postVote">
                              <span style={{float: 'right'}}>
                                <FaEdit onClick={() => this.showEditCommentForm(comment)} size={25}/>
                                <FaClose onClick={() => this.deleteComment(comment.id)} size={25}/>
                              </span>
                              <div className="downVote">
                                <FaThumbsODown onClick={() => this.voteComment(comment, 'downVote')} size={25}/>
                              </div>
                              <div className="voteScore"> {comment.voteScore} </div>
                              <div className="upVote">
                                <FaThumbsOUp onClick={() => this.voteComment(comment, 'upVote')} size={25}/>
                              </div>
                            </div>
                          </div>
                        )}

                      {this.state.edittedComment &&
                        this.state.edittedComment.id === comment.id&& (
                        <div>
                          <textarea
                            className='textarea-input'
                            type='text'
                            placeholder='put your comment here'
                            ref={(textarea) => this.editCommentPostBodyTextarea = textarea}
                            defaultValue={comment.body}
                          />
                          <button
                            className=''
                            onClick={this.editComment}>update comment
                          </button>
                        </div>
                      )}

                    </div>
                  ))}
                  <div>
                    <input
                      className='author-input'
                      type='text'
                      placeholder='enter your name'
                      ref={(input) => this.newCommentAuthorInput = input}
                      defaultValue=''
                    />
                    <textarea
                      className='textarea-input'
                      type='text'
                      placeholder='put your comment here'
                      ref={(textarea) => this.newCommentPostBodyTextarea = textarea}
                      defaultValue=''
                    />
                    <button
                      className=''
                      onClick={this.addComment}>Add comment
                    </button>
                  </div>
                </div>
              )}
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     updateCommentsForPost: (data) => dispatch(updateCommentsForPost(data)),
     addComment: (data) => dispatch(addComment(data)),
     deleteComment: (data) => dispatch(deleteComment(data)),
     editComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body)),
     increaseCommentNumberForPost: (post) => dispatch(increaseCommentNumberForPost(post)),
     decreaseCommentNumberForPost: (post) => dispatch(decreaseCommentNumberForPost(post)),
     voteComment: (comment) => dispatch(voteComment(comment))
   };
};

const mapStateToProps = (state, ownProps) => {
  let post = state.posts.find((p) => (p.id === ownProps.post.id))
  // this check was added for deleting post action,
  // when before redirect from router we get empty (not founded post)
  if(typeof post !== "undefined" && post !== null) {
    return {
      post: post,
      showComments: ownProps.showComments,
      comments: state.comments.filter((c) => (c.parentId === post.id)),
    }
  } else {
    return {
      post: null,
      showComments: ownProps.showComments,
      comments: [],
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForPost);
