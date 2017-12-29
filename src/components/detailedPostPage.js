import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { timeConverter } from '../utils/helpers.js'

import * as API from '../utils/api.js'

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaClose from 'react-icons/lib/fa/close'
import FaCommentingO from 'react-icons/lib/fa/commenting-o'
import FaCommenting from 'react-icons/lib/fa/commenting'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSort from 'react-icons/lib/fa/sort'

import { updateCommentsForPost, addComment, deleteComment, editComment, voteComment } from '../actions/commentsAction.js'
import { votePost, deletePost, increaseCommentNumberForPost, decreaseCommentNumberForPost } from '../actions/postAction.js'
import ModalPostCreateOrEditView from './modalPostCreateOrEditView.js'

class DetailedPostPage extends React.Component {

  state = {
    post : null,
    comments : [],
    showComments : true,
    isOpenEditView : false,
    edittedComment : null,
  }

  showCommentsForThisPost = (postId) => {
    this.setState(() => ({ showComments: true }));
  }

  hideCommentsForThisPost = (postId) => {
    this.setState(() => ({ showComments: false }));
  }

  setPostIdAndGetComments = (post) => {
    if(typeof post !== "undefined" && (this.state.post === null || this.state.post.id !== post.id)) {
      this.setState(() => ({
        post: post,
        comments: []
      }))
      this.getComments(post.id)
    }
  }

  getComments = (postId) => {
    API.getAllCommentsByPostId(postId).then( (comments) => {
      this.setState(() => ({ comments: comments }));
      this.props.updateCommentsForPost(comments);
    })
  }

  editPost = (post) => {
    this.setState(() => ({ isOpenEditView: true }));
  }
  closePostModal = () => {
    this.setState(() => ({ isOpenEditView: false }));
  }

  vote = (id, voteType) => {
    API.vote(id, voteType).then( (post) => {
      this.props.votePost(post)
    })
  }

  voteComment = (comment, voteType) => {
    API.voteComment(comment.id, voteType).then( (comment) => {
      this.props.voteComment(comment)
      let comments = this.state.comments
/*      comments.filter((c) => (c.id === comment.id)).map((c) => {
        if(voteType === 'downVote') {
          c.voteScore = c.voteScore - 1
        }
        if(voteType === 'upVote') {
          c.voteScore = c.voteScore + 1
        }
      })
      this.setState(() => ({ comments: comments })); */
    })
  }

  removePost = (id) => {
    API.removePost(id).then( (post) => {
      this.props.deletePost(post)
      this.props.history.push('/');
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
      this.setState(() => ({ comments: [...this.state.comments, comment] }))
      this.newCommentPostBodyTextarea.value = ''
      this.newCommentAuthorInput.value = ''
    })
  }

  deleteComment = (id) => {
    API.deleteComment(id).then((comment) => {
      this.props.deleteComment(id)
      this.props.decreaseCommentNumberForPost(this.state.post)
      this.setState(() => ({ comments: [...this.props.comments].filter((c) => (c.id !== id)) }))
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
      this.setState(() => (
        { comments: [...this.props.comments].map((c) => {
            if (c.id === comment.id) {
              c.timestamp = comment.timestamp;
              c.body = comment.body;
            }
          }),
          edittedComment: null
        }))
    })
  }

  showEditCommentForm = (comment) => {
    this.setState(() => ({ edittedComment: comment }))
  }

  componentWillMount() {
      const {match} = this.props
      const post = this.props.posts.find((p) => (p.id === match.params.id))

      this.setPostIdAndGetComments(post)
    }

  componentWillReceiveProps(nextProps) {
    const post = nextProps.posts.find((p) => (p.id === nextProps.match.params.id))
    this.setPostIdAndGetComments(post)
  }

  render() {
    // console.log(this.props)
    const post = this.state.post
    if (post === null) {
      return (
        <div>post with such id was not found</div>
      )
    } else {
      return (
        <div id="posts">
          <div key={post.id} className="postInListDiv">
            <div className="postTitle">
              <Link to={"/post/" + post.id}>{post.title}</Link>
              <span style={{float: 'right'}}>
                <FaEdit onClick={() => this.editPost(post)} size={25}/>
                <FaClose onClick={() => this.removePost(post.id)} size={25}/>
              </span>

            </div>
            <div className="postBody">{post.body}</div>
            <div className="postBottom">
              <div className="postDetails">
                Creation time: {timeConverter(post.timestamp)} by <b>{post.author}</b>
              </div>
              <div className="commentsDetails">
                {this.state.showComments && (
                  <FaCommenting onClick={() => this.hideCommentsForThisPost(post.id)} size={25}/>
                )}
                {!this.state.showComments &&
                  <FaCommentingO onClick={() => this.showCommentsForThisPost(post.id)} size={25}/>
                }
                ({post.commentCount})
              </div>
              <div className="postVote">
                <div className="downVote">
                  <FaThumbsODown onClick={() => this.vote(post.id, 'downVote')} size={25}/>
                </div>
                <div className="voteScore"> {post.voteScore} </div>
                <div className="upVote">
                  <FaThumbsOUp onClick={() => this.vote(post.id, 'upVote')} size={25}/>
                </div>
              </div>
            </div>
            <div>
              {this.state.showComments && (
                <div className="detailedComments">
                  <div>Comments:</div>
                  {this.state.comments.length > 0 && this.state.comments.map((comment) => (
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
          </div>

          <ModalPostCreateOrEditView
              isOpen={this.state.isOpenEditView}
              onCloseFunction={this.closePostModal}
              post={this.state.post} />
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     updateCommentsForPost: (data) => dispatch(updateCommentsForPost(data)),
     votePost: (data) => dispatch(votePost(data)),
     deletePost: (data) => dispatch(deletePost(data)),
     addComment: (data) => dispatch(addComment(data)),
     deleteComment: (data) => dispatch(deleteComment(data)),
     editComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body)),
     increaseCommentNumberForPost: (post) => dispatch(increaseCommentNumberForPost(post)),
     decreaseCommentNumberForPost: (post) => dispatch(decreaseCommentNumberForPost(post)),
     voteComment: (comment) => dispatch(voteComment(comment))
   };
};

const mapStateToProps = (state) => {
   return {
     posts: state.posts,
     comments: state.comments,
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedPostPage));
