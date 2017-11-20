import React, { Component } from 'react';
import { connect } from 'react-redux'
import { timeConverter } from '../utils/helpers.js'

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaClose from 'react-icons/lib/fa/close'
import FaCommentingO from 'react-icons/lib/fa/commenting-o'
import FaCommenting from 'react-icons/lib/fa/commenting'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSort from 'react-icons/lib/fa/sort'

class PostInList extends React.Component {

  state = {
    value: ''
  }

  render() {
    const { post } = this.props

    return (
      <div key={post.id} className="postInListDiv">
        <div className="postTitle">{post.title}</div>
        <div className="postBody">{post.body}</div>
        <div className="postBottom">
          <div className="postDetails">
            Creation time: {timeConverter(post.timestamp)}
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
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
   };
};

const mapStateToProps = (state) => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInList);
