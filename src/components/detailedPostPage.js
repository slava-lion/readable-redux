import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

import { updateCommentsForPost } from '../actions/commentsAction.js'
import ModalPostCreateOrEditView from './modalPostCreateOrEditView.js'

class DetailedPostPage extends React.Component {

  state = {
    post : null,
    comments : [],
    showComments : true,
    isOpenEditView : false,
  }

  showCommentsForThisPost = (postId) => {
    this.setState(() => ({ showComments: true }));
  }

  hideCommentsForThisPost = (postId) => {
    this.setState(() => ({ showComments: false }));
  }

  setPostIdAndGetComments = (post) => {
    if(typeof post !== "undefined" && (this.state.post === null || this.state.post.id !== post.id)) {
      this.setState(() => ({ post: post }))
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

  deletePost = (postId) => {

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
                <FaClose onClick={() => this.deletePost(post)} size={25}/>
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
              </div>
              <div className="postVote">
                <div className="downVote">
                  <FaThumbsODown size={25}/>
                </div>
                <div className="voteScore"> {post.voteScore} </div>
                <div className="upVote">
                  <FaThumbsOUp size={25}/>
                </div>
              </div>
            </div>
            <div>
              {this.state.showComments && (
                <div className="detailedComments">
                  <div>Comments:</div>
                  {this.state.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="commentBody">
                        <b>{comment.author}</b> :  {comment.body}
                      </div>
                      <div className="postVote">
                        <div className="downVote">
                          <FaThumbsODown size={25}/>
                        </div>
                        <div className="voteScore"> {comment.voteScore} </div>
                        <div className="upVote">
                          <FaThumbsOUp size={25}/>
                        </div>
                      </div>
                    </div>
                  ))}

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
   };
};

const mapStateToProps = (state) => {
   return {
     posts: state.posts,

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPostPage);
