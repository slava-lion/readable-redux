import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { timeConverter } from '../utils/helpers.js'

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaCommentingO from 'react-icons/lib/fa/commenting-o'

import { updateCommentsForPost } from '../actions/commentsAction.js'

class PostInList extends React.Component {

  state = {
    comments : []
  }

  render() {
    const { post } = this.props

    return (
      <div key={post.id} className="postInListDiv">
        <div className="postTitle"><Link to={"/post/" + post.id}>{post.title}</Link></div>
        <div className="postBody">{post.body}</div>
        <div className="postBottom">
          <div className="postDetails">
            Creation time: {timeConverter(post.timestamp)}
          </div>
          <div className="commentsDetails">
            <FaCommentingO size={25}/> ({post.commentCount})
          </div>
          <div className="postVote">
            <div className="voteScore"> {post.voteScore} </div>
            <div className="upVote">
              <FaThumbsOUp size={25}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     updateCommentsForPost: (data) => dispatch(updateCommentsForPost(data)),
   };
};

const mapStateToProps = (state) => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInList);
