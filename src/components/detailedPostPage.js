import React from 'react';
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

import { votePost, deletePost } from '../actions/postAction.js'
import CommentsForPost from './commentsForPost.js'
import ModalPostCreateOrEditView from './modalPostCreateOrEditView.js'

class DetailedPostPage extends React.Component {

  state = {
    post : null,
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
    if(typeof post !== "undefined" && post !== null &&
            (this.state.post === null || this.state.post.id !== post.id)) {
      this.setState(() => ({
        post: post
      }))
    }
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

  removePost = (id) => {
    API.removePost(id).then( (post) => {
      this.props.deletePost(post)
      this.props.deleteCommentsForPost(post)
      this.props.history.push('/');
    })
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
            <CommentsForPost post={post} showComments={this.state.showComments} />
          </div>

          <ModalPostCreateOrEditView
              isOpen={this.state.isOpenEditView}
              onCloseFunction={this.closePostModal}
              post={post} />
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     votePost: (data) => dispatch(votePost(data)),
     deletePost: (data) => dispatch(deletePost(data)),
   };
};

const mapStateToProps = (state, ownProps) => {
  let post = state.posts.find((p) => (p.id === ownProps.match.params.id))
  // this check was added for deleting post action,
  // when before redirect from router we get empty (not founded post)
  if(typeof post !== "undefined" && post !== null) {
    return {
      post: post,
    }
  } else {
    return {
      post: null,
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedPostPage));
